# Lesson 23 — Type-Safe Keyword Engine

## 1. What You Will Learn
- Declare keyword names as TypeScript types, not free strings.
- Run steps with `KeywordRunner.execute([...])`.
- Avoid **string reflection** (`something[keyword]()`).

## 2. Why This Matters in Real Projects
`await page[step]()` looks clever until someone types `ENTER_FIRT_NAME`. The failure is at **runtime**. A union type plus `switch` makes the editor underline the typo **before** the test runs.

## 3. Concept in Plain English
**Type-safe** means only real keyword names compile. The engine is a `switch` on `step.keyword`. Each `case` calls a real method like `enterFirstName('John')`. TypeScript can prove you handled every name.

## 4. Real-Life Analogy
A vending machine with labeled buttons (Chips, Water) versus typing a secret code that might not exist. The labels are the type. The machine’s wiring is the `switch`.

## 5. Prerequisites
- [Lesson 22](22-what-is-keyword-driven-automation.md) and the mermaid stack.
- `RegistrationPage` with `firstName`, `clickRegister`.

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `src/keywords/keyword.types.ts` | `RegistrationKeyword` union and `KeywordStep` |
| `src/keywords/registrationKeywords.ts` | Named methods that call the page |
| `src/keywords/KeywordRunner.ts` | Typed `execute` with `switch` |
| `tests/e2e/registration.keywords.spec.ts` | Story as a step list |

## 7. Step-by-Step Instructions
1. List allowed names in `keyword.types.ts`.
2. Implement one method per name on `RegistrationKeywords`.
3. In `KeywordRunner.execute`, `switch (step.keyword)` — no `any`, no `this[step.keyword]`.
4. Use `never` in `default` so a new keyword without a case fails to compile.
5. In the spec: `await keywordRunner.execute([{ keyword: 'ENTER_FIRST_NAME', value: 'John' }]);`

## 8. Complete Code Example

```typescript
// keyword.types.ts
export type RegistrationKeyword =
  | 'ENTER_FIRST_NAME'
  | 'ENTER_LAST_NAME'
  | 'CLICK_REGISTER';

export type KeywordStep = { keyword: RegistrationKeyword; value?: string };

// KeywordRunner.ts (inside execute)
async execute(steps: KeywordStep[]): Promise<void> {
  for (const step of steps) {
    switch (step.keyword) {
      case 'ENTER_FIRST_NAME':
        await this.keywords.enterFirstName(step.value ?? '');
        break;
      case 'ENTER_LAST_NAME':
        await this.keywords.enterLastName(step.value ?? '');
        break;
      case 'CLICK_REGISTER':
        await this.keywords.clickRegister();
        break;
      default: {
        const exhausted: never = step.keyword;
        throw new Error(`Unhandled keyword: ${exhausted}`);
      }
    }
  }
}

await keywordRunner.execute([{ keyword: 'ENTER_FIRST_NAME', value: 'John' }]);
```

## 9. Line-by-Line Explanation
- `RegistrationKeyword` — the only legal names.
- `KeywordStep` — a name plus optional `value` (the first name `John`).
- `switch` — each case is a **real** method call, not a string lookup.
- `never` — if you add `ENTER_EMAIL` to the union and forget a case, TypeScript errors.
- `execute([{ keyword: 'ENTER_FIRST_NAME', value: 'John' }])` — the test story.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.keywords.spec.ts --project=chromium
```

## 11. Expected Result
The first-name box receives `John`. A misspelled keyword is a **compile** error in the editor, not a red X after 30 seconds of browser time.

## 12. Common Beginner Mistakes
- `(this as any)[step.keyword]()` — that is reflection; typos become runtime bombs.
- Storing locators on the keyword class.
- A `value` on `CLICK_REGISTER` that the engine ignores but callers think was used.

## 13. How to Debug It
If fill does not happen, log `step` inside the loop. If TypeScript complains on `never`, you added a keyword name without a `case`. Use `--debug` and watch `#registration-form-firstname-input`.

## 14. Best Practices
- Union types (or `as const` maps) for names.
- Keywords call page objects; page objects own locators.
- Keep the step list readable for a manual tester.

## 15. What NOT to Do
Do not build a generic robot that executes random strings from Excel. Do not skip page objects. Do not use keyword-driven style for a 3-test playground (see Lesson 22).

## 16. Hands-On Exercise
Add `ENTER_EMAIL` to the union, a case, and a method that fills `registrationPage.email`. Execute it with `ada@example.com`.

## 17. Challenge Exercise
Add `ASSERT_HEADING_VISIBLE` with no `value`. The `switch` should call `expect(registrationPage.heading).toBeVisible()`.

## 18. Knowledge Check / Quiz
1. Why is `switch` safer than `this[keyword]()`?
2. What does `never` buy you in `default`?
3. Where does `#registration-form-firstname-input` belong?

### Answers
1. The compiler knows every name; reflection does not.
2. Missing cases become type errors when the union grows.
3. In `RegistrationPage`, not in the engine.

## 19. Interview Questions
1. How would you design a type-safe keyword runner in TypeScript?
2. What is wrong with dynamic method invocation for test keywords?
3. How do you keep keyword tests from duplicating page-object locators?

## 20. Architect's Notes
This engine is intentionally **small**: registration only, explicit cases. A `Record<RegistrationKeyword, handler>` map is also type-safe if every key is required. Reflection (`any` + bracket access) is the design you are refusing. Fixtures next will inject the page so specs stay one line of setup.

## 21. Next Lesson
[Lesson 24 — Playwright Fixtures](24-playwright-fixtures.md)
