# Bug reports

Ten real defects found while testing Local in October 2026, written the way I file them. Severity scale:

- **Critical:** blocks the core flow for new users (sign up, order, onboard a shop).
- **High:** a main screen is broken or unusable on a common device.
- **Medium:** the feature works but is confusing, incomplete or inconsistent.
- **Low:** cosmetic, or caused by the platform rather than the app.

Each report has the same fields: environment, steps, expected, actual, root cause, fix, verification, and what I changed in my process.

---

## BUG-001 · Login dialog appears cut off at the top of the screen (desktop)

- **Severity:** High · **Found on:** Chrome, Windows, desktop width
- **Steps:** open the site, click "Iniciar sesión" in the header.
- **Expected:** a centered dialog over a dimmed screen.
- **Actual:** the dialog was drawn inside the header strip, with the email field cut off at the top and no dimming over the page.
- **Root cause:** the header uses `backdrop-filter`. In CSS, that makes the header the containing block for any `position: fixed` descendant, so the "full-screen" overlay was sized to the header instead of the viewport.
- **Fix:** render the dialog in a portal attached to `document.body`, outside the header.
- **Verification:** reopened the dialog on desktop and mobile widths and checked it is centered with the overlay covering the screen. Added an automated regression test (`tests/ui.spec.ts`).
- **Process change:** any new modal is tested from inside every container that has filters or transforms.

## BUG-002 · Verification code rejected, and the step is lost on reload

- **Severity:** Medium · **Found on:** desktop and phone
- **Steps:** in the profile, tap "Verify", wait for the email, switch to the mail app and come back.
- **Expected:** type the emailed code and finish.
- **Actual:** (1) the field accepted only 6 digits but the email contained a 10-digit code, so the code could never be valid; (2) after returning from the mail app the page had reloaded and showed the first step again.
- **Root cause:** (1) the code length was hard-coded in the UI while the auth provider was configured for a different length; (2) the "code requested" state lived only in memory.
- **Fix:** the field accepts any length from 6 to 10 digits, the provider length was set to 6, and the "code requested" step is kept in `sessionStorage` for 15 minutes.
- **Verification:** I re-tested the flow after the fix and it worked end to end.
- **Process change:** checklist item "settings configured in an external service must match the UI assumptions".

## BUG-003 · Shop dashboard fails to open after a database migration (regression)

- **Severity:** Critical · **Found on:** production, right after release
- **Steps:** as a logged-in customer, tap the shop icon to open the merchant dashboard for the first time.
- **Expected:** the account becomes a merchant account and the dashboard opens.
- **Actual:** the message "We could not activate your panel. Try again" on web and phone. Retrying did not help.
- **Root cause:** a new migration redefined a shared database function (a trigger that guards role changes). It was rewritten from an older version of the function and silently dropped a later rule that allows customer-to-merchant self-service. The role update was then rejected.
- **Fix:** a follow-up migration merged the three rules (only an admin can grant admin; customer and merchant are interchangeable; the email-verified flag changes only through a controlled function).
- **Verification:** opened the dashboard from a customer account; it activated and loaded. The migration file that caused it was also corrected so it is safe to re-run.
- **Process change:** after every migration I run the full onboarding path (sign up, become a merchant, create a shop). Migrations that redefine shared functions must start from the latest version of the function, and the diff is checked against it. The change was AI-generated and my review of the SQL did not compare it with the previous version; the manual end-to-end test is what caught it.

## BUG-004 · No way to open the profile page on desktop

- **Severity:** Medium · **Found on:** desktop
- **Steps:** log in on a desktop browser and look for the profile.
- **Expected:** a link to the profile.
- **Actual:** the only account button in the header logged the user out. The profile link existed only in the mobile bottom bar.
- **Root cause:** the header account button was built before the profile page existed and was never updated; desktop has no bottom bar.
- **Fix:** the header button now opens the profile. Log out lives inside the profile page.
- **Verification:** re-tested on desktop: the button opens the profile and logging out works from there.

## BUG-005 · Shared shop links use the old domain and show a generic preview

