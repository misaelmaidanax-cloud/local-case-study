# How I work with AI coding assistants

Local's code is written by an AI coding assistant (Claude Code). I direct it, review what it produces, test the result and decide what ships. This page describes that process honestly, including where it failed.

## What I do and what I delegate

| I do | The assistant does |
|---|---|
| Decide the product: what to build, in what order, for whom | Writes and edits code and database migrations |
| Describe problems in plain language, with screenshots from real devices | Proposes plans, risks and alternatives |
| Approve plans for anything that changes a flow, a layout or an integration | Runs type checks, lint and builds before every release |
| Test every change on the live site, on desktop and phone | Prepares drafts: legal text, email templates, brand files |
| Handle secrets, accounts and publishing decisions myself | Never receives passwords or keys |

## Rules I set (and the assistant stores)

1. **Plan before big changes.** For a new flow, layout or integration, the assistant shows a plan with risks and waits for my approval. Small, clear fixes are applied directly.
2. **Gates before every release:** type check, lint and production build must pass; then I look at the change in the browser.
3. **Minimal interface text.** No explanatory or marketing sentences in the app unless I ask.
4. **Use the exact file I give you.** For logos and assets, the assistant must not redraw or "improve" them, and must tell me about quality limits before applying anything.
5. **Remind me only when I ask.** Pending items stay on the tracker; I set when they come back.
6. **Secrets never go into chats or screenshots.** If one does, it gets rotated.

These rules are written into the assistant's persistent notes, so they apply to every new session.

## A repeatable loop

1. I report a problem or an idea, usually with a screenshot.
2. The assistant reproduces it, explains the cause, and proposes a fix and the risks.
3. I approve, or redirect.
4. It implements, runs the gates and checks the result in a browser.
5. It publishes. I verify on my own devices and report back.
6. The tracker and the notes are updated.

## Where it went wrong

- **BUG-003:** an AI-written migration reverted an earlier rule and broke merchant onboarding. The code gates (types, lint, build) all passed because the failure was in database behavior. A manual end-to-end test caught it.
- **BUG-008:** the assistant first built logo variants that I had not asked for. I told it to use my file as is, and it now asks before changing brand assets.
- **Interface text:** the assistant repeatedly added friendly explanatory sentences to screens. I asked three times to stop, and the rule is now stored.

## What this taught me

- Automated gates are necessary and not enough: they say the code compiles, not that a new merchant can sign up.
- The most valuable review is of behavior across versions of a shared piece (a function, a schema), not of one file in isolation.
- Clear written rules and a tracker make an assistant much more consistent from one session to the next.
