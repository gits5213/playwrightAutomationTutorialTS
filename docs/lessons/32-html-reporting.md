# Lesson 32 — HTML Reporting

## 1. What You Will Learn
- Turn on Playwright’s **HTML report**.
- Read passes, fails, tags, and traces from one page.
- Open the report after a registration run.

## 2. Why This Matters in Real Projects
Terminal output scrolls away. Managers and new testers need a page: what failed, which `@smoke` tests ran, a screenshot of the form. The HTML reporter is that page.

## 3. Concept in Plain English
A **reporter** writes results somewhere. The HTML reporter writes a folder (`playwright-report/`) you open with `npx playwright show-report`. Each test title — including tags — is a row.

## 4. Real-Life Analogy
A school report card versus the teacher shouting scores in the hallway. The card is something you can share.

## 5. Prerequisites
- [Lesson 31](31-trace-viewer.md) (traces often open from the report).
- [Lesson 27](27-smoke-regression-and-tags.md) so titles contain tags.

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `playwright.config.ts` | `reporter: [['html', { open: 'never' }]]` on CI |
| `playwright-report/` | Generated; do not commit |
| `package.json` | `"report": "playwright show-report"` |

## 7. Step-by-Step Instructions
1. Set `reporter` to include `html`.
2. On CI, `open: 'never'` so the robot does not try to launch a browser.
3. Run a registration spec.
4. Run `npx playwright show-report`.
5. Filter or search for `@negative` or a row name like `an email without @`.

## 8. Complete Code Example

```typescript
const isCI = !!process.env.CI;

export default defineConfig({
  reporter: isCI
    ? [['html', { open: 'never' }], ['github']]
    : [['html']],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://gitsuniversity.org',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
});
```

```bash
npx playwright test tests/e2e/registration.data-driven.spec.ts --project=chromium
npx playwright show-report
```

## 9. Line-by-Line Explanation
- `[['html']]` — build the website of results.
- `open: 'never'` — CI-safe.
- `github` — annotations on pull requests (optional extra reporter).
- Data-driven titles — each invalid registrant is its own report row.
- Screenshot on failure — thumbnail next to the red test.

## 10. How to Run It

```bash
npx playwright test --grep @registration --project=chromium
npm run report
```

## 11. Expected Result
A local page lists tests. Green rows passed. You can open a failed row’s screenshot/trace. Tag text is visible in titles (`@smoke`, `@regression`, `@negative`, `@registration`).

## 12. Common Beginner Mistakes
- Committing `playwright-report/` to Git.
- Assuming the old report updates without re-running tests.
- Running tests in two terminals and wondering why the report mixed.

## 13. How to Debug It
If `show-report` is empty, no run happened or `outputFolder` moved. If a test is missing, `--grep` excluded it. Click the error stack; it should point at `expect(...).toContainText`.

## 14. Best Practices
- HTML locally; HTML + GitHub reporter on CI.
- Meaningful titles (`rejects a username shorter than 5 characters`).
- Keep artifacts gitignored.

## 15. What NOT to Do
Do not screenshot the terminal as your only report. Do not paste 500-line logs into Slack when a report link exists. Do not use the report as a test (the tests are the source of truth).

## 16. Hands-On Exercise
Run `@smoke` and `@negative` separately. Open the report each time and count rows. Confirm smoke is smaller.

## 17. Challenge Exercise
Fail one assertion on purpose, open the report, attach the idea of “one click to trace,” then revert the fail.

## 18. Knowledge Check / Quiz
1. Which command opens the HTML report?
2. Why `open: 'never'` on CI?
3. Where do data-driven row names show up?

### Answers
1. `npx playwright show-report`.
2. Nobody is there to view a popped browser; the files are enough.
3. In each test title on the report.

## 19. Interview Questions
1. How do you make Playwright results usable for non-coders?
2. Which reporters would you combine in GitHub Actions?
3. How do reports and traces work together?

## 20. Architect's Notes
Reporting is the last **operations** lesson in this block. Next you learn the TypeScript the specs were already using: variables, types, objects, classes, async. Read those with a **registrant** and a **locator name** in mind, not abstract `foo`.

## 21. Next Lesson
[Lesson 33 — TypeScript Variables](33-typescript-variables.md)
