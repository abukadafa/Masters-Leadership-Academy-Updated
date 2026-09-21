# PROJECT_AUDIT.md — Masters Leadership Academy

Last updated: 2026-08-22, following a full-repository audit and remediation pass.

This is the single source of truth for the current state of the codebase. Read this before
making architectural changes. The app is small (~5,000 LOC) and still pre-launch, so one
consolidated document is proportionate — split it into ARCHITECTURE.md / DATABASE_SCHEMA.md /
API_CONTRACTS.md / DEPLOYMENT.md etc. only once the app has grown enough that a single file
becomes unwieldy.

## 1. What this app is

A Next.js 16 (App Router, Turbopack) + TypeScript + Tailwind v4 marketing site and lead-capture
backend for Masters Leadership Academy, a Nigerian company offering seminars/symposiums,
conferences, and technical services (per `reference/registration-certificate.pdf`, the sole
source of verified legal facts — see `README.md`).

**Hard content rule, inherited from the original brief and still in force:** no staff names,
programme names, testimonials, client logos, statistics, or media may be fabricated anywhere in
the app, including seed/demo data. Missing real content uses the existing CMS-placeholder
pattern (`components/CMSPlaceholder.tsx`, `components/EmptyState.tsx`, `components/CmsGridSlot.tsx`)
instead.

## 2. Architecture as it actually exists

- **Frontend:** Next.js App Router, all pages under `app/`. Public marketing pages
  (`/`, `/about`, `/services`, `/programmes`, `/contact`, etc.), 6 public lead-capture forms,
  and an `/admin` section gated by `app/admin/(dashboard)/layout.tsx`.
- **Styling:** Tailwind v4 with a hand-tuned design system (deep teal ink, copper accent, warm
  paper background — see `app/globals.css`). Fonts: Fraunces / Inter / IBM Plex Mono via
  `next/font/google`.
- **Auth:** Stateless HMAC-signed session tokens (`lib/auth.ts`, Web Crypto API — Edge-runtime
  safe, used in `proxy.ts`). Password hashing is scrypt + timing-safe compare (`lib/password.ts`,
  Node-only, never imported from `proxy.ts`). Session cookie is httpOnly, sameSite=lax, secure
  in production, 8-hour TTL.
- **Authorization:** Role-based (`lib/permissions.ts`). 7 roles defined in `lib/auth.ts`; 5 can
  reach the admin dashboard. Section-level access control (`SECTION_ACCESS`) is enforced
  server-side in every admin page, not just hidden in the UI.
- **Database:** SQLite via Node's built-in `node:sqlite` (`lib/db.ts`), file-based, WAL mode.
  7 tables: `users` + one table per lead-capture form + `push_subscriptions`. Schema is created
  idempotently on first connection. `lib/models.ts` provides a typed query layer; a small
  `makeTable<T>()` factory removes repetition across the 6 submission tables.
- **API:** 9 route handlers under `app/api/`, all POST, all following the same
  parse → honeypot check → validate → rate-limit → insert shape (harmonized in this pass —
  see §4).
- **Edge middleware:** `proxy.ts` (Next 16's renamed `middleware.ts` — verified against
  `node_modules/next/dist/docs`) handles HTTPS redirect, admin route protection, and baseline
  security headers (CSP, X-Frame-Options, HSTS, Permissions-Policy) on every request.
- **PWA:** manifest + service worker (`public/sw.js`) with a documented, deliberately
  conservative caching strategy (network-first for pages, cache-first for static assets).
  Push *subscriptions* are collected and stored; push *sending* is explicitly not implemented
  yet (documented in both `lib/models.ts` and `public/sw.js`).
- **i18n:** `lib/i18n/` with English, French, Arabic dictionaries; `lib/locale.ts` handles
  locale/currency/timezone switching client-side.

## 3. Audit finding: this is not a multi-agent-conflict codebase

The master remediation brief this audit was run against assumes heavy conflict between
successive AI agents (duplicate components, competing implementations, inconsistent naming).
**That assumption didn't hold.** This repository is small, was evidently built in one coherent
pass, and shows no duplicate components, no duplicate API routes, no duplicate database tables,
and consistent naming/response conventions throughout. TypeScript compiled clean with zero
errors before this audit began. This section exists so a future agent doesn't go looking for
conflicts that aren't there.

## 4. Findings and fixes made in this pass

