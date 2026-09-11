# Lesson 25 — Playwright Config

## 1. What You Will Learn
- Read `playwright.config.ts` as the **control room** for the suite.
- Set `baseURL` to `https://gitsuniversity.org` and open `/practice/registration-form/`.
- Know which knobs matter first: timeout, projects, reporter, trace.

## 2. Why This Matters in Real Projects
Without config, every spec repeats the site URL and timeout. One config change moves the whole class from practice to staging. CI can retry and save traces; your laptop can stay fast and quiet.

## 3. Concept in Plain English
**Config** is a TypeScript file Playwright reads before any test. It answers: where are tests, which browser, what is the site root, how long to wait, what report to write.

## 4. Real-Life Analogy
A theater lighting board: one place sets brightness for every scene. Actors (tests) do not each carry a dimmer switch.

## 5. Prerequisites
- [Lesson 24](24-playwright-fixtures.md).
- You can run `npx playwright test`.

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `playwright.config.ts` | `defineConfig`, `baseURL`, projects, reporter |
| `src/utils/env.ts` | Optional extras like the registration path |
| `src/pages/registration.page.ts` | `goto` uses baseURL + path |

## 7. Step-by-Step Instructions
1. Open `playwright.config.ts`.
2. Set `testDir: './tests'`.
3. Set `use.baseURL` to `process.env.BASE_URL ?? 'https://gitsuniversity.org'`.
4. In `goto`, use `/practice/registration-form/` (relative to `baseURL`).
5. Keep one project (`chromium`) while learning; add Firefox/WebKit in Lesson 28.

## 8. Complete Code Example

```typescript
import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: [['html', { open: isCI ? 'never' : 'on-failure' }]],
  timeout: 30_000,
  use: {
    baseURL: process.env.BASE_URL ?? 'https://gitsuniversity.org',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});

// In RegistrationPage.goto():
await this.page.goto('/practice/registration-form/');
```

## 9. Line-by-Line Explanation
- `baseURL` — root of the site; tests use **paths**, not full URLs.
- `/practice/registration-form/` — the GITS practice form.
- `timeout` — max length of one test (30 seconds here).
- `retries` — extra attempts on CI only, so flakes get a trace.
- `projects` — named browser setups (Lesson 28 expands this).
- `trace: 'on-first-retry'` — Lesson 31.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.spec.ts --project=chromium
```

## 11. Expected Result
The browser opens `https://gitsuniversity.org/practice/registration-form/` even though the spec never spelled the host. The HTML report folder is created after the run.

## 12. Common Beginner Mistakes
- Putting the full URL in every `goto` **and** in `baseURL` (hard to switch environments).
- Setting `timeout` to 5 minutes to “fix” a bad locator.
- Enabling every browser on day one and tripling wait time.

## 13. How to Debug It
Print the URL: `console.log(page.url())`. If you land on the wrong host, check `BASE_URL`. Run with `--debug` and inspect config via the list command: `npx playwright test --list`.

## 14. Best Practices
- Default `baseURL` for class: `https://gitsuniversity.org`.
- Relative paths in page objects.
- Stricter retries/workers in CI than on a laptop.

## 15. What NOT to Do
Do not commit machine-specific paths. Do not turn `fullyParallel` off forever to hide unique-data bugs. Do not copy another team’s huge config you do not understand.

## 16. Hands-On Exercise
Temporarily set `baseURL` via `BASE_URL=https://gitsuniversity.org` in the terminal and run one smoke test.

## 17. Challenge Exercise
Add `expect: { timeout: 5_000 }` and explain why assertion timeout is shorter than test timeout.

## 18. Knowledge Check / Quiz
1. What is `baseURL` for?
2. Why is the form path `/practice/registration-form/`?
3. Why retries on CI but not always locally?

### Answers
1. The site root so tests can use relative paths.
2. That is where the GITS registration practice page lives.
3. Locally you want a fast fail; CI retries to capture traces of flakes.

## 19. Interview Questions
1. Which Playwright config keys would you set first for a new repo?
2. How do `timeout` and `expect.timeout` differ?
3. How do you keep one suite pointed at multiple environments?

## 20. Architect's Notes
Config is **policy**; fixtures are **wiring**; page objects are **the screen**. Environment variables (next lesson) should override `baseURL` and flags like `RUN_REGISTRATION_SUBMISSION`, not scatter `if (process.env)` through every spec.

## 21. Next Lesson
[Lesson 26 — Environment Variables](26-environment-variables.md)
