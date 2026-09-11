# Lesson 19 — Multiple Data Sets

## 1. What You Will Learn
- Run one registration check against many people instead of copy-pasted tests.
- Turn each row into its **own** Playwright test so one fail does not hide the others.
- Keep values in `src/data/`, not inside the spec.

## 2. Why This Matters in Real Projects
A registration form has many invalid people: missing `@` in email, a two-letter username, a short password. Copying the same clicks ten times means ten places to fix when a field id changes. One loop plus one page object keeps the suite **maintainable**.

## 3. Concept in Plain English
**Multiple data sets** means the **steps stay the same** and the **person (or error) changes**. You store rows in a TypeScript array. A `for` loop writes one named test per row.

## 4. Real-Life Analogy
A bakery uses one cake recipe and a flavor list: vanilla, chocolate, lemon. They do not write three cookbooks. Your test is the recipe. Your array is the flavor list.

## 5. Prerequisites
- You can open [https://gitsuniversity.org/practice/registration-form/](https://gitsuniversity.org/practice/registration-form/).
- You have seen `RegistrationPage` and a simple `test(...)`.

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `src/data/registration.data.ts` | Person shape and a valid example |
| `src/data/registration-error-cases.ts` | One row per invalid field |
| `tests/e2e/registration.data-driven.spec.ts` | Loop that turns each row into a test |

## 7. Step-by-Step Instructions
1. Put example people and error rows in `src/data/`, not in the spec.
2. Import the array into a spec file.
3. Loop **outside** `test(...)` so Playwright lists each row in the report.
4. Name the test from `row.name` so failures are readable.
5. Fill a valid form, apply `row.override`, then assert the red message.

## 8. Complete Code Example

```typescript
import { test, expect } from '../../src/fixtures';
import { registrationErrorCases } from '../../src/data/registration-error-cases';

for (const row of registrationErrorCases) {
  test(`rejects ${row.name} @negative @registration`, async ({ registrationPage }) => {
    await registrationPage.fillValid(row.override);
    await registrationPage.clickRegister();
    await expect(registrationPage.error(row.errorField)).toContainText(row.errorText);
    await expect(registrationPage.successTitle).toHaveCount(0);
  });
}
```

## 9. Line-by-Line Explanation
- `for (const row of ...)` — walk every example once.
- `` test(`rejects ${row.name}`) `` — one named test per row.
- `fillValid(row.override)` — start from a good registrant, change only the bad field.
- `toContainText(row.errorText)` — check that field’s message, not a generic fail.
- `successTitle` count 0 — the form must not pretend it registered.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.data-driven.spec.ts --project=chromium
```

## 11. Expected Result
Several passing tests, one per row (bad email, short username, short password, mismatched passwords, bad phone). The report shows each `row.name`.

## 12. Common Beginner Mistakes
- Putting the `for` loop **inside** one `test`, so the report shows a single blob.
- Reusing `john.doe@example.com` on every success row (collides in parallel).
- Storing locators like `#registration-form-email-input` in the data file.

## 13. How to Debug It
Run one row: `npx playwright test -g "rejects an email without @" --debug`. Confirm the live red text matches `errorText`. Open the trace if it still fails.

## 14. Best Practices
- One table, one behavior (invalid registration).
- Unique emails for any test that would create an account.
- Keep locators in the page object.

## 15. What NOT to Do
Do not copy `test('bad email')` and `test('bad phone')` with the same clicks. Do not mix login, checkout, and registration in one giant list.

## 16. Hands-On Exercise
Add a sixth error row to `registration-error-cases.ts`. Run the spec. You should see one extra test without writing a new `test()` by hand.

## 17. Challenge Exercise
Add a small **valid** array (two countries) and a second loop that fills the form. Do **not** click Register until you learn the `RUN_REGISTRATION_SUBMISSION` flag.

## 18. Knowledge Check / Quiz
1. Why is a loop outside `test()` better than inside one test?
2. Where should field ids live: data file or page object?
3. What should each row contain besides the values?

### Answers
1. Each row is a separate pass/fail in the report.
2. Page object.
3. A readable `name` (and the expected error, for negative cases).

## 19. Interview Questions
1. What is data-driven testing, and when would you choose it over duplicated tests?
2. How do you keep data-driven tests readable in a CI report?
3. How do you avoid collisions when many rows create users in parallel?

## 20. Architect's Notes
Data-driven tests scale **examples**. They do not replace page objects. A TypeScript array gives you types for free; JSON (next lesson) does not. That is why this project starts with `.ts` data.

## 21. Next Lesson
[Lesson 20 — JSON-Based Test Data](20-json-based-test-data.md)
