# Local: QA, release operations and incident handling

<p align="center"><img src="assets/local-brand.png" alt="Local logo" width="460"></p>

🇦🇷 **Versión en español:** [README.es.md](README.es.md)

A case study of how I tested, operated and documented **[Local](https://localarg.com)**, a live web app that connects people in Córdoba, Argentina with their neighborhood shops.

This repository has **no application code**. It has the work around it: test plan, bug reports with root causes, automated tests, procedures and decision records.

## My role

I own the product, and I am its tester and operator.

- **Product owner:** I decide what gets built, in what order, and when it ships.
- **QA:** manual and exploratory testing on desktop and phone, bug reports, and verification of every fix on the live site.
- **Operations:** domain, email, backups, releases, account security and a task tracker.
- **Development:** the code is written by AI coding assistants (Claude Code) under my direction. I do not present it as hand-written. I contribute the product direction, the testing, the review of every change and the operational discipline ([how I work with AI](docs/ai-assisted-workflow.md)).

## The product

Someone searches for a product, sees on a map which nearby shops have it, at what price and whether they are open, and reserves it for pickup or delivery. The order reaches the shop on WhatsApp. No account is needed to order. Shops sign up for free in minutes, get their own link and see a summary of their orders. It installs from the browser as a PWA.

**Stack:** TanStack Start (React), Supabase (Postgres, Auth, row-level security), Cloudflare Workers, Leaflet with MapLibre vector tiles, Resend for email.

## Screenshots

Taken from the live site with `tools/capture-screenshots.mjs`. Shops are sample data; the location is simulated in downtown Córdoba, and the install bar is triggered by simulating the browser's install event.

| | |
|---|---|
| <img src="assets/screenshots/01-desktop-map.png" width="460" alt="Map with nearby shops"><br>Map with nearby shops and the user's location | <img src="assets/screenshots/02-desktop-shop-sheet.png" width="460" alt="Shop page"><br>Shop page: open or closed, distance, categories, prices |
| <img src="assets/screenshots/03-desktop-login-dialog.png" width="460" alt="Login dialog"><br>Login dialog, centered (BUG-001) | <img src="assets/screenshots/04-desktop-signup-terms-and-show-password.png" width="460" alt="Sign-up with terms"><br>Sign-up: terms checkbox and show-password button |

| | | |
|---|---|---|
| <img src="assets/screenshots/05-mobile-map.png" width="230" alt="Mobile map"><br>Phone: map | <img src="assets/screenshots/06-mobile-shop-sheet.png" width="230" alt="Mobile shop page"><br>Phone: shop page | <img src="assets/screenshots/07-mobile-profile-and-install-bar.png" width="230" alt="Profile and install bar"><br>Phone: profile and install bar |

<p align="center"><img src="assets/screenshots/08-mobile-map-dark.png" width="230" alt="Dark theme"><br>Dark theme follows the phone setting</p>

## What is here

| File | What it shows |
|---|---|
| [docs/test-plan.md](docs/test-plan.md) | Scope, devices, risks, release checklist |
| [docs/bug-reports.md](docs/bug-reports.md) | Ten real defects: what happened, cause, fix, how I checked |
| [docs/runbooks.md](docs/runbooks.md) | Release, migration, backup, domain and email, security |
| [docs/decisions.md](docs/decisions.md) | Why each choice was made and what was rejected |
| [docs/ai-assisted-workflow.md](docs/ai-assisted-workflow.md) | How I direct, review and verify AI-written code |
| [docs/skills-map.md](docs/skills-map.md) | What I did here, mapped to QA, support and operations roles |
| [tests/](tests/) | 13 Playwright tests against the live site, including regression tests for past bugs |

Every document is also available in Spanish in [docs/es](docs/es).

## Highlights

- **A regression caught the same day it shipped.** A database migration silently reverted a rule that lets a customer become a shop owner, so the shop dashboard stopped opening. I found it by running the onboarding flow by hand (BUG-003).
- **Fine in development, blank in production.** A map library upgrade rendered locally and showed an empty map live (BUG-009).
- **Crawlers do not run JavaScript.** Shared shop links showed a generic preview until the page data was rendered on the server (BUG-005).
- **Test results can lie.** Background tabs pause rendering and gave false failures (BUG-010).

## Run the tests

```bash
npm install
npx playwright install chromium
npm test
```

The tests are read-only: they open pages and check responses, and never create accounts or orders. Set `BASE_URL` to test another environment.

## About me

Background in QA and AI operations: manual and automated testing (Cypress, Selenium, Playwright), no-code automation and integrations (n8n, Make, GoHighLevel, Zapier), technical support, and aircraft maintenance before that. I am looking for remote roles in QA, AI or product operations, technical support, or implementation.

**[LinkedIn: Misael Alejandro Maidana](https://www.linkedin.com/in/misael-alejandro-maidana/)** · **Project: [localarg.com](https://localarg.com)**

<sub>Documentation shared for portfolio purposes. The Local brand and application belong to their owner.</sub>
