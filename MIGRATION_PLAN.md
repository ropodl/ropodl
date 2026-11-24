# Void migration plan

## Executive recommendation

Treat Void as a candidate deployment/runtime layer first, not as an assumed framework replacement. Keep Vue and Nuxt initially unless a measured limitation makes them the bottleneck. The project already runs Nuxt 4 on Cloudflare Workers and uses D1, KV, R2, Workers AI, Images, Email, rate-limit bindings, Better Auth, and Drizzle. Replacing these with Void conventions without a demonstrated benefit would add risk without establishing a performance win.

The migration is approved only if a production-like proof of concept preserves the app's behavior and Cloudflare resource ownership, and measured results justify the ongoing complexity. **Zero planned downtime is a hard requirement.** Keep the current production Worker serving traffic until the candidate is deployed, verified, and ready for a reversible traffic switch. Existing production data stores remain the primary source of truth after migration by default. A new or replacement resource is allowed only when an apples-to-apples test demonstrates a material performance, reliability, or capability benefit that justifies its cost and operational complexity. Never create a second authoritative data store by accident.

“Zero downtime” means no maintenance window or intentional unavailability during migration. No deployment plan can guarantee zero failed requests under all provider/network conditions; the operational goal is to keep the existing service available, make cutover reversible, and keep any migration-attributable errors within an agreed error budget.

## Current implementation checkpoint

This is scaffolding and a working opt-in build path, not a completed application/runtime migration:

- Void 1.11.0 is installed and the project is pinned to Node 26.12.0, as required by Void.
- `void.config.ts` and `void.lock.json` were generated locally from the existing Worker config. `wrangler.legacy.jsonc` preserves the exact previous config for compatibility and rollback; existing Wrangler scripts now select it explicitly.
- The Vue/Nuxt application and route handlers retain their existing Nuxt/Nitro/Drizzle/Better Auth patterns. The shared D1 database factory now selects Void's schema-aware `void/db` client only when the Void Worker sets `VOID_USE_SDK_DB=1`; the preserved Wrangler config continues using the direct Drizzle D1 client. No API contracts, schema, auth, or data were changed.
- `VOID_NUXT_INTEGRATION=1` is opt-in through `scripts/void-command.mjs`. It stages unsupported legacy dotenv examples out of the project root for the command, copies `.dev.vars` to ignored `.env` only when no `.env` exists, and restores staged files afterward.
- No Cloudflare resource, remote secret, production deployment, or production database was modified.
- `void info --json` currently reports no inferred resources. The existing bindings are explicit in `void.config.ts`; do not expect automatic resource inference from the current Nuxt server code.

Validation checkpoint: Void-enabled typecheck and production build pass, a local Void dev-server smoke test exercises a read-only `GET /api/blogs` query and returns HTTP 200, and the retained Wrangler config passes a deploy dry run. The candidate request used the existing local D1 database after applying its one pending local migration (`0009_publish_timestamps.sql`); no remote migration ran. In the latest local comparison, the ordinary build emitted 3.91 MB total (1.05 MB gzip) in about 1m15s; the Void+SDK-DB candidate emitted 3.94 MB (1.06 MB gzip) in about 1m29s. This is one noisy local build pair and measures artifact size/build time, not visitor performance; it establishes no runtime gain. Benchmark real routes and Core Web Vitals before making performance claims.

## Current scope and migration complexity

The repository contains approximately:

- 25 application pages, including public content, login/dashboard, and a multi-page admin CMS.
- 75+ Vue components, including a sizable content-block editor and public rendering components.
- 40+ server API endpoint files covering public content, admin CRUD, auth, contact, feedback, media, and audio.
- A Drizzle schema and D1 migrations, Better Auth, server-side validation/sanitization, and seed scripts.
- Cloudflare Worker bindings for D1, KV, R2, AI, Images, assets, email, and five rate limiters.
- Custom Wrangler/Nuxt build, local preview, deploy, and migration scripts.

These are inventory estimates from the current tree; take exact counts before implementation. The largest migration risks are server/runtime integration, auth/session compatibility, resource binding parity, and preserving CMS/admin behavior—not converting individual Vue components.

## Target principles

