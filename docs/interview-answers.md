# Interview answers

Use after you try [interview-questions.md](interview-questions.md). Short answers you can say out loud; expand with project examples.

## Phase 0 — Orientation

1. **Manual vs automation.** Manual: a person uses the browser and compares to expected results. Automation: code (here Playwright) drives the browser and reports pass/fail. Manual is better for exploratory and new UX; automation is better for repetition and regression.
2. **Test case.** A named checklist: preconditions, steps, expected result. In Playwright the name is the `test('...')` string and `expect` is the expected result.
3. **Regression.** Re-checking that old behavior still works after a change. Automation makes that cheap enough to run on every pull request.

## Phase 1 — First Playwright test

4. **Playwright.** A library that opens real browsers, follows steps you write in `.spec.ts`, and asserts what a user can see.
5. **`test` / `async` / `await`.** `test` registers one case. The callback is `async` because browser work is asynchronous. `await` pauses until that step finishes (navigation, click, assertion retry).
6. **Navigate and prove load.** `page.goto(url)` then assert something user-visible, e.g. `expect(page.getByRole('heading', { name: 'Registration Form' })).toBeVisible()`.

## Phase 2 — Locators and interactions

7. **Locator.** A recipe for finding an element (role, label, text). It is not the element itself; Playwright resolves it when you act or assert.
8. **Why `getByRole`.** It matches how assistive tech and users see the UI and survives CSS reshuffles. `nth-child` breaks when a wrapper div is added.
9. **Strict mode.** A locator must resolve to **one** element for actions. Two “Password” fields need `exact: true` or separate locators.

## Phase 3 — Test design

10. **Positive vs negative.** Positive: valid data should succeed (or fields should accept values). Negative: invalid or missing data should show the **observed** errors, not success.
11. **Boundaries.** Values at the edge of a rule. Username must be at least 5 characters: length 4 should fail, 5 should pass if the rest of the form is valid.
12. **Confirm Password required?** You **observe** empty submit. On this app it does **not** show a required message when the whole form is empty. Never assume from a template.

## Phase 4 — Maintainability

13. **One-file tests at 100.** Every heading or button change is copied 100 times. Failures are noisy. People fear touching tests.
14. **Three words.** Maintainability: fix once. Reusability: share fills and locators. Scalability: 5 to 5,000 without chaos (time, data, ownership).

## Phase 5 — Page Object Model

15. **POM.** A class per screen that hides locators and offers meaningful actions (`fillForm`, `clickRegister`). Tests stop duplicating selectors.
16. **Page vs test.** Page: how to interact and wait until ready. Test: what must be true (`expect`). Data: values. Do not put product novels in the page class.
17. **Components.** When a widget repeats (table row, header) and is not a whole page. Do not component-ize a single unique checkbox for sport.

## Phase 6 — Data-driven automation

18. **Hardcoded data.** Changing an email means editing many specs; uniqueness is accidental; types cannot help.
19. **Data-driven.** Same steps, many rows (invalid email, short password). Each row should still have a clear test name.
20. **JSON vs TS.** JSON is handy for non-dev editors and large tables; it has weaker typing. TypeScript modules share unions/interfaces with the page. Neither is always better.
21. **Unique users.** Parallel workers and reruns collide on the same username/email. A factory (`uniqueRegistrant`) avoids that.

## Phase 7 — Keyword-driven automation

22. **Keywords.** Named business steps (`thePersonClicksRegister`) so tests read like a checklist.
23. **Keywords vs POM.** Keywords call pages. Pages call Playwright. Do not put CSS in keywords.
24. **When not to.** Tiny suites, one click wrappers, string-based reflection engines, or when debugging would become archaeology.

## Phase 8 — Fixtures

25. **Fixture.** A named ingredient Playwright injects (`page`, or custom `registrationPage`). Setup and teardown wrap the test.
26. **Why inject.** Every test gets a fresh page already on the form. No copy-paste `goto`. Isolation stays with Playwright’s lifecycle.

## Phase 9 — Configuration

27. **Config.** `testDir`, timeouts, retries, workers, reporters, trace/screenshot/video, `projects` (Chromium…). Environment-aware values (`retries: process.env.CI ? 2 : 0`).
28. **Env vars.** `.env` holds local secrets and is gitignored. `.env.example` documents names. CI uses GitHub Secrets. Never commit passwords.

