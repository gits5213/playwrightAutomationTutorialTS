# Lesson 45 — TypeScript Type Checking

## 1. What You Will Learn
- What `tsc --noEmit` does
- Why `npm run typecheck` is a CI gate separate from Playwright
- How types catch bad registration data before a browser opens

## 2. Why This Matters in Real Projects
Playwright only runs the tests you selected. Typecheck reads **all** included `.ts` files. A broken `RegistrationPerson` in a file you did not run still fails the pull request. That is cheaper than a red Chromium job.

## 3. Concept in Plain English
TypeScript **labels** values: this is a page, this is an email string, this field is `'phone'`. `tsc` checks those labels. `--noEmit` means “check only; do not write JavaScript files.” Playwright still runs TypeScript through its own loader. You do not need compiled `.js` output for tests.

## 4. Real-Life Analogy
A health inspector checks the kitchen **without cooking dinner**. Typecheck inspects labels. Playwright cooks. Both must pass before guests (production) eat.

## 5. Prerequisites
- [Lesson 34](34-primitive-types.md) through [Lesson 42](42-enums-vs-string-unions.md)
- `tsconfig.json` already in this repo

## 6. Files We Will Create or Modify
- `package.json` script `"typecheck": "tsc --noEmit"`
- `tsconfig.json` (already includes `src/**/*.ts`, `tests/**/*.ts`, `playwright.config.ts`)

## 7. Step-by-Step Instructions
1. Confirm `tsconfig.json` has `"strict": true`.
2. Add `"typecheck": "tsc --noEmit"` to `scripts`.
3. Run `npm run typecheck` after data or page-object changes.
4. Add the same command to GitHub Actions **before** `npx playwright test`.

## 8. Complete Code Example

```json
"typecheck": "tsc --noEmit"
```

```ts
import { type RegistrationPerson } from './registration.data';

const person: RegistrationPerson = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  phone: '1234567890',
  username: 'adalovelace',
  password: 'Practice1',
  confirmPassword: 'Practice1',
  gender: 'Female',
  dateOfBirth: '1815-12-10',
  country: 'United Kingdom',
};
```

## 9. Line-by-Line Explanation
- `tsc` is the TypeScript compiler.
- `--noEmit` skips writing `.js` files; you only want errors.
- If `email` is missing, `tsc` fails even if no test imported this object yet (if the file is in `include`).
- Playwright success is **not** a typecheck. A test can pass with `any` everywhere.

## 10. How to Run It

```bash
npm run typecheck
```

## 11. Expected Result
No output and exit code 0, or a list of files and type errors. Fix those before `npm test`.

## 12. Common Beginner Mistakes
- Assuming `npx playwright test` equals typecheck
- Using `as any` to silence errors
- Excluding `tests/` from `tsconfig.json` so specs are never checked

## 13. How to Debug It
Read the first error only. Fix that. Re-run. Errors cascade: one bad type on `RegistrationPerson` can flood the output. Do not “fix” 40 errors by widening everything to `string`.

## 14. Best Practices
- `strict: true`
- CI: lint → typecheck → install Chromium → test
- Prefer unions over `string` for closed field names

## 15. What NOT to Do
- Do not skip typecheck because “the tests passed on my machine”
- Do not commit `// @ts-ignore` on registration locators

## 16. Hands-On Exercise
Delete `email` from a local copy of a `RegistrationPerson` object and run `npm run typecheck`. Restore it.

## 17. Challenge Exercise
Type `errorField` as `string` in a scratch branch, call `registrationPage.error('emial')`, and watch typecheck fail when you put the union back.

## 18. Knowledge Check / Quiz
1. What exact command does `npm run typecheck` run?
2. What does `--noEmit` mean?
3. Why typecheck in CI even if Playwright passed?

**Answers:** 1) `tsc --noEmit` 2) Check types, do not write JS 3) Unused files and call-sites still need to compile.

## 19. Interview Questions
1. Why run `tsc --noEmit` separately from Playwright?
2. What does TypeScript strict mode buy a test framework?
3. How do types support maintainability as the suite grows?

## 20. Architect's Notes
Types are a contract between layers: tests pass `RegistrationPerson`, pages consume it, factories produce it. When the contract breaks, typecheck should fail — not 200 tests with `undefined.fill`.

## 21. Next Lesson
[Lesson 46 — Git Fundamentals](46-git-fundamentals.md)
