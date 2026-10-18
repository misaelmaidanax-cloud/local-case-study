# Runbooks

Procedures I follow to operate Local. No secrets appear here: keys live in each service's dashboard and in my terminal session only.

## 1. Release a new version
1. `npx tsc --noEmit` (type check)
2. `npm run lint` (errors block the release)
3. `npm run build`
4. Look at the change in the browser, desktop and phone width.
5. `npm run deploy`
6. Run the smoke checklist on the live site ([test-plan.md](test-plan.md)).
7. Commit with a message that says what changed and why.

## 2. Apply a database migration
1. Take a backup (section 3).
2. Read the migration. If it redefines a shared function, compare it with the latest version of that function (BUG-003).
3. Run it in the database SQL editor and confirm success.
4. Apply it **before** deploying code that depends on it.
5. Run the whole onboarding path by hand: sign up, become a merchant, create a shop.
6. Note the migration in the project README.

## 3. Back up the data
The free database plan has no automatic backups, so I run a script weekly and before every migration.
1. Open a terminal in the project folder.
2. Set the database URL and the service key **in that terminal only**, never in a file, screenshot or chat.
3. Run the backup script: it writes one JSON file per table in a dated folder.
4. Store the folder somewhere private (it has personal data).
5. Clear the key from the terminal.

A small scheduled worker also pings the database daily so the free plan does not pause it.

## 4. Domain and email
1. Register the domain where DNS is hosted.
2. Attach it to the app; serve the catalog site on a subdomain.
3. Redirect `www` to the main domain with a permanent redirect.
4. Contact mailbox: route the domain address to a personal inbox and send a test.
5. Transactional email: add the domain to the email provider, create the DNS records, wait for "verified", create a send-only API key, enter it in the auth service's SMTP settings.
6. Translate the email templates and send a real test of each.
7. Turn off link tracking for transactional email: it rewrites links and can break one-time reset links.

## 5. Account security checklist
- [ ] Two-step verification on the identity provider used to sign in to hosting, database and code accounts.
- [ ] Recovery codes saved offline.
- [ ] No secrets in screenshots, chats, commits or documents. If one is exposed, rotate it.
- [ ] The service key is used only for backups, from a terminal.
- [ ] Row-level security on for every table; roles change only through an admin (except customer to merchant).
- [ ] The admin role is granted by hand in the database, never from the app.

## 6. Incident template
```
Title:
Detected by / when:
Impact (who could not do what):
Root cause:
Fix:
How it was verified:
What changes in the process:
```
