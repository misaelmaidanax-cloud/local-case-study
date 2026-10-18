# Decisions

Why Local is the way it is, and what was rejected.

| # | Decision | Why | Rejected |
|---|---|---|---|
| D-01 | **Stack:** React framework on edge workers, with managed Postgres, auth and row-level security | One person, no server budget, fast pages in Argentina, real security rules | A custom backend (more to maintain); a no-code builder (little control over permissions and the map) |
| D-02 | **Ordering needs no account**; name and phone are enough, and the order goes to the shop on WhatsApp | Neighborhood shoppers will not register to buy one product | Mandatory sign-up (loses first-time users) |
| D-03 | **Email verification is optional**, by a code typed in the same screen, with a small badge | Sign-up must stay fast; nothing is blocked by the badge | A verification link (mail apps pre-open and burn links); mandatory verification |
| D-04 | **One main domain**; each shop page renders its own preview data on the server | Shared links showed the old address and a generic card | Redirecting on the server (crawlers would follow it and see default data) |
| D-05 | **Map:** open vector tiles restyled in code, with a fallback to plain image tiles | Clean look at every zoom, no API key, no hard failure if the provider is down | A paid provider (cost and a secret to manage); image-only map (blurry when zoomed) |
| D-06 | **Install:** own install bar on every visit, instructions on iPhone, minimal service worker that caches nothing | Browsers decide when to prompt and iPhone never does | Forcing the prompt (not possible without a tap); offline cache (stale prices and stock) |
| D-07 | **Minimal interface text** | The audience is shop owners and neighbors; extra sentences distracted them | Friendly explanatory messages |
| D-08 | **Backups by script, plus a daily keep-alive** | The free database plan has no backups and pauses when idle | Paying early for the upgrade |

**Consequences worth noting:** security lives in database policies, so migrations are the riskiest releases (BUG-003). The map provider runs on donations; switching is a one-file change if traffic grows.