1. **Keep public URLs and data stable.** Existing routes, canonical URLs, sitemap behavior, and stored content must remain compatible.
2. **Vue only.** React is explicitly out of scope. Keep Vue and Nuxt unless a Vue-compatible target is proven necessary; any proposed framework change must remain Vue-based and preserve the existing UX.
3. **Existing infrastructure remains authoritative by default.** Continue using the existing D1 database as the primary source of truth, along with existing KV, R2, domains, secrets, and rate-limit namespaces where supported. Adopt a new resource only after measured evidence shows a material performance/reliability benefit or a required capability; document ownership, data consistency, cost, migration, and rollback before adoption. A new cache or derived index must never silently become the authoritative copy.
4. **Measure user experience, not framework fashion.** Compare Core Web Vitals and route/API latency with equivalent data, assets, region, and traffic conditions.
5. **Migrate incrementally and retain rollback.** Production remains on the current Worker until explicit cutover approval.
6. **Avoid dual writes.** There must be one authoritative database writer at every phase.
7. **No planned downtime.** Keep the incumbent Worker live through validation and cutover; database changes must be backward-compatible and traffic switching reversible.

## Recommended target architecture

### Preferred first candidate: Nuxt + Void deployment integration

Retain Nuxt pages, Vue components, Nitro server routes, Better Auth, Drizzle, and current Cloudflare resource configuration. Integrate only the Void CLI/platform capabilities that are documented to support this setup. Continue using existing bindings and migrations. This is the lowest-risk way to test whether Void improves deployment and resource management.

### Second candidate: Nuxt + Void SDK services

Only if the first candidate is insufficient, test selectively adopting Void SDK APIs for a bounded server capability. Do not move authentication, database access, and all API routes at once. Validate that Void's server handlers can coexist with Nuxt/Nitro and that request-scoped Cloudflare bindings are correctly available.

### Framework replacement: Vue-only, and not the default

Consider replacing Nuxt only if a benchmark or required capability demonstrates a material limitation that Void integration cannot address. Any replacement must support Vue; React and React-based frameworks are explicitly prohibited for this migration. Preserve the DB schema and API contracts to limit data risk.

## Phased execution

### Phase 0 — Baseline and compatibility research

- Pin the exact Void CLI/SDK versions and read its current Nuxt, Vue, Workers, and resource-binding documentation. The announcement alone is not a compatibility guarantee. The initial integration uses Void 1.11.0; its Nuxt guide supports Nitro 2 and documents Vue/Nuxt integration, but the CLI currently requires Node.js 24.22+ or 26.12+.
- Resolve the root Wrangler config constraint before enabling the Void plugin: Void 1.11.0's plugin refuses to initialize while root `wrangler.jsonc` exists. The local config migration has moved canonical settings to `void.config.ts`; `wrangler.legacy.jsonc` preserves the original config for current Wrangler scripts and rollback. Keep Void opt-in until both paths are validated.
- Record current production Worker configuration, resource IDs, routes, secrets (names only), migrations, deployment steps, and rollback procedure. Never copy secret values into the plan or source control.
- Establish baseline metrics (see Measurement section) from production or a production-like environment.
- Run current lint, typecheck, build, and existing checks; capture current known failures separately from migration regressions.
- Inventory endpoint contracts, auth behavior, schema/migrations, static assets, content routes, and all Worker bindings.

**Gate:** Written compatibility matrix confirms how Nuxt/Nitro, Vue SSR, D1, Drizzle migrations, Better Auth, and every binding work under the selected Void mode. If any critical binding or auth path is unsupported or unclear, do not proceed beyond an isolated experiment. The preserved Wrangler deployment path must remain usable until the Void path has passed staging validation.

### Phase 1 — Isolated deployment proof of concept

- Create a separate branch and non-production Cloudflare environment with isolated test resources and a test domain.
- Build a minimal vertical slice using the chosen Nuxt+Void integration: SSR public route, static asset, one read-only D1 query, one authenticated endpoint, and one R2 operation if supported.
- Exercise local development, preview, deploy, logs, and rollback through the proposed toolchain.
- Verify resource creation is explicit and inspectable. Production resource IDs must not be targeted by the PoC. Use isolated test resources only for testing; the eventual production design should bind to the current authoritative stores unless a measured, approved exception is recorded.
- Compare output and response behavior with current app; keep this PoC out of production.

