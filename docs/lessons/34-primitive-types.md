# Lesson 34 — Primitive Types

## 1. What You Will Learn
- Use `string`, `number`, and `boolean` for registration fields and flags.
- Annotate a variable when it helps (`email: string`).
- Avoid mixing a phone **number** with a phone **string**.

## 2. Why This Matters in Real Projects
The form’s phone box wants digits as **text** (`'1234567890'`), not a math number that might drop a leading zero. `RUN_REGISTRATION_SUBMISSION` is a **boolean** once you compare it to `'true'`. Types catch “I passed the heading Locator where an email string belongs.”

## 3. Concept in Plain English
A **primitive type** is a simple kind of value: text (`string`), a count (`number`), yes/no (`boolean`). TypeScript labels the box so `'John'` cannot sneak into a “did they accept terms?” flag.

## 4. Real-Life Analogy
School forms: name is letters, age is a count, “photo permission” is yes or no. Mixing them (age = `"John"`) is a bad form.

## 5. Prerequisites
- [Lesson 33](33-typescript-variables.md).

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `src/data/registration.data.ts` | Field types on `RegistrationPerson` |
| `src/utils/env.ts` | Boolean submit flag |

## 7. Step-by-Step Instructions
1. First name, email, locator ids → `string`.
2. Time stamps used in emails can be `number` (`Date.now()`) then turned into string.
3. Terms accepted / can submit → `boolean`.
4. Phone stays `string` so it can keep leading zeros and match the input.
5. Write annotations on function arguments first; locals can often be inferred.

## 8. Complete Code Example

```typescript
const firstName: string = 'John';
const locatorName: string = '#registration-form-firstname-input';
const usernameMax: number = 16;
const acceptedTerms: boolean = true;
const canSubmit: boolean = process.env.RUN_REGISTRATION_SUBMISSION === 'true';

const stamp: number = Date.now();
const email: string = `student.${stamp}@example.com`;
const username: string = `user${stamp}`.slice(0, usernameMax);

test('uses typed registrant fields @registration', async ({ registrationPage }) => {
  await registrationPage.firstName.fill(firstName);
  await registrationPage.email.fill(email);
  if (acceptedTerms) await registrationPage.terms.check();
  expect(canSubmit).toBe(false); // default in class unless you opted in
});
```

## 9. Line-by-Line Explanation
- `string` — text the input can type, including the locator name.
- `number` — `16` and `Date.now()`; not typed into the phone box as a number type.
- `boolean` — `true`/`false` only.
- `=== 'true'` — turns an env **string** into a boolean.
- `` `student.${stamp}@example.com` `` — number embedded inside a string email.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.spec.ts --project=chromium
```

## 11. Expected Result
TypeScript accepts the fills. If you write `acceptedTerms = 'yes'`, the editor errors. The first-name locator still receives `John`.

## 12. Common Beginner Mistakes
- `phone: 1234567890` as `number` (not what `fill` wants).
- `if (process.env.RUN_REGISTRATION_SUBMISSION)` without `=== 'true'`.
- Using `any` to silence a type error on `email`.

## 13. How to Debug It
Read the red squiggle: “Type ‘number’ is not assignable to type ‘string’.” That usually means you passed `Date.now()` into `fill` without wrapping it in a template string.

## 14. Best Practices
- Phone, zip, username → `string`.
- Flags → `boolean`.
- Convert at the boundary (`env.ts`), then pass booleans into tests.

## 15. What NOT to Do
Do not use `String` / `Number` / `Boolean` objects (capital letters). Do not type a locator name as `boolean`. Do not disable `strict` in `tsconfig` to dodge primitives.

## 16. Hands-On Exercise
Add `const headingVisible: boolean = true` and `expect(headingVisible).toBeTruthy()` after `toBeVisible()` on `registrationPage.heading` — then delete the extra boolean if it adds nothing.

## 17. Challenge Exercise
Write a function `toEmail(stamp: number): string` that returns `student.${stamp}@example.com` and call it from a factory.

## 18. Knowledge Check / Quiz
1. What primitive should `firstName` be?
2. Why is phone a `string`?
3. What primitive is `canSubmit`?

### Answers
1. `string`.
2. `fill` types text; IDs can have leading zeros.
3. `boolean`.

## 19. Interview Questions
1. Which registration fields should never be `number` in UI tests?
2. How do you convert environment strings into booleans safely?
3. What does TypeScript inference mean for a `const firstName = 'John'`?

## 20. Architect's Notes
Primitives are bricks. Arrays (next) are lists of bricks: many error messages, many locator names. Keep each element typed (`string[]`) so a `boolean` cannot land in `requiredFieldErrors`.

## 21. Next Lesson
[Lesson 35 — Arrays](35-arrays.md)
