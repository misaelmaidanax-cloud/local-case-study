# Working with AI coding assistants

Local's code is written by an AI coding assistant (Claude Code). I direct it, review what it produces, test the result and decide what ships.

## Who does what

| I do | The assistant does |
|---|---|
| Decide the product: what to build, in what order | Writes and edits code and migrations |
| Describe problems with screenshots from real devices | Proposes plans, risks and alternatives |
| Approve plans for any new flow, layout or integration | Runs type check, lint and build before every release |
| Test every change on the live site, desktop and phone | Drafts legal text, email templates and brand files |
| Handle secrets, accounts and publishing myself | Never receives passwords or keys |

## Rules I set
1. **Plan before big changes.** Small, clear fixes go straight in.
2. **Gates before every release:** type check, lint and build pass, then I look at the change in the browser.
3. **Minimal interface text.**
4. **Use the exact file I give you.** Never redraw brand assets; report quality limits before applying.
5. **Remind me only when I ask.**
6. **No secrets in chats or screenshots.** If one leaks, rotate it.

The rules are stored in the assistant's notes, so they apply to every new session.

## The loop
1. I report a problem or idea, usually with a screenshot.
2. The assistant reproduces it, explains the cause and proposes a fix with risks.
3. I approve or redirect.
4. It implements, runs the gates and checks in a browser, then publishes.
5. I verify on my devices. The tracker is updated.

## Where it went wrong
- **BUG-003:** an AI-written migration reverted an earlier rule and broke merchant onboarding. Code checks all passed because the failure was in database behavior; a manual end-to-end test caught it.
- **Brand assets:** it built logo variants I had not asked for. I told it to use my file as is.
- **Interface text:** it kept adding friendly explanations. I asked three times; the rule is now stored.

## What this taught me
- Automated checks say the code compiles, not that a new merchant can sign up.
- The most valuable review compares behavior across versions of a shared piece, not one file alone.
- Written rules and a tracker make an assistant far more consistent between sessions.