**Gate:** Demonstrate reproducible local and test deployment, correct bindings, secure auth/session handling, observable logs, and reliable rollback. Any automatic resource provisioning must be understood and controllable.

### Phase 2 — Compatibility and migration design

- Choose Nuxt+Void integration level based on PoC results; explicitly reject a framework rewrite unless separately justified.
- Map every current route/API feature to its target implementation and test. Identify middleware/cookie/header/redirect differences.
- Confirm the existing D1 database remains the primary source of truth and its schema remains compatible. Generate and inspect migrations; test forward application and data backup/restore. Do not run destructive migrations in production.
- For any proposed new production resource, record baseline-versus-candidate performance and reliability results, consistency/freshness behavior, failure modes, ongoing cost, and rollback/data-reconciliation procedure. Reject the resource if its benefit is not measurable or it creates an unjustified second source of truth.
- Confirm Better Auth callbacks, cookies, origin/domain settings, CSRF protections, admin authorization, rate limits, and secrets.
- Confirm correct behavior for R2 uploads and serving, Images transformations, AI, Email, KV, and assets. Include failure behavior for missing bindings.
- Define traffic switch and rollback mechanics before feature migration begins.
- Design database changes using expand/contract: add compatible schema first, deploy code that works with old and new schema, backfill in resumable batches if needed, switch reads/writes only after validation, and remove obsolete schema only after the rollback window. Never require a maintenance-mode migration or destructive in-place change at cutover.

**Gate:** Approved route parity matrix, binding matrix, migration plan, security review, and rollback rehearsal. Confirm the old Worker can continue serving during every migration step and can operate against the expanded schema.

### Phase 3 — Migrate by vertical slices

Prioritize preserving behavior over converting all code to new abstractions:

1. Public read-only pages and shared content loaders.
2. Blog/project detail, pagination, categories/tags, sitemap, and SEO metadata.
3. Login/session and protected dashboard/admin shell.
4. Admin CRUD, content blocks, taxonomies, audit log, and profile/password flows.
5. Contact, Turnstile, email, feedback, audio, uploads, media management, rate limits, and analytics/metrics.

For each slice: preserve URL and response contracts, add unit/integration coverage, test accessibility and responsive behavior, and deploy only to staging. Keep one DB writer. Avoid duplicated implementations surviving indefinitely; remove the old path only after the new path is proven and the rollback window closes.

**Gate:** Route-by-route acceptance, no data divergence, security checks, error-path coverage, and UX sign-off.

### Phase 4 — Performance and UX validation

- Run comparable production builds on the same Cloudflare account/configuration and equivalent data/assets.
- Measure baseline and candidate with repeated runs and report median plus p75/p95 where applicable; include confidence/variability rather than selecting a single best run.
- Tune only after identifying bottlenecks. Potential gains may come from caching, query efficiency, payload size, rendering strategy, or image handling—not automatically from Void.
- Run keyboard, screen-reader, mobile viewport, reduced-motion, and form/error-state checks for public pages and admin workflows.

**Gate:** No regression in key UX, security, or correctness; agreed Core Web Vitals and server latency goals met. Set numerical thresholds after Phase 0 baselines, rather than inventing targets now.

### Phase 5 — Staged production cutover

- Back up D1 and verify restoration procedure before production changes. Avoid a schema freeze that requires an outage; instead, coordinate changes through backward-compatible expand/contract migrations.
- Deploy the candidate as a separate Worker and validate it with synthetic checks and production-like read-only data. Do not expose it to production writes before its compatibility is proven.
- Keep the existing Worker serving all traffic while the candidate is warmed and smoke-tested. Switch traffic reversibly using a mechanism supported by the actual domain/routing configuration (for example, Cloudflare routing or a controlled Worker route update); rehearse the exact switch and rollback timing in staging.
- Use a canary or gradual traffic shift only if the current Cloudflare routing setup supports it without splitting writes unsafely. Otherwise use a fast, atomic route switch with pre-cutover health checks. Do not assume DNS changes are instantaneous or rely on DNS alone for rapid rollback.
- Maintain exactly one authoritative writer. During a canary, either route all write requests to the current Worker/one backend or use shared, compatible data and transaction semantics; do not run independent databases or dual-write.
- Monitor Worker errors, auth failures, D1 latency/errors, upload/email outcomes, CPU/duration, cache behavior, synthetic availability, and user-facing metrics continuously through cutover.
- Keep current Worker, configuration, secrets, and bindings intact and deployable for the full rollback window. Do not delete resources or apply destructive schema changes during that window.