## Phase 10 — Organization, browsers, parallel

29. **Tags.** `@smoke` is a fast confidence net for PRs; `@regression` is broader. `npm run test:smoke` greps the tag.
30. **Cross-browser.** Rendering and engines differ. Start with Chromium; add Firefox/WebKit when stable, often on a schedule.
31. **Parallel.** Playwright runs files (and optionally tests) on workers. Shared mutable data or “test B needs A” causes flakes. Unique data and isolation fix it.

## Phase 11–12 — Debugging and reporting

32. **Flakes.** Product bugs, bad locators, env/data issues, real intermittents. Retries hide; traces explain.
33. **Hard waits.** `waitForTimeout` always waits, even when the app is ready, and still fails when it is slower. Auto-waiting assertions retry until timeout.
34. **Trace Viewer.** A film of actions, DOM, and network for a CI retry. Configure traces on first retry so passing tests stay cheap.
35. **HTML report.** Passed/failed/skipped/flaky, duration, attachments (screenshot, trace, video).

## Phase 13 — TypeScript for QA

36. **`const` vs `let`.** `const` cannot be reassigned; prefer it. `let` when you must reassign. Do not use `var`.
37. **Types/interfaces.** They label a person object so missing `email` fails `tsc` before Chromium opens.
38. **Exports.** Named (`export const x`) can share many names; default is one unnamed export. This course prefers named.
39. **Enums vs unions.** Unions (`'email' | 'phone'`) are lighter for closed string lists. Enums add a runtime object; useful sometimes, often extra for field names.

## Phase 14 — Code quality

40. **ESLint vs tsc.** Types do not catch unused vars or missing `await` on promises as completely as a Playwright ESLint plugin can. Lint is habit review; tsc is shapes.
41. **Prettier vs ESLint.** Prettier formats (quotes, wrapping). ESLint finds bugs and bad patterns. CI should `prettier --check` and `eslint .`, not fight itself.
42. **`tsc --noEmit`.** Checks the whole `include` graph even for files no test ran. `--noEmit` means “do not write JS.” Playwright passing is not a typecheck.

## Phase 15–16 — Git

43. **Flow.** Working tree (edits) → `git add` (staging) → `git commit` (snapshot) → `git push` (GitHub). `git pull` brings others’ snapshots.
44. **Branching.** `main` stays releasable. Feature branches + PR + review + merge. Not full GitFlow unless you truly ship multiple release lines.
45. **gitignore.** `node_modules/`, `playwright-report/`, `test-results/`, `blob-report/`, `.env`, logs, OS junk, `playwright/.auth/`. Keep `.env.example` and `package-lock.json`.

## Phase 17–19 — Pull requests and ownership

46. **PR process.** Branch → commit → push → PR → CI → review → approval → merge. The PR is a conversation plus evidence.
47. **Templates.** Same questions every time: description, type of change, local tests, typecheck, lint, no secrets, docs. Reviewers do not invent a standard on Monday.
48. **CODEOWNERS.** Path → GitHub user/team. Matching PRs request those reviewers. Use real names; training files use `@YOUR_GITHUB_USERNAME` as a TODO placeholder.

## Phase 20–21 — CI/CD and governance

49. **CI.** Every push/PR is built and tested automatically (here: GitHub Actions).
50. **PR tests.** Lint, typecheck, and a Chromium suite (often smoke plus critical registration). Full cross-browser can wait for `main` or nightly.
51. **Workflow.** checkout → setup-node → `npm ci` → lint → typecheck → `playwright install chromium --with-deps` → test → upload HTML report (including on failure).
52. **Protect `main`.** Require PRs, approvals, passing status checks, conversation resolution, optional code-owner review; block force-push and direct commits.

## Phase 22 — Enterprise architecture

53. **5,000 tests.** Layers (tests, fixtures, pages, data, factories, keywords), unique data, tags, workers/shards, flake process, CODEOWNERS, protected `main`, execution matrix (PR smoke vs nightly browsers). UI is not the whole pyramid.
54. **Ownership.** Locators: pages/components. Data: `src/data` + factory. When: GitHub Actions + config. What: tests (and assertion keywords). Who merges: governance.
55. **New abstraction.** When duplication or change-cost is real and the name is obvious. Not because a folder tree looked enterprise. YAGNI + “feel the pain first.”
