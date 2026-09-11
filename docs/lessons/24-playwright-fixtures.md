# Lesson 24 — Playwright Fixtures

## 1. What You Will Learn
- What a Playwright **fixture** is, in plain words.
- Inject `registrationPage` into every test that needs the form.
- Extend `test` once so specs stop copy-pasting `new RegistrationPage(page)`.

## 2. Why This Matters in Real Projects
Without fixtures, every spec repeats: open the browser tab, build the page object, go to `/practice/registration-form/`. When the URL or constructor changes, you miss a file. A fixture is shared setup with a name.

## 3. Concept in Plain English
A **fixture** is a ready-made ingredient Playwright hands your test. Built-in: `page`. Yours: `registrationPage` — already constructed and navigated. You write `async ({ registrationPage }) => { ... }`.

## 4. Real-Life Analogy
A cooking class that sets the station for you: bowl, whisk, ingredients out. You do not hunt the drawers each recipe. `registrationPage` is the pre-set station for the registration form.

## 5. Prerequisites
- [Lesson 23](23-type-safe-keyword-engine.md).
- You know `RegistrationPage` and `page.goto`.

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `src/fixtures/test.fixture.ts` | Extends Playwright `test`; injects `registrationPage` |
| `src/fixtures/index.ts` | Re-exports `test` and `expect` |
| Specs under `tests/e2e/` | Import `test` from the fixture, not `@playwright/test` |

## 7. Step-by-Step Instructions
1. Import Playwright’s `test` as a base.
2. `extend` it with a `registrationPage` fixture.
3. Inside, `new RegistrationPage(page)`, `await registrationPage.goto()`, then `await use(registrationPage)`.
4. Export `test` and `expect` from `test.fixture.ts`.
5. In specs, `import { test, expect } from '../../src/fixtures'`.

## 8. Complete Code Example

```typescript
import { test as base, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';

type AppFixtures = {
  registrationPage: RegistrationPage;
};

export const test = base.extend<AppFixtures>({
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    await use(registrationPage);
  },
});

export { expect };

test('the heading is visible @smoke @registration', async ({ registrationPage }) => {
  await expect(registrationPage.heading).toBeVisible();
});
```

## 9. Line-by-Line Explanation
- `test as base` — keep Playwright’s `page`, `context`, timeouts.
- `AppFixtures` — tells TypeScript the extra argument name.
- `extend` — add `registrationPage` beside `page`.
- `goto()` — opens `https://gitsuniversity.org/practice/registration-form/` (via env/baseURL).
- `use(...)` — hand the object to the test, then clean up after.
- Spec imports **your** `test`, or `registrationPage` will not type-check.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.spec.ts --project=chromium
```

## 11. Expected Result
The form heading **Registration Form** is visible. The spec never calls `new RegistrationPage` or `goto` itself.

## 12. Common Beginner Mistakes
- Importing `test` from `@playwright/test` in the spec (fixture is ignored).
- Forgetting `await use(...)` — the test never receives the page.
- Navigating twice: fixture `goto` and another `goto` in every test.

## 13. How to Debug It
If `registrationPage` is “does not exist on type”, the spec imported the wrong `test`. If the page is blank, log `registrationPage.page.url()`. Run `--headed` and watch the first navigation.

## 14. Best Practices
- One fixture file (or a small chain) that specs import.
- Fixtures navigate; tests assert.
- You can also inject `keywordRunner` the same way later.

## 15. What NOT to Do
Do not put assertions inside the fixture (except “page reached the form” if you must). Do not create a new browser in the fixture; reuse Playwright’s `page`.

## 16. Hands-On Exercise
Add a `registrationKeywords` fixture that does `new RegistrationKeywords(registrationPage)` and use it in one spec.

## 17. Challenge Exercise
Split a `loggedOutPage` vs form fixture only if you add a second screen. Do not invent unused fixtures.

## 18. Knowledge Check / Quiz
1. What built-in fixture does `registrationPage` wrap?
2. Why must specs import `test` from `src/fixtures`?
3. What does `use()` do?

### Answers
1. `page` (the browser tab).
2. Only the extended `test` knows `registrationPage`.
3. Gives the value to the test, then allows teardown.

## 19. Interview Questions
1. What problem do custom Playwright fixtures solve?
2. How do fixture dependencies work (`registrationKeywords` depending on `registrationPage`)?
3. How do you avoid slow fixtures that open extra browsers?

## 20. Architect's Notes
Fixtures are the **composition root** of the test suite: pages, keywords, factories. Keep them thin. Config (next lesson) controls `baseURL`, timeouts, and browsers — fixtures should not hard-code Chromium-only hacks.

## 21. Next Lesson
[Lesson 25 — Playwright Config](25-playwright-config.md)