### Critical — content integrity violation (fixed)
The homepage `/` (Media section) and `/media` (Gallery tab) displayed two AI-generated stock
photographs — `public/seminar_session.jpg` and `public/conference_hall.jpg` — captioned with
**fabricated programme names** ("Contemporary Leadership Models & Executive Presence",
"Strategic Planning for Growth & Network Leadership") and labeled in source comments as
`{/* Real image 1 */}` / `{/* Real image 2 */}`. Both images contained garbled AI-generated
text (visible fake slide/branding text reading "GLOBAL INC." and "GLOBAL LEADERSHIP SUMMIT
2054"). This directly violated the project's own README rule against presenting stock imagery
as genuine Academy content.
**Fix:** both images removed from `public/`; both call sites replaced with the existing
`CmsGridSlot` empty-state pattern, matching how every other page (testimonials, clients,
leadership) already handles unsupplied real content. This also resolved two
`@next/next/no-img-element` lint warnings as a side effect.

### Security — no abuse protection on public endpoints (fixed)
None of the 6 public form endpoints or the admin login endpoint had rate limiting, email
format validation, field length limits, or spam protection (honeypot/CAPTCHA).
**Fix:**
- `lib/rate-limit.ts` — shared in-memory sliding-window limiter, keyed by IP + bucket name.
  Public forms: 5 requests / 10 minutes. Login: 8 attempts / 5 minutes (brute-force
  protection). Documented as single-instance-only; needs a shared store (Redis or a DB table)
  if ever deployed across multiple instances — matches the existing caveat already documented
  for SQLite in `lib/db.ts`.
- `lib/validate.ts` — shared `isValidEmail`, `readBoundedField` (200-char cap for short
  fields, 5,000-char cap for message/details fields — rejects with 400 rather than silently
  truncating), and `isHoneypotFilled`.
- `components/Honeypot.tsx` — shared hidden-field component (off-screen, not `display:none`,
  `aria-hidden`, `tabIndex={-1}`) wired into all 5 public form UIs. A filled honeypot causes
  the API route to return a fake success without persisting the submission, so bots don't
  learn they were caught.
- All 6 public POST routes and the login route now follow this same pattern.
- Logout route's cookie-clearing now sets the same `httpOnly`/`secure`/`sameSite` attributes
  as login, for consistency.

### Bug — TypeScript `any` (fixed)
`lib/models.ts`'s generic `makeTable<T>()` insert helper used `row as any`, the one lint error
in the repo. Replaced with `Record<string, string | number | null>`, matching the actual shape
every caller passes.

### Gap — missing `.env.example` (fixed)
No environment variable template existed despite `SESSION_SECRET`, `DATABASE_DIR`,
`NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, and the `ADMIN_*` bootstrap
vars all being read from `process.env`. Added `.env.example` documenting each one.

### Bug — `.gitignore` would have silently excluded `.env.example` (fixed)
The existing `.env*` ignore rule matches `.env.example` too, so it would never have reached
version control once created. Added `!.env.example` exception.

## 5. Known gaps — not fixed in this pass, and why

These are real, but were left alone deliberately rather than fixed speculatively, per the
"don't add features unless justified" principle:

- **No CSRF token system.** Not added, because the existing protection (sameSite=lax cookies +
  JSON `Content-Type` requiring a preflight for true cross-origin POSTs) already covers the
  realistic threat model for this app, and adding token plumbing to 7 forms for marginal
  benefit would be exactly the kind of unjustified complexity the brief warns against. Flagged
  here so a future agent doesn't reintroduce it without reason.
- **Push notifications are collected but never sent.** Documented as intentional, staged work
  in both `lib/models.ts` and `public/sw.js` by the original build. Left as-is.
- **No automated tests exist** (no test runner is configured in `package.json`). See §7.

## 6. Verification performed

```
npm install       PASS
tsc --noEmit      PASS (0 errors)
npm run lint      PASS (0 errors, 0 warnings)
npm run build     NOT TESTED — this sandbox cannot reach fonts.googleapis.com (next/font
                  fetches Fraunces/Inter/IBM Plex Mono at build time and the network
                  allowlist here doesn't include Google Fonts). This is an environment
                  limitation, not a code defect — the same build should succeed in any
                  environment with normal internet access. Recommend running `npm run build`
                  once in the real deployment/CI environment before shipping.
GET /api/health   PASS — verified live against `npm run dev` (returns {"status":"ok",
                  "database":"ok"})
```

No test suite exists to run (`npm test` is not defined). See §7.

## 7. Remaining work for a human / future agent

- Run `npm run build` in an environment with access to fonts.googleapis.com to get a real
  production-build signal (this pass could only verify typecheck + lint).
- Set up a test runner (Vitest or Jest) if automated testing is wanted — none exists yet.
- Supply real content for every `[CMS Placeholder]` slot across the site
  (leadership bios, programme names, testimonials, client logos, media) — all currently and
  correctly show empty states, per the content-integrity rule in §1.
- Decide on Web Push sending (needs the `web-push` package + a send job) or remove the
  half-built subscription collection if it's not going to be finished.
- **Database persistence on Vercel is still unresolved.** `lib/db.ts` uses `node:sqlite`
  writing to a local file — this does not persist reliably on Vercel's serverless functions.
  Either mount `DATABASE_DIR` on a persistent volume (not available on Vercel) or migrate to
  a hosted database (Turso is the smallest change, being SQLite-wire-compatible; Postgres via
  Neon/Vercel Postgres is the alternative). The query surface in `lib/models.ts` is
  intentionally small and easy to port. **Not done — needs the client's hosting decision and
  credentials before it can be implemented.**
- Real impact-counter values (Students Trained, Seminars Delivered, Workshops Delivered,
  Conferences Hosted, and any others added) are seeded at 0 and need real numbers entered via
  `/admin/impact` — see §9.
- Generate a real `SESSION_SECRET` and set it in production — the app throws on startup in
  production if it's missing, which is correct behavior, not a bug.

## 8. Production-readiness pass (2026-08-22, second pass)

Full-site sweep for SEO, accessibility, error handling, and brand consistency ahead of
launch. All changes verified with `tsc --noEmit` (0 errors) and `npm run lint` (0 errors,
0 warnings) after each step; `npm run build` still can't be verified in this sandbox (no
network access to fonts.googleapis.com for `next/font/google` — same documented limitation
as §6). Run it once in an environment with normal internet access before shipping.

### Accessibility — contrast fix
`--muted-paper` (`#78735F`, used for secondary/meta text across ~15 pages at 12–18px) only
hit a 4.15:1 contrast ratio against `--paper`, below the WCAG AA 4.5:1 threshold for normal
text. Darkened to `#6C6856` (4.88:1) — close enough to the original that the visual identity
is unchanged. Also removed an `opacity-70` modifier on 4 legal pages' "Last updated" lines
that compounded the problem further.

### SEO — metadata was effectively missing site-wide
Only the root layout had a `<title>`/description; all 29 routes shared the same one, no
`metadataBase`, no Open Graph/Twitter tags, no canonical URLs, no structured data, no
`robots.txt`/`sitemap.xml`, and admin/legal-placeholder pages were indexable.
**Fixed:**
- `lib/site.ts` — single source of truth for site URL, name, description, and verified org
  facts, so metadata and JSON-LD can't drift out of sync with each other.
- Root layout: `metadataBase`, title template (`%s — Masters Leadership Academy`), full
  Open Graph + Twitter Card defaults, expanded favicon set, explicit viewport
  width/initialScale (was silently dropped once a custom `viewport` export was added —
  Next.js doesn't backfill defaults once you override the export).
- Unique `title`/`description` added to all 14 server-rendered pages directly; 7
  client-component pages (careers, contact, corporate-training, faq, partnerships,
  register, verify-certificate) got a sibling `layout.tsx` instead, since `metadata` can't
  be exported from a `"use client"` file.
- `/admin/login` and the admin dashboard layout: `robots: noindex`.
- The 4 legal pages (privacy, terms, cookies, refund-policy) currently render "not yet
  published" placeholder text — set `robots: noindex` on all 4 rather than let thin content
  get indexed, until real policy text replaces the placeholders.
- `/programmes/[slug]`: every slug currently resolves to a "not yet published" state (no
  programme catalogue exists yet), which is a classic soft-404 pattern. Added
  `generateMetadata` with `robots: noindex` per-slug rather than changing the route's
  response behavior, to avoid the SEO risk without touching working UX.
- `app/robots.ts` and `app/sitemap.ts` — dynamic, list only the 18 genuinely indexable
  routes (excludes `/admin/*`, the 4 noindexed legal pages, and `/programmes/[slug]`).
- `components/OrganizationJsonLd.tsx` — `Organization` JSON-LD in the root layout, built
  only from the verified facts in `lib/site.ts` (name, BN/CRBN numbers, address) — no
  fabricated phone/email/social profiles.
- `app/opengraph-image.tsx` — a generated (not stock-photo) 1200×630 OG/Twitter card using
  the site's own type and color tokens; Next.js serves it for both Open Graph and Twitter
  automatically since no separate `twitter-image.tsx` exists.

### Error handling — none existed
No custom 404, no error boundary, no root-level error boundary — all three would have
fallen back to Next.js's unstyled defaults.
**Fixed:** `app/not-found.tsx` (themed, uses `PageHero` + real navigation links),
`app/error.tsx` (client error boundary with a "Try Again" button calling `reset()`),
`app/global-error.tsx` (covers errors thrown in the root layout itself, which
`error.tsx` cannot catch — must render its own `<html>/<body>` per Next.js's contract, so
it uses inline styles rather than Tailwind classes since it may render when the rest of the
app has failed to).

### Brand consistency — two files still used the old reference-file palette
`public/offline.html` (PWA offline fallback) and `public/manifest.json`
(`background_color`/`theme_color`) were never updated when the design tokens changed from
the original reference HTML (`#12292B` ink / `#C1783A` copper / `#F4EFE6` paper) to the
site's actual current tokens (`#0B192C` / `#D4AF37` / `#F5EFE2` in `app/globals.css`). Fixed
both to match. Also added `id`, `lang`, and `categories` to `manifest.json` — minor but
standard PWA-manifest fields that were missing.

### Config — minor production hardening
`next.config.ts`: added `poweredByHeader: false` (don't advertise the framework/version via
response headers) and explicit `reactStrictMode: true`.

### Still not done, and why
- **`npm run build` unverified** — sandbox network limitation, not a code issue (see above).
  Highest-priority item to run once in a real environment before deploying.
- **Real OG/social preview testing** — the generated `opengraph-image.tsx` hasn't been
  checked against actual Facebook/X/LinkedIn preview scrapers; do a quick check with each
  platform's debugger tool after deploying.
- **Self-hosting fonts** (`next/font/local` instead of `next/font/google`) would remove the
  build-time dependency on reaching fonts.googleapis.com entirely — worth considering if the
  eventual CI/deploy environment has restricted network access, but not done here since the
  current approach works fine on any host with normal internet access (e.g. Vercel).
- Everything listed in §5 and §7 above is still open — this pass didn't touch the admin
  workflow, CSRF, push-sending, or test-runner gaps.

## 9. Admin dashboard functionality (2026-08-22, third pass)

Closes the "admin dashboard is read-only" gap flagged in the previous pass of this document.

- **Status management.** Every submission table (`enquiries`, `corporate_training_requests`,
  `partner_applications`, `sponsor_applications`, `facilitator_applications`,
  `registration_interests`) gained an `updateStatus()` model method, exposed through a single
  whitelisted `PATCH /api/admin/status` route (table name is matched against a fixed map, never
  interpolated from the request) and enforced against the same `SECTION_ACCESS` permission
  table used elsewhere. A `StatusSelect` client component wires this into all five admin list
  pages so status (New / In Review / Contacted / Closed) can be changed in place.
- **Impact counters.** New `impact_stats` table (label, value, sort order), seeded with four
  starter counters at value 0 (Students Trained, Seminars Delivered, Workshops Delivered,
  Conferences Hosted) so the admin has something to edit rather than an empty screen. Full
  CRUD via `/admin/impact` (`ImpactStatsManager`), a public read-only `GET /api/impact-stats`
  endpoint, and a homepage section (`components/ImpactStats.tsx`, "The Academy in numbers")
  that renders the live values — or a CMS-placeholder-style empty state if every counter is
  still at 0, consistent with the content-integrity rule in §1 (no fabricated statistics are
  ever shown).
- Search/filter/export/notes/audit-log admin capabilities (also listed under §14 of the
  original remediation brief) were **not** added in this pass — status management was the
  specific, requested gap; the rest remain open, justified future work rather than assumed
  requirements.
- Verified functionally (not just type-checked): direct model calls against a scratch database
  confirmed seeding, create/update/delete on `impact_stats`, and `updateStatus()` on a
  submission row all work as intended.

## 10. Health check and script hygiene (2026-08-22, third pass)

- Added `GET /api/health` (§39 of the remediation brief) — reports `{status, database}` by
  running a trivial `SELECT 1`, no internals or credentials exposed. Verified live against
  `npm run dev`.
- Added a `typecheck` script (`tsc --noEmit`) to `package.json` — the remediation brief's own
  build-validation step (§31) expects `npm run typecheck` to exist; it previously didn't.

## 11. Outstanding blocker for Vercel deployment

The client asked about hosting the admin on Vercel. This is **not yet resolved** and is the
single biggest open item: `lib/db.ts` writes to a local SQLite file, which does not persist
reliably on Vercel's serverless/ephemeral filesystem. See §7 for the two viable paths (Turso,
or hosted Postgres) — neither has been implemented, since both require the client to create an
account and supply credentials first.

