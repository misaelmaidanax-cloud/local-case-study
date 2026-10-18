# Test plan

Updated after every release and every incident.

**In scope:** search and map, shop page, cart and order, account, profile, merchant dashboard, admin area, email, app install, shared link previews, legal pages, domains.
**Out of scope for now:** load testing, accessibility audit, payments (the app does not process payments).

## Devices

| Device | Browser | Why |
|---|---|---|
| Windows desktop | Chrome | Main desktop path |
| Android phone | Chrome, installed app | Main user path: install, location, WhatsApp |
| iPhone | Safari | Manual install, no install prompt |
| 375 px wide window | Chrome | Quick mobile layout check |

Tests run against the live site (`localarg.com`) after every release. Automated checks are read-only.

## Risk areas, most important first

1. **Merchant onboarding** (sign up, become a merchant, create a shop, see it on the map). Broken once by a migration (BUG-003).
2. **Ordering without an account** and the WhatsApp handoff.
3. **Account:** sign up (terms required), log in, password reset, optional email verification.
4. **Map and location:** pins by zoom, permission states, vector map and fallback.
5. **Shared links and previews** (BUG-005).
6. **Install:** manifest, icons, install bar.
7. **Migrations** that touch shared database functions.

## Smoke checklist before each release

- [ ] Home loads, correct title, map container present.
- [ ] "Iniciar sesión" opens a centered dialog.
- [ ] "Crear cuenta" without accepting the terms shows an error and creates nothing.
- [ ] `/terminos` and `/privacidad` open.
- [ ] A shop link returns that shop's name in its preview data.
- [ ] The manifest is valid and each icon has the declared size.
- [ ] `www` redirects to the main domain; the catalog site loads.
- [ ] By hand, after any migration: sign up, become a merchant, create a shop, place an order.
- [ ] By hand, on a phone: install bar, location prompt, share a shop link in WhatsApp.

The automated part is in [../tests](../tests).

## Known browser limits (not defects)

- A blocked location permission cannot be asked again (BUG-006).
- Installed apps keep the old icon until reinstalled (BUG-007).
- iPhone shows no install prompt.
- Link-preview crawlers do not run JavaScript (BUG-005).
- Background tabs pause rendering and timers (BUG-010).

## When a defect is found

File it in [bug-reports.md](bug-reports.md), verify the fix on the live site, add a regression test when it can be automated, and update this checklist if the cause was a process gap.
