# Lesson 31 — Trace Viewer

## 1. What You Will Learn
- What a Playwright **trace** is.
- Why config uses `trace: 'on-first-retry'`.
- Open a trace and inspect a registration click.

## 2. Why This Matters in Real Projects
CI has no Inspector window. A trace is a recording: screenshots, DOM, network, and each action. You can see whether Register was clicked before the email was filled.

## 3. Concept in Plain English
A **trace** is a zip-like file of the test’s movie. **Trace Viewer** plays it. `on-first-retry` means: first fail, retry, and record that retry — not every passing test (which would be huge).

## 4. Real-Life Analogy
A body camera on a delivery driver. You only keep the footage when a delivery is disputed (failure/retry), not every successful drop.

## 5. Prerequisites
- [Lesson 30](30-debugging-playwright.md).
- [Lesson 25](25-playwright-config.md) `use.trace`.

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `playwright.config.ts` | `trace: 'on-first-retry'` |
| `test-results/` (generated) | Trace zip after a retry |
| Nothing in `src/` | Viewer is a command, not app code |

## 7. Step-by-Step Instructions
1. Confirm `use.trace` is `'on-first-retry'` (or `'on'` while learning).
2. Force a fail (wrong heading text) **and** `retries: 1` locally, or run with `--trace on`.
3. After the run, open the HTML report and click the trace, or use `show-trace`.
4. Scrub to `click` on `#registration-form-submit-button`.
5. Check the **before/after** snapshot of the first-name box.

## 8. Complete Code Example

```typescript
use: {
  baseURL: process.env.BASE_URL ?? 'https://gitsuniversity.org',
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},
retries: process.env.CI ? 2 : 0,
```

```bash
npx playwright test tests/e2e/registration.spec.ts --trace on --project=chromium
npx playwright show-trace test-results/path-to-trace.zip
npx playwright show-report
```

## 9. Line-by-Line Explanation
- `on-first-retry` — record when it failed once and ran again.
- `--trace on` — record this run even if it passed (great for class).
- `show-trace` — standalone viewer.
- `show-report` — HTML report often links the same trace.
- Action list — `goto`, `fill` first name, `click` Register.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.spec.ts -g "page loads" --trace on --project=chromium
npx playwright show-report
```

## 11. Expected Result
Trace Viewer shows the **Registration Form** heading, the fill actions, and (if you ran a submit test) the success title. You can click a `fill` on the email locator and see the value.

## 12. Common Beginner Mistakes
- `trace: 'on'` for the entire CI suite — artifacts explode.
- Looking in the wrong folder; traces live under `test-results/`.
- Expecting a trace on the first local fail when `retries` is 0 and trace is `on-first-retry`.

## 13. How to Debug It
No zip? Re-run with `--trace on`. Viewer blank? Try another browser for the viewer itself. Compare two actions: was `terms.check()` before `clickRegister`?

## 14. Best Practices
- CI: `on-first-retry` + retries.
- Local learning: `--trace on` for one test.
- Keep traces out of Git (already ignored).

## 15. What NOT to Do
Do not email huge trace zips with real PII. This practice form is fake data; still avoid recording production passwords. Do not use traces instead of fixing locators.

## 16. Hands-On Exercise
Run one `@smoke @registration` test with `--trace on`, open the report, and write down the locator Playwright used for the heading.

## 17. Challenge Exercise
Fail `toContainText('Registration Successful')` without filling the form. In the trace, prove Register was clicked and success title was missing.

## 18. Knowledge Check / Quiz
1. When does `on-first-retry` record?
2. Which command opens a zip directly?
3. Why not always `trace: 'on'` in CI?

### Answers
1. On the retry after a failure, not necessarily the first attempt.
2. `npx playwright show-trace <file.zip>`.
3. Size, time, and storage cost for passing tests.

## 19. Interview Questions
1. How do you debug a Playwright failure that only happens in CI?
2. Compare trace vs screenshot vs video.
3. What trace setting would you choose for a large nightly job?

## 20. Architect's Notes
Traces are **evidence**, not a test strategy. Combine with HTML reporting (next) so a teammate can open one URL, click a failed `@negative` row, and launch Trace Viewer without reproducing locally.

## 21. Next Lesson
[Lesson 32 — HTML Reporting](32-html-reporting.md)
