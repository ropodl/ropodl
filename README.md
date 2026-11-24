# Saroj Poudel Projects

Nuxt 4 and Nuxt UI application deployed on Cloudflare Workers. Cloudflare D1 stores Better Auth and application data, Workers KV provides key-value storage, and R2 stores uploaded images. Nuxt Image uses Cloudflare Image Transformations.

## Install and develop

Use Node.js 24.22+ or 26.12+ (the repository pins 26.12.0 in `.node-version`), then install dependencies:

```bash
pnpm install
cp .dev.vars.example .dev.vars
```

Set a random `BETTER_AUTH_SECRET` in `.dev.vars` (for example, generate one with `openssl rand -base64 32`). The example uses Cloudflare's public Turnstile test keys for local development. Then run the local Worker runtime:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed:admin
pnpm dev
```

To load local-only demo content for the admin screens, run `pnpm db:seed:demo`. It creates 100 sample records in each content collection and 100 demo images in local R2 storage. Re-run with `pnpm db:seed:demo -- --clear` to remove those demo records and images.

For local development, the seed command creates `admin@example.com` / `admin123`. Public sign-up is disabled. For a remote account, set `ADMIN_EMAIL` and `ADMIN_PASSWORD` before running the seed command; optionally set `ADMIN_PREVIOUS_EMAIL` to rename an existing seeded account.

`pnpm dev` runs Nuxt's development server with the existing Cloudflare preset. To preview the built Worker runtime, use `pnpm cf:dev`.

Void 1.11.0 is integrated as an opt-in Nuxt adapter; it requires Node.js 24.22+ or 26.12+ (the repository pins 26.12.0). The local config migration moved canonical Worker settings to `void.config.ts`; `wrangler.legacy.jsonc` preserves the previous Wrangler path. `void:dev` uses a separate local target with no routes and the local Wrangler D1 adapter; `VOID_TARGET=staging` selects a distinct Worker with no custom routes, isolated staging D1/KV/R2 bindings, and no Email Sending binding. Staging IDs are checked against production IDs before config generation, and `void:staging:deploy` refuses deployment unless the generated config matches the staging-only Worker and resources. Use `pnpm void:staging:dev`, `pnpm void:staging:typecheck`, `pnpm void:staging:build`, and `pnpm void:staging:deploy` for staging. The staging auth smoke command signs in a generated disposable account, checks protected admin access, tests an R2 object round trip, and cleans up both; run `pnpm void:staging:auth-smoke`. Staging migrations are applied with Wrangler to the isolated staging D1 before `void:staging:deploy --skip-migrations`; do not use bare `void deploy`. The wrapper stages legacy dotenv files under ignored `.void/` while Void runs and restores them afterward. Normal `pnpm dev`, `pnpm build`, and `pnpm cf:deploy` remain on the existing Nuxt/Nitro/Wrangler path. No production traffic or production data is part of staging.

## Create Cloudflare resources for a new installation

The current project already has its production D1, KV, and R2 resources configured. Do not run these creation commands against the existing production account. For a separate new installation, create resources with Wrangler:

```bash
pnpm exec wrangler login
pnpm cf:d1:create
pnpm cf:kv:create
pnpm cf:r2:create
```

For this already-provisioned app, `void.config.ts` is the canonical Worker configuration and contains the existing production resource bindings. `wrangler.legacy.jsonc` is a preserved compatibility config for current Wrangler scripts; keep its resource IDs synchronized during the rollback window. For local development, the Wrangler path emulates bindings locally; do not create replacement production resources.

Onboard `ropodl.com` for Cloudflare Email Sending in the Cloudflare dashboard and verify its SPF/DKIM records. The Worker uses a `send_email` binding restricted to `hello@ropodl.com`; local Wrangler development uses the remote binding to send through Cloudflare Email Service.

Set production secrets:

```bash
pnpm exec wrangler --config wrangler.legacy.jsonc secret put BETTER_AUTH_SECRET
pnpm exec wrangler --config wrangler.legacy.jsonc secret put TURNSTILE_SECRET_KEY
```

Create a Turnstile widget in the Cloudflare dashboard. Set its site key as the Worker variable `NUXT_PUBLIC_TURNSTILE_SITE_KEY`, and the secret key with `wrangler secret put TURNSTILE_SECRET_KEY`. The local `.dev.vars.example` uses Cloudflare's published test keys; replace these with real keys for production.

For Web Analytics, add the site in Cloudflare's **Web Analytics** dashboard and set the provided token as the Worker variable `NUXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN`. The app injects the official Cloudflare beacon only when this token is set. Cloudflare Web Analytics reports field Core Web Vitals (LCP, INP, and CLS); review its Core Web Vitals dashboard after real visitor data has accumulated. Contact messages are sent via the Worker `send_email` binding from and to `hello@ropodl.com` (configure forwarding for that address in the Cloudflare dashboard).

Apply the D1 migration and create the remote admin account:

```bash
pnpm db:migrate:remote
pnpm db:seed:admin -- --remote
```

Then deploy:

```bash
pnpm cf:deploy
```

Add a custom domain to the Worker in Cloudflare. Set `BETTER_AUTH_URL` to that origin if you need an explicit auth URL; otherwise, the request origin is used. Enable **Images > Transformations** for the zone to activate Nuxt Image's Cloudflare provider.
Canonical URLs and social-card links use `https://ropodl.com` by default; set `NUXT_PUBLIC_SITE_URL` when deploying to a different public origin.

