# Runbooks

Step-by-step procedures I follow to operate Local. No secrets appear here: keys live in each service's dashboard and in my terminal session only.

## 1. Release a new version

1. Type check: `npx tsc --noEmit`
2. Lint: `npm run lint` (errors block the release; warnings are tracked)
3. Production build: `npm run build`
4. Look at the change in the browser at desktop and phone width when it affects what users see.
5. Deploy: `npm run deploy`
6. Verify on the live site: open the changed screen and run the smoke checklist in [test-plan.md](test-plan.md).
7. Commit with a message that says what changed and why.
8. If the release includes a database migration, follow section 2 first.

## 2. Apply a database migration

1. Take a backup (section 3).
2. Read the migration file. If it redefines a shared function, compare it with the latest existing version of that function (see BUG-003).
3. Run it in the database SQL editor. Confirm it reports success.
4. Apply it **before** deploying code that depends on it. The app also has a safe fallback when a new column is missing, so a late migration does not lock people out.
5. Run the full onboarding path by hand: sign up, become a merchant, create a shop.
6. Record the migration in the migrations table of the project README.

## 3. Back up the data

The free database plan has no automatic backups, so I run a script weekly and before every migration.

1. Open a terminal in the project folder.
2. Set the database URL and the service key **in that terminal only** (never in a file, a screenshot or a chat).
3. Run the backup script. It writes one JSON file per table into a dated folder.
4. Store the folder somewhere private. It contains personal data.
5. Clear the key from the terminal session.

Restore is a manual import of the JSON files into the tables, in this order: profiles, shops, products, orders, offers, catalog.

## 4. Keep a free-plan database from pausing

A free-plan database pauses after a week without activity. A small scheduled worker pings it once a day. When the plan is upgraded, the worker is removed.

## 5. Domain and email setup

1. Register the domain at the same provider that hosts DNS.
2. Attach the domain to the app, and add a second worker that serves the catalog site on a subdomain.
3. Redirect `www` to the main domain with a permanent redirect, and check it with a request that does not follow redirects.
4. Contact mailbox: routing from the domain to a personal inbox, then send a test message from another account.
5. Transactional email (password reset, verification): add the domain to the email provider, create the DNS records it asks for, wait until it shows as verified, create an API key limited to sending, and enter it in the authentication service's SMTP settings.
6. Edit the email templates to the app's language and send a real test of each one.
7. Turn off link tracking for transactional email: it rewrites links and can break one-time password reset links.

## 6. Account security checklist

- [ ] Two-step verification on the identity provider used to sign in to hosting, database and code accounts.
- [ ] Recovery codes saved offline.
- [ ] No secrets in screenshots, chats, commits or documents. If one is exposed, it is rotated.
- [ ] The service key is used only for backups, from a terminal.
- [ ] Row-level security stays on for every table; roles are changed only by an admin, except customer to merchant.
- [ ] Admin role is granted by hand in the database, never from the app.

## 7. Incident template

```
Title:
Detected by / when:
Impact (who could not do what):
Timeline:
Root cause:
Fix:
How it was verified:
What changes in the process:
```
