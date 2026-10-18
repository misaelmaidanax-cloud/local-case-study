# Bug reports

Ten real defects found while testing Local in October 2026.
**Severity:** Critical = blocks sign-up, ordering or merchant onboarding. High = a main screen is broken. Medium = works but confusing. Low = cosmetic or caused by the platform.

| # | Bug | Severity |
|---|---|---|
| 001 | Login dialog cut off at the top (desktop) | High |
| 002 | Verification code rejected; step lost on reload | Medium |
| 003 | Merchant dashboard fails after a database migration | **Critical** |
| 004 | No way to open the profile on desktop | Medium |
| 005 | Shared links use the old domain and a generic preview | Medium |
| 006 | Location dot never appears | Low |
| 007 | Installed app keeps the old icon | Low |
| 008 | Logo file accepted without a quality check | Medium |
| 009 | Empty map in production after a library upgrade | High |
| 010 | False failures when testing in a background tab | Low |

---

## BUG-001 · Login dialog cut off at the top (desktop)
- **What happened:** clicking "Iniciar sesión" drew the dialog inside the header strip, with the email field cut off and no dimmed background.
- **Cause:** the header uses `backdrop-filter`, which makes it the reference box for `position: fixed` children, so the overlay was sized to the header.
- **Fix:** render the dialog directly in `document.body`.
- **Checked:** reopened it on desktop and phone widths; added an automated regression test.
- **Lesson:** test every new modal from inside containers that have filters or transforms.

## BUG-002 · Verification code rejected; step lost on reload
- **What happened:** the field took 6 digits, but the email held a 10-digit code. Coming back from the mail app also reset the screen to step one.
- **Cause:** code length was hard-coded in the UI while the auth service used another length; the "code requested" state lived only in memory.
- **Fix:** accept 6 to 10 digits, set the service to 6, and keep the step in `sessionStorage` for 15 minutes.
- **Checked:** I re-tested the full flow after the fix.
- **Lesson:** settings in an external service must match what the UI assumes.

## BUG-003 · Merchant dashboard fails after a migration (regression)
- **What happened:** tapping the shop icon showed "We could not activate your panel", on web and phone. Retrying did not help.
- **Cause:** a new migration rewrote a shared database function from an older version and dropped a later rule that lets a customer become a merchant.
- **Fix:** a follow-up migration merged all the rules; the faulty file was corrected too.
- **Checked:** opened the dashboard from a customer account and it activated.
- **Lesson:** after every migration I run the whole onboarding path by hand. The change was AI-written and my review did not compare it with the previous function version; the manual end-to-end test caught it.

## BUG-004 · No way to open the profile on desktop
- **What happened:** the header account button logged the user out. The profile link existed only in the mobile bottom bar.
- **Cause:** the button predated the profile page and was never updated.
- **Fix:** the button opens the profile; log out lives inside it.
- **Checked:** re-tested on desktop.

## BUG-005 · Shared links: old domain and generic preview
- **What happened:** a shop link sent in WhatsApp used the legacy `workers.dev` address and showed the generic Local card.
- **Cause:** the link was built from whatever address was open; and preview crawlers do not run JavaScript, so they only saw default metadata.
- **Fix:** links always use the main domain; each shop page now renders its title, description and image on the server and redirects in the browser afterwards.
- **Checked:** requested the page with a WhatsApp user agent, then sent a real link and saw the shop name.
- **Lesson:** test previews with a crawler user agent. Regression test added.

## BUG-006 · Location dot never appears
- **Classification:** environment, not an app defect.
- **What happened:** no location prompt, no dot on the map.
- **Cause:** the browser had location blocked for the site; once blocked, a site cannot ask again.
- **Fix:** documented how to unblock (desktop, Android, iPhone). The app also asks again when the tab regains focus and when the permission changes.
- **Checked:** after unblocking, the dot appeared.

## BUG-007 · Installed app keeps the old icon
- **Classification:** platform behavior.
- **Cause:** installed web apps cache their icon; iPhone never refreshes it, Android can take days.
- **Fix:** none in code. Documented: remove the app and install it again.

## BUG-008 · Logo file accepted without a quality check
- **What happened:** the first file was 1024 px but an enlarged 169 px screenshot, with soft edges and dark corners.
- **Cause:** no acceptance criteria for design assets.
- **Fix:** I wrote down what I need (true transparency, no fake checkerboard, size, exact colors) and requested a new file; it replaced the first one everywhere.
- **Checked:** inspected the alpha channel and previewed it on light and dark backgrounds.
- **Lesson:** assets get an acceptance check before use, and quality limits are reported before applying, not after.

## BUG-009 · Empty map in production after a library upgrade
- **What happened:** the live map was empty grey; development worked.
- **Cause:** the new major version loads a worker file that the production build did not include.
- **Fix:** pinned the previous major version and added a fallback: if the vector layer does not draw in 25 seconds, show plain raster tiles.
- **Checked:** confirmed on the live site that the vector map draws.
- **Lesson:** every dependency upgrade is checked on the live site, not only locally.

## BUG-010 · False failures in a background tab
- **Classification:** test environment.
- **What happened:** the map looked broken and the fallback timer fired early, then threw an error while removing a layer.
- **Cause:** browsers pause rendering and timers in background tabs; the fallback code also assumed the map still existed.
- **Fix:** the timer starts only when the tab is visible, and the fallback hides the layer instead of removing it.
- **Lesson:** rendering tests run in a visible tab; when a result looks wrong, check the tab state first.