The public sitemap is served at `/sitemap.xml`, with published blog posts and projects added from D1. `/robots.txt` points crawlers to the sitemap and excludes private routes. `/llms.txt` provides AI assistants with a concise guide to the public site and its canonical URLs.

## Cloudflare resources in code

- The admin content editor stores versioned JSON blocks for paragraphs, headings, lists, quotes, callouts, images, galleries, timelines, stats, FAQs, buttons, links, code, and dividers. Existing rich HTML content remains readable and is converted to blocks when edited. Project detail pages use these blocks in an editorial case-study layout with a cover, section navigation, and reading progress.
- `server/utils/content.ts` validates block counts, field lengths, link protocols, and per-user R2 image paths before saving. Public block rendering uses Vue text bindings; legacy HTML continues through the server-side allowlist sanitizer.
- `void.config.ts` is the canonical Worker config. `wrangler.legacy.jsonc` preserves the pre-migration Wrangler configuration for existing scripts and rollback.
- `server/utils/cloudflare.ts` reads request-scoped Worker bindings and secrets.
- `server/db/` uses the existing Drizzle SQLite schema. The shared database factory uses Void's schema-aware D1 client only when the Void Worker sets `VOID_USE_SDK_DB=1`; the legacy Wrangler config continues to use the current direct D1 client. Generate migrations with `pnpm db:generate`; apply them locally or remotely with the `db:migrate` scripts.
- `server/utils/auth.ts` configures Better Auth with D1, email/password sign-in, and disabled public sign-up.
- `server/utils/kv.ts` exposes the Cloudflare KV namespace for server routes.
- Cloudflare Workers Rate Limiting bindings protect contact submissions (5/min/IP), sign-in (10/min/IP), and uploads (20/min/user). These counters are approximate and location-local, as documented by Cloudflare.
- The contact form uses Turnstile and validates tokens server-side with Siteverify.
- Cloudflare Web Analytics loads its beacon only when `NUXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` is configured.
- Successful contact submissions and article usefulness feedback are aggregated by UTC day in D1 without storing visitor identifiers. The admin dashboard shows the last 30 days of contact conversions and feedback. Apply all migrations, including `0008_site_metrics.sql`, to enable these metrics.
- Article feedback is limited by a Cloudflare Rate Limiting binding and a per-article local-storage marker; it does not persist names, email addresses, or IP addresses. The `FEEDBACK_LIMITER` binding is configured in `void.config.ts`.
- `POST /api/uploads` requires an authenticated session and stores PNG, JPEG, WebP, AVIF, or GIF images in R2 (up to 4 MB). `GET /api/uploads/:path` serves them from the same Worker origin.
- `POST /api/contact` validates contact form submissions and sends them through Resend.

## Scripts

```bash
pnpm dev                 # Current Nuxt development server with Cloudflare preset
pnpm void:dev            # Candidate Nuxt + Void local development
pnpm void:typecheck      # Typecheck with Void Nitro integration enabled
pnpm void:build          # Candidate production build (does not deploy)
pnpm void:smoke          # Local candidate server smoke test
pnpm cf:dev              # Build and run through the preserved Wrangler config
pnpm cf:deploy           # Build and deploy to Cloudflare Workers
pnpm db:generate         # Generate Drizzle SQLite migrations
pnpm db:migrate          # Apply migrations to local D1
pnpm db:migrate:remote   # Apply migrations to remote D1
pnpm db:seed:admin       # Seed local admin (add -- --remote for production)
pnpm lint
pnpm typecheck
```
