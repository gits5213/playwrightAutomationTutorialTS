# Lesson 43 — ESLint

## 1. What You Will Learn
- What a **linter** is (a robot reviewer for style and bugs)
- How `npm run lint` runs `eslint .`
- Why Playwright suites care about missing `await`

## 2. Why This Matters in Real Projects
A forgotten `await` on `expect(page.getByRole('heading', { name: 'Registration Form' })).toBeVisible()` can pass locally and fail in CI — or worse, not wait at all. ESLint catches many of those mistakes while you type.

## 3. Concept in Plain English
Playwright runs tests. TypeScript checks types. **ESLint checks habits**: unused variables, floating promises, and Playwright-specific pitfalls. It does not open a browser. It reads your files and reports problems.

## 4. Real-Life Analogy
A spellchecker does not cook the meal. It marks “recieve” before the recipe is printed. ESLint is the spellchecker for test code.

## 5. Prerequisites
- [Lesson 41](41-imports-exports.md), [Lesson 40](40-async-await.md)
- Node.js LTS and `npm install` already done

## 6. Files We Will Create or Modify
- `eslint.config.mjs` (flat config)
- `package.json` script `"lint": "eslint ."`
- Optional: `.eslintignore` is replaced by an `ignores` block in the config

## 7. Step-by-Step Instructions
1. Install ESLint, TypeScript ESLint, and the Playwright plugin as dev dependencies.
2. Add `eslint.config.mjs` at the repo root.
3. Add `"lint": "eslint ."` to `package.json` `scripts`.
4. Run `npm run lint` and fix reported files.
5. Keep `node_modules/` and `playwright-report/` out of lint.

## 8. Complete Code Example

```js
// eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  { ignores: ['node_modules/', 'playwright-report/', 'test-results/', 'blob-report/'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...playwright.configs['flat/recommended'],
    files: ['src/**/*.ts', 'tests/**/*.ts'],
  },
);
```

```json
"lint": "eslint ."
```

## 9. Line-by-Line Explanation
- `ignores` skips generated folders Git already ignores.
- `recommended` turns on sensible JavaScript rules.
- `typescript-eslint` understands `.ts` files.
- `eslint-plugin-playwright` flags missing `await` on assertions and other Playwright mistakes.

## 10. How to Run It

```bash
npm run lint
```

## 11. Expected Result
The command prints problems or exits `0` with a clean report. CI should run this **before** browsers install, so a lint error fails fast.

## 12. Common Beginner Mistakes
- Linting `playwright-report/` HTML (slow and noisy)
- Disabling a rule with `eslint-disable` instead of fixing the `await`
- Forgetting the Playwright plugin, so floating promises slip through

## 13. How to Debug It
Read the rule name in the output (`@typescript-eslint/no-floating-promises`). Search that name. Fix the line. Re-run `npm run lint`. If the config itself fails to load, check `eslint.config.mjs` syntax.

## 14. Best Practices
- Same ESLint locally and in GitHub Actions
- Treat lint failures as merge blockers
- Prefer fixing code over stacking disable comments

## 15. What NOT to Do
- Do not use ESLint as a formatter (that is Prettier, next lesson)
- Do not hide `any` with a blanket disable
- Do not skip lint on pull requests

## 16. Hands-On Exercise
Temporarily remove `await` from one `expect` in a registration spec. Run `npm run lint`. Put `await` back.

## 17. Challenge Exercise
Add a rule that warns on `page.waitForTimeout`. Hard waits are not a synchronization strategy.

## 18. Knowledge Check / Quiz
1. What npm script runs ESLint in this course?
2. Does ESLint execute the registration form in a browser?
3. Why install `eslint-plugin-playwright`?

**Answers:** 1) `npm run lint` → `eslint .` 2) No 3) It catches Playwright-specific bugs such as missing `await`.

## 19. Interview Questions
1. What problem does ESLint solve that TypeScript does not?
2. Why lint in CI before installing browsers?
3. How would you catch missing `await` in Playwright tests?

## 20. Architect's Notes
Lint is a cheap quality gate. It does not replace code review. Keep the rule set small enough that people fix findings. A 400-rule config that everyone disables is theater.

## 21. Next Lesson
[Lesson 44 — Prettier](44-prettier.md)
