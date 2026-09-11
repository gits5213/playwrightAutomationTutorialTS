# Lesson 37 — Functions

## 1. What You Will Learn
- Write a function that fills one field or a whole registrant.
- Pass arguments (`firstName: string`) and `return` values.
- Use `async` functions that `await` Playwright (preview of Lesson 40).

## 2. Why This Matters in Real Projects
`fillForm` is a function: one name, many locators inside. Without functions you copy seven `fill` lines into every test. That hurts **reusability**.

## 3. Concept in Plain English
A **function** is a named recipe. You call `fillFirstName('John')` and it types into `#registration-form-firstname-input`. Arguments are the ingredients. `return` is what you get back (a unique email, maybe).

## 4. Real-Life Analogy
“Stamp unique username” at the school office. You hand them a base name; they hand back `user1710000000`. You do not stand at the stamp machine yourself each time.

## 5. Prerequisites
- [Lesson 36](36-objects.md).
- Comfort with `await` from earlier tests (details in Lesson 40).

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `src/pages/registration.page.ts` | `fillForm`, `clickRegister` |
| `src/factories/registrationDataFactory.ts` | `createRegistrant()` |

## 7. Step-by-Step Instructions
1. Declare with `function name(args)` or `const name = async (...) =>`.
2. Type arguments: `firstName: string`, `registrant: { firstName: string; email: string }`.
3. Put Playwright work in `async` functions and `await` fills.
4. Return unique people from factories; return `void` from click helpers.
5. Keep functions small: one business job.

## 8. Complete Code Example

```typescript
async function fillFirstName(page: Page, firstName: string): Promise<void> {
  const locatorName = '#registration-form-firstname-input';
  await page.locator(locatorName).fill(firstName);
}

function buildEmail(stamp: number): string {
  return `student.${stamp}@example.com`;
}

test('function fills John @registration', async ({ page }) => {
  await page.goto('/practice/registration-form/');
  await fillFirstName(page, 'John');
  const email = buildEmail(Date.now());
  await page.locator('#registration-form-email-input').fill(email);
  await expect(page.locator('#registration-form-firstname-input')).toHaveValue('John');
});
```

## 9. Line-by-Line Explanation
- `fillFirstName` — recipe for one box; `firstName` is the ingredient.
- `locatorName` — local string; still better on a page object long-term.
- `Promise<void>` — async, returns no useful value.
- `buildEmail` — **sync** helper; no browser, just a string.
- The test calls both: type John, type a unique email.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.spec.ts --project=chromium
```

## 11. Expected Result
First name is `John`. Email contains a timestamp. `RegistrationPage.fillForm` in the repo is the same idea at full-form scale.

## 12. Common Beginner Mistakes
- Forgetting `await` on `fillFirstName` (the test continues too soon).
- Ten arguments instead of one `registrant` object.
- Functions that both fill the form **and** assert success (hard to reuse for `@negative`).

## 13. How to Debug It
If John never appears, you called the function without `await`. Set a breakpoint inside `fillFirstName`. Log `firstName` at the start of the function.

## 14. Best Practices
- Fill helpers do not always assert; assertion helpers can live in keywords.
- Factory functions stay free of Playwright (easier to unit-think).
- Name with verbs: `fillFirstName`, `createRegistrant`, `clickRegister`.

## 15. What NOT to Do
Do not make `doEverything(page)`. Do not hide `expect` inside every fill unless it is truly an “enter and verify” keyword. Do not skip types on arguments.

## 16. Hands-On Exercise
Write `fillEmail(page, email: string)` and use it with `buildEmail(Date.now())`.

## 17. Challenge Exercise
Write `async function fillRegistrant(page, registrant)` that fills first name, last name, and email from the object.

## 18. Knowledge Check / Quiz
1. What does an argument do?
2. Why is `buildEmail` not `async`?
3. Why return `void` from `clickRegister`?

### Answers
1. It passes a value in (`'John'`).
2. It only builds a string; no Playwright Promise.
3. The useful result is the side effect (a click), not a return value.

## 19. Interview Questions
1. How do you split Playwright helpers vs pure data functions?
2. When should a function take an object instead of many parameters?
3. What goes wrong if tests forget to `await` async helpers?

## 20. Architect's Notes
Functions are verbs. **Interfaces** (next) describe the noun they accept (`RegistrationPerson`). **Classes** (Lesson 39) bundle functions with the locators they need so you do not pass `page` into every helper.

## 21. Next Lesson
[Lesson 38 — Interfaces](38-interfaces.md)
