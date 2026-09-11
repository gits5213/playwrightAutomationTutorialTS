# Lesson 40 — Async and Await

## 1. What You Will Learn
- Why Playwright methods return a **Promise**.
- Always `await` `fill`, `click`, `goto`, and `expect`.
- Mark test callbacks and page methods as `async`.

## 2. Why This Matters in Real Projects
The browser is slower than TypeScript. If you skip `await`, the test asserts **Registration Successful** before Register is clicked. That flake is the number-one beginner bug.

## 3. Concept in Plain English
**Async** means “this finishes later.” A **Promise** is an IOU. **`await`** pauses **this function** until the IOU is paid (the first name really typed) without freezing the whole computer.

## 4. Real-Life Analogy
You order a student ID photo. You do not leave with an empty card. You **wait** (await) at the counter. You can still check your phone (other workers run other tests).

## 5. Prerequisites
- [Lesson 39](39-classes.md). You have been writing `async ({ registrationPage })` already — this lesson names the rule.

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `src/pages/registration.page.ts` | `async` methods |
| Any spec | `async` tests with `await expect` |

## 7. Step-by-Step Instructions
1. If a function uses `await`, it must be `async`.
2. Await navigation: `goto('/practice/registration-form/')`.
3. Await actions: `firstName.fill('John')`, `clickRegister()`.
4. Await assertions: `expect(heading).toBeVisible()` — Playwright assertions are async-aware.
5. Never `waitForTimeout` as a substitute for awaiting the real action.

## 8. Complete Code Example

```typescript
test('awaits each registration step @smoke @registration', async ({ registrationPage }) => {
  await expect(registrationPage.heading).toBeVisible();
  await registrationPage.firstName.fill('John');
  await registrationPage.email.fill(`student.${Date.now()}@example.com`);
  await expect(registrationPage.firstName).toHaveValue('John');
});

async function typeFirstName(registrationPage: RegistrationPage, firstName: string): Promise<void> {
  await registrationPage.firstName.fill(firstName);
}
```

## 9. Line-by-Line Explanation
- `async ({ registrationPage })` — the test may await.
- `await expect(...).toBeVisible()` — wait up to the expect timeout for the heading.
- `await ...fill('John')` — wait until Playwright finishes typing.
- Unique email string — still a normal string; only Playwright calls need await.
- `Promise<void>` — callers must await `typeFirstName` too.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.spec.ts --project=chromium
```

## 11. Expected Result
The heading is visible, then `John` is in the first-name box. If you remove one `await` on `fill`, the value assertion may fail or flake.

## 12. Common Beginner Mistakes
- `registrationPage.firstName.fill('John');` with no `await`.
- Forgetting `async` on a helper that awaits (TypeScript error).
- `await 'John'` — you only await Promises, not strings.

## 13. How to Debug It
If the test ends before the click, search for missing `await`. Inspector (`--debug`) steps one awaited action at a time. Traces show actions in order — gaps often mean a missing await.

## 14. Best Practices
- Await every Playwright action and assertion.
- Return Promises from page/keyword methods; do not fire-and-forget.
- Success **submit** still needs `RUN_REGISTRATION_SUBMISSION=true` (Lesson 26).

## 15. What NOT to Do
Do not chain `.then()` everywhere when `await` is clearer. Do not use `await Promise.all` on dependent steps (fill email **then** click Register). Do not ignore floating promises.

## 16. Hands-On Exercise
Comment out `await` on `fill('John')`, run the assertion, restore it, and explain the difference.

## 17. Challenge Exercise
Write `async function fillAndReadFirstName(...)` that fills, **awaits** `inputValue()`, and returns the string for `expect(value).toBe('John')`.

## 18. Knowledge Check / Quiz
1. What does `await` wait for?
2. Must tests that use `await` be `async`?
3. Is `const firstName = 'John'` a Promise?

### Answers
1. A Promise (the browser action or assertion finishing).
2. Yes.
3. No. It is a string; do not await it.

## 19. Interview Questions
1. Why is Playwright’s API async?
2. What failures appear when a test omits `await`?
3. How do `async` page objects compose with keyword runners?

## 20. Architect's Notes
Async/await is the runtime contract under POM, keywords, and fixtures. Combined with typed data (Lessons 33–38) and a type-safe `KeywordRunner.execute([{ keyword: 'ENTER_FIRST_NAME', value: 'John' }])`, you get tests that are readable, parallel-safe, and checked before they open Chromium.

## 21. Next Lesson
[Lesson 41 — Imports and Exports](41-imports-exports.md)
