# Lesson 41 — Imports and Exports

## 1. What You Will Learn
- How `export` shares a function, type, or object from one file
- How `import` brings that shared piece into a test
- Why page objects, data, and keywords live in separate files

## 2. Why This Matters in Real Projects
A registration suite with 50 tests cannot copy the same person object 50 times. Teams **export once** from `src/data/registration.data.ts` and **import** it everywhere. That is maintainability: one change, many files stay correct.

## 3. Concept in Plain English
An **export** is a labeled bowl you put on the counter. An **import** is another cook picking up that bowl. TypeScript files do not magically see each other. You must say what leaves a file and what another file needs.

## 4. Real-Life Analogy
The registration form is a kitchen. `validRegistrant` is a recipe card in a drawer (`src/data/`). Tests are cooks. They do not rewrite the recipe; they borrow the card.

## 5. Prerequisites
- [Lesson 38](38-interfaces.md), [Lesson 39](39-classes.md), [Lesson 40](40-async-await.md)
- You can run a Playwright test

## 6. Files We Will Create or Modify
- `src/data/registration.data.ts` (already exports types and data)
- Any spec under `tests/` that imports those exports

## 7. Step-by-Step Instructions
1. Open `src/data/registration.data.ts`. Find `export type RegistrationPerson` and `export const validRegistrant`.
2. Open `src/pages/registration.page.ts`. The first lines `import` that type and value.
3. Open `tests/e2e/registration.spec.ts`. It imports `uniqueRegistrant` from data and `test` from fixtures.
4. Notice: tests never copy the person fields. They import them.

## 8. Complete Code Example

```ts
// src/data/registration.data.ts
export type RegistrationPerson = { email: string; username: string };

export const validRegistrant = {
  email: 'john.doe@example.com',
  username: 'johndoe',
};

// tests/e2e/registration.spec.ts
import { uniqueRegistrant } from '../../src/data/registration.data';
```

## 9. Line-by-Line Explanation
- `export type` shares a shape (the labels on the bowl), not a runtime value.
- `export const` shares a real object other files can use.
- `import { uniqueRegistrant } from '...'` picks **named** exports by name.
- A **default** export (`export default`) is one unnamed item per file. This repo prefers **named** exports so you can see every name at the top of a test.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.spec.ts --project=chromium
```

## 11. Expected Result
Tests pass. If you rename `uniqueRegistrant` in the data file and forget the import, TypeScript reports “Cannot find name” before Playwright runs.

## 12. Common Beginner Mistakes
- Forgetting `export` then wondering why the test cannot see the function
- Wrong relative path (`../` vs `../../`)
- Mixing `import data from` (default) with `export const data` (named)

## 13. How to Debug It
Read the error. “Module not found” is a path problem. “has no exported member” means the name does not match. Open both files and compare spellings.

## 14. Best Practices
- Named exports for page objects, data, and keywords
- One clear name per idea (`RegistrationPage`, not `default`)
- Import types with `import { type RegistrationPerson }` when you only need the shape

## 15. What NOT to Do
- Do not copy `validRegistrant` into every spec
- Do not use `require()` in new TypeScript tests
- Do not export secrets (passwords from `.env`)

## 16. Hands-On Exercise
In a scratch comment, list every `import` in `tests/e2e/registration.spec.ts` and write which file each name comes from.

## 17. Challenge Exercise
Add `export const practiceCountry = 'United States'` in the data file. Import it in one test and assert the country field can use that value. Do not hardcode a second copy.

## 18. Knowledge Check / Quiz
1. What keyword shares a value from a file?
2. Named vs default export — which does this repo prefer?
3. Why do tests import `uniqueRegistrant` instead of typing a new email?

**Answers:** 1) `export` 2) Named exports 3) Unique data lives in one place and avoids collisions.

## 19. Interview Questions
1. What is the difference between a named export and a default export?
2. Why separate test data into its own module?
3. How do imports help a suite scale from 5 tests to 500?

## 20. Architect's Notes
Imports are the seams of the framework. Tests → fixtures → pages → data. If a test imports Playwright locators **and** raw person fields **and** CI config, the seams are leaking. Keep each file’s exports small and honest.

## 21. Next Lesson
[Lesson 42 — Enums vs String Unions](42-enums-vs-string-unions.md)