- **Severity:** Medium · **Found on:** WhatsApp
- **Steps:** copy a shop link from the merchant dashboard and send it in WhatsApp.
- **Expected:** a link on the project domain, with a preview showing the shop's name.
- **Actual:** the link used the legacy `workers.dev` address, and the preview showed the generic Local card.
- **Root cause:** (1) the link was built from the address currently open in the browser; (2) link-preview crawlers do not run JavaScript, and the page redirected in the browser, so crawlers only saw the default metadata.
- **Fix:** links always use the canonical domain. The shop page now renders its title, description and image in the server-side `<head>`, and redirects to the shop view in the browser afterwards.
- **Verification:** requested the page with a WhatsApp user agent and read the metadata; then sent a real link in WhatsApp and saw the shop name.
- **Process change:** previews are tested with a crawler user agent, not only in a browser. Regression test in `tests/ui.spec.ts`.

## BUG-006 · The "you are here" dot never appears (permission blocked)

- **Severity:** Low · **Classification:** environment, not an app defect
- **Steps:** open the site and expect the browser's location prompt.
- **Expected:** a prompt, then a pulsing dot on the map.
- **Actual:** no prompt, no dot.
- **Root cause:** the browser had the location permission blocked for the site (a crossed-out pin icon in the address bar). Browsers do not allow a site to ask again once blocked.
- **Fix / improvement:** documented how to unblock on desktop, Android and iPhone. The app now re-requests location when the tab regains focus and when the permission state changes, and the map's locate button also re-requests it.
- **Verification:** after unblocking, the dot appeared on load.
- **Process change:** a "known browser limitations" section in the test plan, so this is triaged in minutes next time.

## BUG-007 · Installed app keeps showing the old icon

- **Severity:** Low · **Classification:** platform behavior
- **Steps:** change the app icon, publish, open the already-installed app.
- **Expected:** the new icon.
- **Actual:** the old icon.
- **Root cause:** installed web apps cache their icon; on iPhone it never refreshes by itself, and on Android it may take days.
- **Fix:** none needed in code. Documented the steps: remove the app and install it again.
- **Verification:** reinstalled on the phone and saw the new icon.

## BUG-008 · A logo file accepted without checking its quality

- **Severity:** Medium · **Found in:** asset review
- **Steps:** use the supplied logo image for the app icons.
- **Expected:** a sharp file with real transparency.
- **Actual:** the file was 1024 px wide but was an enlarged screenshot of a 169 px image, so edges were soft. The first version also had dark corners baked in.
- **Root cause:** no acceptance criteria for design assets.
- **Fix:** I wrote down what I need from a supplier (true alpha channel, no fake checkerboard, size, flat colors, exact hex values) and requested a new file. The second delivery met it and replaced the first everywhere.
- **Verification:** inspected the alpha channel of the new file and previewed it on light and dark backgrounds before shipping.
- **Process change:** assets get an acceptance check before they are applied, and I tell the owner about quality limits before applying, not after.

## BUG-009 · Empty map in production after a library upgrade

- **Severity:** High · **Found on:** live site only
- **Steps:** after upgrading the vector map library, open the live site.
- **Expected:** the same map as in development.
- **Actual:** an empty grey map. Development worked.
- **Root cause:** the new major version loaded a worker file that was not included in the production build.
- **Fix:** pinned the previous major version, and added a fallback: if the vector layer does not draw within 25 seconds, the app hides it and shows plain raster tiles.
- **Verification:** checked on the live site after the fix that the vector map draws.
- **Process change:** every dependency upgrade is checked on the live site, not only locally. A "major version bump" row was added to the release checklist.

## BUG-010 · False failures while testing in a background browser tab

- **Severity:** Low · **Classification:** test environment
- **Steps:** run a check in a browser tab that is not in the foreground.
- **Expected:** the same result as in a foreground tab.
- **Actual:** the map looked like it failed, and the fallback timer fired early, then threw an error while removing a layer.
- **Root cause:** browsers pause rendering and timers in background tabs. Two separate issues: the test result was misleading, and the fallback code assumed the map still existed when it ran.
- **Fix:** the timer now starts only when the tab is visible, and the fallback hides the layer instead of removing it.
- **Verification:** repeated the check with the tab in the foreground.
- **Process change:** tests that depend on rendering run in a visible tab; when a result looks wrong, I check the tab state first.