**Rollback triggers:** any sustained cutover-attributable 5xx/auth failure increase beyond the agreed error budget, corrupted or missing content, failed critical writes/uploads, binding/resource errors, synthetic availability failure, or agreed performance/UX regression. Route traffic back to the incumbent Worker immediately while preserving shared data. Investigate and repair separately; do not revert an expanded schema or attempt ad-hoc production data rollback without a tested plan. The old Worker must remain compatible with all schema changes until the rollback window closes.

### Phase 6 — Stabilize and retire old path

- Observe through a full representative traffic cycle and verify scheduled/rare workflows.
- Remove obsolete scripts/config only after confirming no rollback dependency remains.
- Document deploy, secrets, migrations, local development, incident response, and resource ownership.
- Re-run full tests and compare performance against baseline; record actual results and ongoing operational tradeoffs.

## Validation checklist

### Functional parity

- Public home, about, contact, blogs, projects, saved items, search, sitemap, robots, and llms routes.
- Pagination, filters, canonical URLs, metadata, social images, redirects, and 404 behavior.
- Login/logout/session expiration, admin authorization, password update, and CSRF/origin behavior.
- All admin create/read/update/delete workflows, taxonomy relations, audit entries, and content-block editor/rendering.
- Contact form and Turnstile verification; feedback limits; email delivery.
- Upload validation/ownership, R2 storage/serving, media listing, audio route, and image transformations.
- D1 migrations, seeds, KV behavior, AI usage, rate-limit behavior, analytics/metrics, and sitemap data refresh.

### Security

- No secrets in client bundles, logs, or committed config.
- Same-site cookie and auth origin behavior; admin access checks server-side on every protected operation.
- Validate request body sizes, content sanitization, upload MIME/size/path checks, rate limits, and error responses.
- Confirm Void provisioning permissions and deployment credentials are least-privilege.

### Performance and UX measurements

Capture before/after for the same routes and test conditions:

- Core Web Vitals: LCP, INP, CLS, using real-user data where available plus lab runs for repeatability.
- HTML and JS/CSS transfer size, hydration work, image bytes, and cache hit/miss behavior.
- Worker request latency (median/p75/p95), error rate, CPU time, and cold/warm behavior where measurable.
- D1 query latency and request count for representative public/admin pages.
- Build duration and deploy duration separately from runtime performance.
- Accessibility checks and task-based admin UX (create/edit/publish content, upload media, review contacts).

## Cost and effort controls

No reliable dollar or time estimate can be derived from the announcement. Track the following during the PoC and migration: Cloudflare Worker and service usage, any Void Platform/Workers for Platforms costs, database/storage usage, build minutes, and engineering/maintenance hours. Do not assume automatic provisioning is free or cheaper. Compare total cost at current usage and a forecasted traffic level before production adoption.

## Explicit non-goals unless proven necessary

- Rewriting Vue components into React or adopting any React-based framework; this migration is Vue-only.
- Replacing Drizzle or changing the D1 schema without a concrete requirement.
- Moving production data or changing domains during the initial PoC.
- Adopting Void's auth or resource APIs for every subsystem at once.
- Claiming a performance improvement without an apples-to-apples measurement.

## Decision record template

Complete before Phase 2:

- Selected Void mode and pinned versions:
- Nuxt/Vue support evidence:
- Existing Worker binding reuse evidence:
- Primary source-of-truth data store after migration (expected: existing D1):
- Any proposed new resource and measured justification:
- Consistency, failure, and rollback strategy for that resource:
- Better Auth/session compatibility evidence:
- D1/Drizzle migration compatibility evidence:
- Current baseline and target metrics:
- Expected workflow benefit:
- Incremental and ongoing cost:
- Known unsupported features:
- Rollback owner and tested procedure:
- No-planned-downtime routing method and rehearsal evidence:
- Error budget/availability threshold during cutover:
- Expand/contract migration and backward-compatibility evidence:
- Go/no-go decision and approver:
