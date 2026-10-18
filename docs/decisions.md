# Decision records

Short records of why Local is the way it is. Each has the context, the choice, what was rejected and the consequence.

## D-01 · Stack: React framework on edge workers, with a managed Postgres

- **Context:** one person, no budget for servers, needs fast pages in Argentina and real security rules.
- **Choice:** TanStack Start on Cloudflare Workers, Supabase for Postgres, authentication and row-level security.
- **Rejected:** a custom backend (more to maintain and secure), a no-code builder (limited control over permissions and the map).
- **Consequence:** security lives in database policies, so database migrations are the riskiest releases (see BUG-003).

## D-02 · Ordering needs no account

- **Context:** neighborhood shoppers will not register to buy a bottle of oil.
- **Choice:** name and phone are enough. The order is handed to the shop on WhatsApp. An account is optional and only adds order tracking.
- **Rejected:** mandatory sign-up (loses most first-time users).
- **Consequence:** guest orders must be claimable later by an account; this needed a dedicated database function.

## D-03 · Optional email verification, by code

- **Context:** email confirmation at sign-up would put an email round trip in front of every new user, including shop owners.
- **Choice:** accounts work immediately. Verification is optional from the profile, with a code typed into the same screen, and shows a small badge.
- **Rejected:** a verification link (mail apps pre-open links and burn them; the flow leaves the page), and mandatory verification (blocks the quick sign-up that is the product's hook).
- **Consequence:** the badge is trust signal only; nothing is gated by it.

## D-04 · One canonical domain, and shop pages that render their own metadata

- **Context:** the app was reachable on a legacy address and on the new domain; shared links produced a generic preview.
- **Choice:** all shared links use the main domain. Each shop page renders title, description and image on the server, then redirects in the browser.
- **Rejected:** redirecting on the server (crawlers would follow it and see the default metadata).

## D-05 · Map: vector tiles with a raster fallback

- **Context:** a restrained look with crisp labels at every zoom, no API key, and no hard failure if the provider is down.
- **Choice:** an open vector tile provider, restyled in code, with a timer that falls back to plain raster tiles.
- **Rejected:** a commercial provider with a key at this stage (cost and a secret to manage), a raster-only map (blurry when zoomed).
- **Consequence:** the provider is run on donations; if traffic grows, switching providers is a one-file change. Listed as a risk.

## D-06 · Install experience: own prompt, minimal service worker

- **Context:** browsers decide when to show their install prompt, and it never appears on iPhone.
- **Choice:** the app captures the browser's install event and shows its own bar on each visit (dismissed only for the current visit), plus an instructions line on iPhone and a card in the profile. A minimal service worker that caches nothing is registered because some browsers require one.
- **Rejected:** forcing the prompt (not possible without a user tap), and an offline cache (stale-data risk for prices and stock).

## D-07 · Minimal interface text

- **Context:** the audience is shop owners and neighbors, not technical users. Extra explanatory text distracted them.
- **Choice:** short, generic labels. An instruction appears only when the user cannot act without it.
- **Consequence:** this became a standing rule for everything written in the interface.

## D-08 · Backups by script, not by plan

- **Context:** the free database plan has no automatic backups and pauses when idle.
- **Choice:** a weekly backup script and a daily keep-alive worker, until the plan is upgraded.
- **Consequence:** a recurring task on the tracker, and a rule that any migration is preceded by a backup.
