# Lesson 28 — Cross-Browser Testing

## 1. What You Will Learn
- Run the same registration tests in Chromium, Firefox, and WebKit.
- Configure `projects` in `playwright.config.ts`.
- Decide when one browser is enough.

## 2. Why This Matters in Real Projects
Users do not all use Chrome. A dropdown that works in Chromium can misbehave in Safari’s engine (WebKit). Playwright **projects** are named browser setups, not copied spec files.

## 3. Concept in Plain English
**Cross-browser** means one test file, many engines. Playwright launches Chromium, Firefox, or WebKit and replays the same `registrationPage.fillForm` steps.

## 4. Real-Life Analogy
One script for a school play, three theaters. The lines stay the same. The stage lights differ. Projects are the theaters.

## 5. Prerequisites
- [Lesson 25](25-playwright-config.md) and [Lesson 27](27-smoke-regression-and-tags.md).
- `npx playwright install` (or install firefox/webkit when you enable them).

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `playwright.config.ts` | `projects` array with `devices` |
| CI workflow (later) | Which projects run on pull requests |

## 7. Step-by-Step Instructions
1. Import `devices` from `@playwright/test`.
2. Add projects: `chromium`, `firefox`, `webkit`.
3. Keep learning default as Chromium-only; uncomment others when ready.
4. Run one project: `--project=firefox`.
5. Install browsers: `npx playwright install firefox webkit`.

## 8. Complete Code Example

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL ?? 'https://gitsuniversity.org',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

```bash
npx playwright test tests/e2e/registration.spec.ts --project=chromium
npx playwright test tests/e2e/registration.spec.ts --grep @smoke --project=webkit
```

## 9. Line-by-Line Explanation
- `devices['Desktop Chrome']` — viewport, user agent, Chrome-like defaults.
- Each **project** re-runs matching tests in that engine.
- `--project=chromium` — do not wait on three browsers while you debug a locator.
- Smoke on WebKit — a cheap Safari-engine check on the heading.

## 10. How to Run It

```bash
npx playwright install chromium firefox webkit
npx playwright test tests/e2e/registration.spec.ts --grep @smoke
```

## 11. Expected Result
The report lists the same test names under each project (for example `chromium` / `firefox` / `webkit`). The heading **Registration Form** is visible in each.

## 12. Common Beginner Mistakes
- Copying `registration.spec.ts` into `registration.firefox.spec.ts`.
- Assuming “Chromium = Chrome the app.” Chromium is the engine Playwright drives; Chrome the product can still differ slightly.
- Enabling three browsers in every local save (slow feedback).

## 13. How to Debug It
Reproduce with `--project=webkit --headed --debug`. Check native `<select>` for `gender` and `country` — they are common cross-engine surprises. Compare traces per project.

## 14. Best Practices
- Chromium on every save; Firefox/WebKit in CI or nightly.
- Same locators (roles/ids) — do not fork page objects per browser.
- Unique factory emails still matter: more projects means more parallel workers.

## 15. What NOT to Do
Do not write `if (browserName === 'firefox')` all over specs. Do not skip accessibility locators just because an id worked in Chrome. Do not test only headed Chrome and call it “cross-browser.”

## 16. Hands-On Exercise
Enable Firefox, run `@smoke @registration` on `--project=firefox`, and confirm the heading.

## 17. Challenge Exercise
Add a `Mobile Chrome` project with `devices['Pixel 5']` and see whether the Register button still needs `scrollIntoViewIfNeeded`.

## 18. Knowledge Check / Quiz
1. Where do you declare extra browsers?
2. What command runs only WebKit?
3. Why not duplicate spec files per browser?

### Answers
1. `projects` in `playwright.config.ts`.
2. `npx playwright test --project=webkit`.
3. Projects reuse the same tests; copies drift.

## 19. Interview Questions
1. How does Playwright model cross-browser runs?
2. How would you choose PR vs nightly browser coverage?
3. What UI controls are most likely to differ across engines?

## 20. Architect's Notes
Projects multiply **runtime**, not code. Pair with tags: PRs run `@smoke` on Chromium (and maybe WebKit); nightly runs `@regression @registration` on three engines. Next lesson: those extra runs execute **in parallel**, so unique data is mandatory.

## 21. Next Lesson
[Lesson 29 — Parallel Execution](29-parallel-execution.md)
