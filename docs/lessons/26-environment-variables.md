# Lesson 26 — Environment Variables

## 1. What You Will Learn
- Read values from the environment (`process.env`) in Playwright.
- Override `BASE_URL` without editing config.
- Require `RUN_REGISTRATION_SUBMISSION=true` before success Register clicks.

## 2. Why This Matters in Real Projects
The same tests run on a laptop, in CI, and against staging. Hosts and secrets differ. Environment variables are the switchboard. They also stop the class from flooding [the practice form](https://gitsuniversity.org/practice/registration-form/) with new accounts.

## 3. Concept in Plain English
An **environment variable** is a named note the operating system gives your program, like `BASE_URL=https://gitsuniversity.org`. Your code reads it. If it is missing, you pick a safe default.

## 4. Real-Life Analogy
A thermostat: the heater is the same; the number on the wall changes per room. `BASE_URL` is the number. The tests are the heater.

## 5. Prerequisites
- [Lesson 25](25-playwright-config.md).
- [Lesson 21](21-test-data-factory.md) factory and submit flag.

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `src/utils/env.ts` | Reads `BASE_URL`, form path, submit flag |
| `playwright.config.ts` | `baseURL` from `process.env.BASE_URL` |
| Success specs | Skip or no-click unless submit is allowed |

## 7. Step-by-Step Instructions
1. Add `src/utils/env.ts` with defaults.
2. Default host: `https://gitsuniversity.org`. Default path: `/practice/registration-form/`.
3. `canSubmit` is true only when `RUN_REGISTRATION_SUBMISSION` is the string `'true'`.
4. Page `goto` uses `baseURL` + path (or one full URL helper).
5. Never log passwords. This practice form does not need real secrets.

## 8. Complete Code Example

```typescript
export const env = {
  baseURL: process.env.BASE_URL ?? 'https://gitsuniversity.org',
  registrationPath: '/practice/registration-form/',
  runRegistrationSubmission: process.env.RUN_REGISTRATION_SUBMISSION === 'true',
};

test('successful registration @smoke @registration', async ({ registrationPage }) => {
  test.skip(!env.runRegistrationSubmission, 'Set RUN_REGISTRATION_SUBMISSION=true to submit');
  const person = createRegistrant();
  await registrationPage.fillForm(person);
  await registrationPage.clickRegister();
  await expect(registrationPage.successTitle).toContainText('Registration Successful');
});
```

## 9. Line-by-Line Explanation
- `??` — use the default when the variable is missing.
- `=== 'true'` — env vars are **strings**. The value `true` without quotes in the shell is still the text `true`.
- `test.skip(...)` — leaves a clear skip in the report instead of creating accounts.
- Factory person — unique email so parallel workers do not clash (Lesson 21).

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.spec.ts --project=chromium
RUN_REGISTRATION_SUBMISSION=true npx playwright test tests/e2e/registration.spec.ts -g "successful registration"
BASE_URL=https://gitsuniversity.org npx playwright test tests/basic/registration-heading.spec.ts
```

## 11. Expected Result
Default run: load/empty-form tests pass; success submit is **skipped**. With the flag: success title and the unique email appear. Wrong `BASE_URL` lands on the wrong host.

## 12. Common Beginner Mistakes
- Checking `if (process.env.RUN_REGISTRATION_SUBMISSION)` — the empty string is enough to confuse you; compare to `'true'`.
- Putting secrets in the repo. Use env (or CI secrets) for anything real.
- Forgetting macOS/Linux vs Windows syntax (`set VAR=value` on older Windows).

## 13. How to Debug It
`console.log({ BASE_URL: process.env.BASE_URL, submit: process.env.RUN_REGISTRATION_SUBMISSION })`. If skip always happens, you typed `True` or `yes` instead of `true`.

## 14. Best Practices
- Centralize reads in `env.ts`.
- Safe defaults for class: GITS host, submit **off**.
- Document required variables in the README.

## 15. What NOT to Do
Do not scatter `process.env` in page objects. Do not default submit to on. Do not commit a `.env` file that contains real passwords.

## 16. Hands-On Exercise
Run the success test twice: once without the flag (expect skip) and once with it (expect **Registration Successful**).

## 17. Challenge Exercise
Add `REGISTRATION_FORM_URL` as a full-URL override. If set, `goto` uses it; otherwise `baseURL` + path.

## 18. Knowledge Check / Quiz
1. What type is `process.env.BASE_URL`?
2. Why default `RUN_REGISTRATION_SUBMISSION` to off?
3. Where should env reads live?

### Answers
1. `string | undefined`.
2. Prevents account spam on the practice registration form.
3. A small `env.ts` (and config), not every spec.

## 19. Interview Questions
1. How do you configure Playwright for multiple environments without forking tests?
2. How should you gate tests that create data in a shared environment?
3. What is dangerous about committing `.env` files?

## 20. Architect's Notes
Environment variables are **runtime policy**. Tags (next lesson) are **which tests to select**. Do not use env vars as a substitute for `@smoke` vs `@regression`. Use both: env decides *where* and *whether submit is allowed*; tags decide *which slice* to run.

## 21. Next Lesson
[Lesson 27 — Smoke, Regression, and Tags](27-smoke-regression-and-tags.md)
