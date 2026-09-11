# Lesson 42 — Enums vs String Unions

## 1. What You Will Learn
- What a **string union** is (`'email' | 'username'`)
- What a TypeScript **enum** is
- Why this course prefers unions for registration error fields

## 2. Why This Matters in Real Projects
Invalid-email tests must name the field that should show an error. If someone types `'emial'`, TypeScript should stop them **before** CI. Unions and enums both list allowed values. The wrong tool adds noise without adding safety.

## 3. Concept in Plain English
A **string union** is a short list of allowed words. A variable of that type may be only those words. An **enum** is a named object that holds those words (and sometimes numbers). Both are “pick from this menu,” not “any string.”

## 4. Real-Life Analogy
Gender on the form is a dropdown: Male, Female, Other. You cannot type “purple.” A union is that dropdown. An enum is a laminated menu with numbers next to each dish. For field names, the dropdown is enough.

## 5. Prerequisites
- [Lesson 34](34-primitive-types.md), [Lesson 38](38-interfaces.md), [Lesson 41](41-imports-exports.md)

## 6. Files We Will Create or Modify
- `src/data/registration-error-cases.ts` (uses a union named `ErrorField`)
- No new production enum is required

## 7. Step-by-Step Instructions
1. Open `src/data/registration-error-cases.ts`.
2. Find `type ErrorField = 'email' | 'username' | 'password' | 'confirmPassword' | 'phone'`.
3. Each row sets `errorField` to one of those words.
4. `registrationPage.error(row.errorField)` only accepts that menu.

## 8. Complete Code Example

```ts
type ErrorField =
  | 'email'
  | 'username'
  | 'password'
  | 'confirmPassword'
  | 'phone';

const row: { errorField: ErrorField; errorText: string } = {
  errorField: 'email',
  errorText: 'Invalid email format',
};

// Enum alternative (heavier — this repo does not use it for fields)
enum ErrorFieldEnum {
  Email = 'email',
  Username = 'username',
}
```

## 9. Line-by-Line Explanation
- `|` means “or”: the value is this word **or** that word.
- `'email'` is a string **literal type**, not a free `string`.
- Assigning `'emial'` fails typecheck (`npm run typecheck` runs `tsc --noEmit`).
- Enums add a runtime object. Unions disappear when compiled. For labels like field names, unions stay simpler.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.data-driven.spec.ts --project=chromium
npm run typecheck
```

## 11. Expected Result
Five negative rows pass (invalid email, short username, short password, mismatch, invalid phone). `typecheck` is clean. A typo in `errorField` fails `tsc --noEmit`.

## 12. Common Beginner Mistakes
- Using `string` for `errorField` (typos become runtime surprises)
- Creating an enum **and** a union for the same list
- Assuming Confirm Password is a required empty-form field (it is not — see the test plan)

## 13. How to Debug It
If `tsc` says “Type X is not assignable,” you used a word outside the union. Compare with `ErrorField`. Do not widen the type to `string` to silence it.

## 14. Best Practices
- Prefer string unions for small, closed lists (fields, tags, countries you actually support)
- Use enums when a numeric or shared runtime object is truly needed
- Keep the union next to the data that uses it

## 15. What NOT to Do
- Do not invent `'duplicateUsername'` in the union until the live form is observed to reject duplicates
- Do not use enums just because a Java course used them

## 16. Hands-On Exercise
Add a comment listing every `ErrorField` value and the matching `errorText` from `registration-error-cases.ts`.

## 17. Challenge Exercise
Sketch (do not commit) a union `Gender = 'Male' | 'Female' | 'Other'` and type `RegistrationPerson.gender` with it. Run `npm run typecheck`.

## 18. Knowledge Check / Quiz
1. What does `'email' | 'phone'` allow?
2. Why not type `errorField` as `string`?
3. When might an enum still be reasonable?

**Answers:** 1) Only those two words 2) Typos would compile 3) When you need a runtime object or numeric values shared across languages.

## 19. Interview Questions
1. Compare TypeScript enums and string union types.
2. How do unions prevent invalid test data at compile time?
3. When would you avoid enums in a Playwright framework?

## 20. Architect's Notes
Closed sets belong in the type system. Open sets (`firstName: string`) stay strings. Do not model the entire internet as an enum. For registration errors, the union **is** the test contract with the page object.

## 21. Next Lesson
[Lesson 43 — ESLint](43-eslint.md)
