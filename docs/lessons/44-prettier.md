# Lesson 44 — Prettier

## 1. What You Will Learn
- The difference between **formatting** (Prettier) and **quality** (ESLint)
- Scripts `format` and `format:check`
- How to stop arguing about quotes and semicolons in pull requests

## 2. Why This Matters in Real Projects
Reviewers should discuss locators and assertions, not tabs. Prettier rewrites files to one style so Git diffs show **behavior** changes. That keeps pull requests readable as the registration suite grows.

## 3. Concept in Plain English
Prettier is a printer. You save a file; it reprints the code with the same meaning and a consistent look. It does not know if your test is correct. It only knows how the text should sit on the page.

## 4. Real-Life Analogy
A restaurant prints every menu in the same font. The food can still be wrong. Prettier is the printer. ESLint is the health inspector. Playwright is the taste test.

## 5. Prerequisites
- [Lesson 43](43-eslint.md)

## 6. Files We Will Create or Modify
- `prettier.config.mjs` or `.prettierrc`
- `.prettierignore`
- `package.json` scripts `format` and `format:check`

## 7. Step-by-Step Instructions
1. Install Prettier as a dev dependency.
2. Add a short config (single quotes, trailing commas, width).
3. Ignore `node_modules/`, reports, and lockfile noise if you choose.
4. Add scripts (see example).
5. Run `npm run format` once, then `npm run format:check` in CI.

## 8. Complete Code Example

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

`.prettierignore`:

```text
node_modules
playwright-report
test-results
blob-report
package-lock.json
```

## 9. Line-by-Line Explanation
- `prettier --write .` **changes** files to match the config.
- `prettier --check .` **fails** if anything would change (CI-friendly).
- ESLint still owns bugs. Turn off ESLint formatting rules that fight Prettier, or use `eslint-config-prettier`.

## 10. How to Run It

```bash
npm run format
npm run format:check
```

## 11. Expected Result
`format` rewrites messy spacing. `format:check` exits `0` when the tree is already formatted. A pull request with random indentation fails `format:check`.

## 12. Common Beginner Mistakes
- Running Prettier only on one laptop, never in CI
- Letting ESLint and Prettier fight over quotes
- Formatting `playwright-report/` generated HTML

## 13. How to Debug It
If `format:check` fails, run `npm run format` locally and commit. If only one file fights you, open it and look for mixed tabs. Editor “Format on Save” should use Prettier, not a second formatter.

## 14. Best Practices
- One config in Git
- `format:check` on every pull request
- Format the whole repo, not a personal subset of files

## 15. What NOT to Do
- Do not mix Prettier with manual “pretty” rewrites in the same PR as a logic change (huge noisy diffs)
- Do not treat a green Prettier run as proof the registration test is correct

## 16. Hands-On Exercise
Add extra blank lines in `src/data/registration.data.ts`, run `npm run format`, and confirm they disappear.

## 17. Challenge Exercise
Enable Format on Save in Cursor for this workspace so every lesson file you edit is already CI-clean.

## 18. Knowledge Check / Quiz
1. Which tool checks types: Prettier, ESLint, or `tsc`?
2. What is the difference between `format` and `format:check`?
3. Should Prettier replace Playwright assertions?

**Answers:** 1) `tsc` (`npm run typecheck`) 2) write vs verify 3) No — formatting is not testing.

## 19. Interview Questions
1. How do ESLint and Prettier differ?
2. Why run `prettier --check` in CI instead of `--write`?
3. How does consistent formatting help code review?

## 20. Architect's Notes
Formatting is governance, not architecture. Decide once. Automate it. Spend human attention on isolation, locators, and whether success tests are gated by `RUN_REGISTRATION_SUBMISSION`.

## 21. Next Lesson
[Lesson 45 — TypeScript Type Checking](45-typescript-type-checking.md)
