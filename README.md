# Saroj Poudel Projects

Nuxt 4 and Nuxt UI application deployed on Cloudflare Workers. Cloudflare D1 stores Better Auth and application data, Workers KV provides key-value storage, and R2 stores uploaded images. Nuxt Image uses Cloudflare Image Transformations.

## Install and develop

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

`pnpm dev` runs Nuxt's development server with the Cloudflare preset. To preview the built Worker runtime, use `pnpm cf:dev`.

## Create Cloudflare resources

Install dependencies, then create the D1 database, KV namespace, and R2 bucket:

```bash
pnpm exec wrangler login
pnpm cf:d1:create
pnpm cf:kv:create
pnpm cf:r2:create
```

Copy the D1 database ID and KV namespace ID returned by Wrangler into `wrangler.jsonc`, replacing the `REPLACE_WITH_...` values. The R2 bucket name is already set in the config. For local development, Wrangler emulates these bindings; the IDs are needed for remote deployment.

Onboard `ropodl.com` for Cloudflare Email Sending in the Cloudflare dashboard and verify its SPF/DKIM records. The Worker uses a `send_email` binding restricted to `hello@ropodl.com`; local Wrangler development uses the remote binding to send through Cloudflare Email Service.

Set production secrets:

```bash
pnpm exec wrangler secret put BETTER_AUTH_SECRET
pnpm exec wrangler secret put TURNSTILE_SECRET_KEY
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

## Cloudflare resources in code

- The admin content editor stores versioned JSON blocks for paragraphs, headings, lists, quotes, callouts, images, galleries, timelines, stats, FAQs, buttons, links, code, and dividers. Existing rich HTML content remains readable and is converted to blocks when edited. Project detail pages use these blocks in an editorial case-study layout with a cover, section navigation, and reading progress.
- `server/utils/content.ts` validates block counts, field lengths, link protocols, and per-user R2 image paths before saving. Public block rendering uses Vue text bindings; legacy HTML continues through the server-side allowlist sanitizer.
- `wrangler.jsonc` configures the Workers entry point and D1, KV, and R2 bindings.
- `server/utils/cloudflare.ts` reads request-scoped Worker bindings and secrets.
- `server/db/` uses Drizzle's D1 driver and SQLite schema. Generate migrations with `pnpm db:generate`; apply them locally or remotely with the `db:migrate` scripts.
- `server/utils/auth.ts` configures Better Auth with D1, email/password sign-in, and disabled public sign-up.
- `server/utils/kv.ts` exposes the Cloudflare KV namespace for server routes.
- Cloudflare Workers Rate Limiting bindings protect contact submissions (5/min/IP), sign-in (10/min/IP), and uploads (20/min/user). These counters are approximate and location-local, as documented by Cloudflare.
- The contact form uses Turnstile and validates tokens server-side with Siteverify.
- Cloudflare Web Analytics loads its beacon only when `NUXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` is configured.
- Successful contact submissions and article usefulness feedback are aggregated by UTC day in D1 without storing visitor identifiers. The admin dashboard shows the last 30 days of contact conversions and feedback. Apply all migrations, including `0008_site_metrics.sql`, to enable these metrics.
- Article feedback is limited by a Cloudflare Rate Limiting binding and a per-article local-storage marker; it does not persist names, email addresses, or IP addresses. The `FEEDBACK_LIMITER` binding is configured in `wrangler.jsonc`.
- `POST /api/uploads` requires an authenticated session and stores PNG, JPEG, WebP, AVIF, or GIF images in R2 (up to 4 MB). `GET /api/uploads/:path` serves them from the same Worker origin.
- `POST /api/contact` validates contact form submissions and sends them through Resend.

## Scripts

```bash
pnpm dev                 # Nuxt development server with Cloudflare preset
pnpm cf:dev              # Build and run through Wrangler
pnpm cf:deploy           # Build and deploy to Cloudflare Workers
pnpm db:generate         # Generate Drizzle SQLite migrations
pnpm db:migrate          # Apply migrations to local D1
pnpm db:migrate:remote   # Apply migrations to remote D1
pnpm db:seed:admin       # Seed local admin (add -- --remote for production)
pnpm lint
pnpm typecheck
```
