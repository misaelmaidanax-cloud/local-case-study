# Test plan

Living document for Local. Updated after every release and every incident.

## Scope

In scope: the public web app (search and map, shop page, cart and order, account, profile), the merchant dashboard, the admin area, transactional email, the PWA install experience, shared link previews, legal pages, and the domains (`localarg.com`, `www`, `catalogo`).

Out of scope for now: load and performance testing, accessibility audit, payments (the app does not process payments).

## Environments and devices

| Environment | Use |
|---|---|
| Local development server | Fast checks while a change is being made |
| Production (`localarg.com`) | Final verification after every release. Smoke tests are read-only |

| Device | Browser | Why |
|---|---|---|
| Windows desktop | Chrome | Main desktop path, where the profile button and dialogs live |
| Android phone | Chrome, installed app | Main user path: install, location, WhatsApp handoff |
| iPhone | Safari | Install is manual; no install prompt |
| Narrow desktop window (375 px) | Chrome | Quick mobile layout check |

## Risk areas, in order

1. **Onboarding of a new merchant** (sign up, become a merchant, create a shop, see it on the map). Everything else depends on shops existing. Broken once by a migration (BUG-003).
2. **Ordering without an account** and the WhatsApp handoff.
3. **Account:** sign up (terms must be accepted), log in, password reset by email, optional email verification.
4. **Map and location:** pins by zoom level, location permission states, the vector map and its raster fallback.
5. **Shared links and previews** (BUG-005).
6. **Installability:** manifest, icons, install banner, installed-app behavior.
7. **Releases and migrations:** schema changes that touch shared functions.

## Smoke checklist before each release

- [ ] Home loads, title is correct, the map container is present.
- [ ] "Iniciar sesión" opens a centered dialog; closing it works.
- [ ] "Crear cuenta" without ticking the terms shows an error and creates nothing.
- [ ] `/terminos` and `/privacidad` open and show the owner's details.
- [ ] A shop link (`/shop-name`) returns that shop's name in the preview metadata.
- [ ] `manifest.webmanifest` is valid and each icon returns an image of the declared size.
- [ ] `www.localarg.com` redirects to the apex domain; `catalogo.localarg.com` loads.
- [ ] Manual, after any migration: sign up, become a merchant, create a shop, place an order, open the order link.
- [ ] Manual, on a phone: install banner appears, location prompt, share a shop link in WhatsApp.

The automated part of this list is in [../tests](../tests).

## Known browser limitations (not defects)

- Once location is blocked for a site, the site cannot ask again. The user must unblock it from the address bar (BUG-006).
- Installed web apps keep their old icon until reinstalled (BUG-007).
- iPhone has no install prompt; only instructions can be shown.
- Link-preview crawlers do not execute JavaScript (BUG-005).
- Background tabs pause rendering and timers (BUG-010).

## Defect handling

Each report follows the template in [bug-reports.md](bug-reports.md). The fix is verified on the live site, a regression test is added when the failure can be automated, and the checklist above is updated when the cause points to a gap in the process.
