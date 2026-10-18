# Local: QA, release operations and incident handling

<p align="center"><img src="assets/local-brand.png" alt="Local logo" width="480"></p>

> 🇦🇷 Versión en español: [README.es.md](README.es.md)

A case study of how I tested, operated and documented **[Local](https://localarg.com)**, a real, live web app that connects people in Córdoba, Argentina with their neighborhood shops (kiosks, grocery stores, pharmacies, hardware stores and more).

This repository does **not** contain the application source code. It contains the work around it: test plans, bug reports with root causes, automated smoke tests, runbooks and decision records.

## My role

I own the product and I am its tester and operator.

- **Product owner:** I decide what gets built, in what order, and when it is ready to ship.
- **QA:** I run manual and exploratory testing on desktop and mobile, write the bug reports, and verify each fix on the live site.
- **Operations:** domain, email, backups, releases, security hygiene and a task tracker.
- **Development:** the code is written with AI coding assistants (Claude Code) under my direction. I do not present this as hand-written code. What I contribute is the product direction, the testing, the review of every change and the operational discipline. See [docs/ai-assisted-workflow.md](docs/ai-assisted-workflow.md).

## The product in one paragraph

Someone searches for a product, sees on a map which nearby shops have it, at what price, and whether they are open now, and reserves it for pickup or delivery. The order reaches the shop through WhatsApp. No account is needed to order. Shops sign up for free in a few minutes, load their catalog, get their own link (`localarg.com/shop-name`) and see a summary of orders and sales. It installs from the browser as a PWA.

**Stack (for context):** TanStack Start (React), Supabase (PostgreSQL, Auth, row-level security), Cloudflare Workers, Leaflet with MapLibre vector tiles, Resend for transactional email.

## What is in this repository

| Folder / file | What it shows |
|---|---|
| [docs/test-plan.md](docs/test-plan.md) | Scope, devices, risk areas and a smoke checklist I run before every release |
| [docs/bug-reports.md](docs/bug-reports.md) | Ten real defects: steps, expected vs actual, root cause, fix and how I verified it |
| [docs/runbooks.md](docs/runbooks.md) | Release, backup, domain and email setup, and account security checklists |
| [docs/decisions.md](docs/decisions.md) | Why each technical choice was made, and what was rejected |
| [docs/ai-assisted-workflow.md](docs/ai-assisted-workflow.md) | How I direct, review and verify AI-written code |
| [docs/skills-map.md](docs/skills-map.md) | What I did here, mapped to QA, support and operations roles |
| [tests/](tests/) | Playwright smoke tests that run against the live site, including regression tests for past bugs |

## Highlights

- **A regression I caught the same day it shipped.** A database migration silently reverted a rule that lets a customer become a shop owner. The shop dashboard stopped opening for every new merchant. I found it by running the onboarding flow by hand, traced it to the migration, and it was fixed in a follow-up migration. See BUG-003.
- **Works in development, blank in production.** A map library upgrade rendered fine locally and showed an empty map on the live site. See BUG-009.
- **Crawlers do not run JavaScript.** Shared shop links showed a generic preview on WhatsApp until the page metadata was rendered on the server. See BUG-005.
- **Test results can lie.** Background browser tabs pause rendering and produced false failures. I documented the cause so it stops costing time. See BUG-010.

## Running the smoke tests

```bash
npm install
npx playwright install chromium
npm test
```

The tests are read-only: they open pages and check responses. They never create accounts or orders. By default they run against `https://localarg.com`; set `BASE_URL` to test another environment.

## About me

QA and AI operations background: manual and automated testing (Cypress, Selenium, Playwright), no-code automation and integrations (n8n, Make, GoHighLevel, Zapier), technical support and help desk, and aircraft maintenance before that. I am looking for remote roles in QA, product or AI operations, technical support, or implementation.

- LinkedIn: _add link_
- Project: [localarg.com](https://localarg.com)

_Documentation shared for portfolio purposes. The Local brand and application belong to their owner._
