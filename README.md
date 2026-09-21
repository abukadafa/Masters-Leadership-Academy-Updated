# Masters Leadership Academy — Website

Handoff package for continuing this build in an agentic IDE (Antigravity or similar).

## Start here, in order
1. `reference/registration-certificate.pdf` — the ONLY source of truth for legal/company facts (business name, BN 2357164, CRBN 635769, registered as a Business Name under CAMA 1990 s.659, nature of business, address). Do not invent facts not present here.
2. `reference/homepage-reference.html` — an approved, working single-file homepage (open in a browser). It establishes the visual direction: colour tokens (deep teal ink `#12292B`, copper `#C1783A`, slate `#35586B`, warm paper `#F5EFE2`), type pairing (Fraunces/Inter/IBM Plex Mono), the "ledger card" registration-certificate motif, and the empty-state / `[CMS PLACEHOLDER]` pattern used throughout. Port this into real components — don't just extend the single file.

## What's verified vs. placeholder — hard constraint
This company's certificate gives legal identity, address, and three nature-of-business categories (Seminars & Symposiums, Conferences, Technical Services). It does **not** give: a mission statement, staff/facilitator names, specific programme names, contact email/phone, clients, testimonials, or any statistics. Every one of those is marked `[CMS PLACEHOLDER]` in the reference HTML.

**Do not fabricate any of the above at any point in this build — including seed/demo data.** If demo data is needed for development, label it clearly as `DEMO` and never let it reach a page a real visitor would see as production content. This applies to programme names, testimonials, client logos, staff bios, and photography/video — no stock photography or video should be presented as if it belongs to Masters Leadership Academy; build real, working media components (image slots, `<video>` player) that the client populates with their own assets.

## What exists
- A finished homepage design (HTML/CSS/JS, no framework), reskinned from a sister project (Brands Academy Nigeria Foundation) but fully rewritten for this company's actual registered facts.
- Nothing else has been built: no backend, no auth, no database, no CMS, no deployment config.

## Suggested first tasks for the agent
1. Scaffold a Next.js + TypeScript + Tailwind project; port the design tokens and homepage from `reference/homepage-reference.html` into a proper component structure.
2. Build out `/about`, `/services`, `/programmes`, `/contact` first — get the verified registration facts and service lines live before anything else.
3. Leave `/programmes`, `/media`, `/events`, `/clients` as genuinely empty CMS-driven sections (matching the reference file's empty states) until the client supplies real programme names, footage, event dates, and client logos.
4. Build a real `<video>` component wired to accept an uploaded file or hosted URL — see the comment near `#mlaVideo` in the reference file for the exact spot to wire up.
