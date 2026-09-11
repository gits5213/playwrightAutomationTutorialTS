# Lesson 27 — Smoke, Regression, and Tags

## 1. What You Will Learn
- Tag tests with `@smoke`, `@regression`, `@negative`, and `@registration`.
- Run a slice with `--grep`.
- Explain smoke vs regression in one sentence each.

## 2. Why This Matters in Real Projects
A full suite can take 20 minutes. A **smoke** run should answer in a few minutes: “Is the form even up?” CI can run smoke on every push and regression nightly. Tags make that a command, not a scavenger hunt.

## 3. Concept in Plain English
A **tag** is a label in the test title, like `@smoke`. Playwright’s `--grep` keeps tests whose titles match. You are not copying files into a “smoke folder.”

## 4. Real-Life Analogy
Color stickers on cables: red = emergency kit, blue = full inventory. You still have one drawer. You grab by color when you are in a hurry.

## 5. Prerequisites
- [Lesson 26](26-environment-variables.md).
- At least one registration spec.

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `tests/e2e/registration.spec.ts` | Titles include tags |
| `tests/e2e/registration.data-driven.spec.ts` | `@negative @registration` |
| `package.json` | Scripts like `test:smoke` |

## 7. Step-by-Step Instructions
1. Put tags in the **title string**: `'the registration form page loads @smoke @registration'`.
2. Use `@smoke` for “site opens / heading visible.”
3. Use `@regression` for the wider set (empty form, data-driven errors, keywords).
4. Use `@negative` for invalid data rows; `@registration` for this feature.
5. Run with `--grep @smoke` or `--grep-invert @negative`.

## 8. Complete Code Example

```typescript
test('the registration form page loads @smoke @registration', async ({ registrationPage }) => {
  await expect(registrationPage.heading).toBeVisible();
});

test('empty form shows required field errors @regression @negative @registration', async ({ registrationPage }) => {
  await registrationPage.clickRegister();
  await expect(registrationPage.error('firstName')).toContainText('First name is required');
});

test('successful registration with valid data @smoke @registration', async ({ registrationPage }) => {
  test.skip(process.env.RUN_REGISTRATION_SUBMISSION !== 'true');
  // fill unique registrant, click Register, assert success
});
```

```bash
npx playwright test --grep @smoke
npx playwright test --grep @registration
npx playwright test --grep @negative
```

## 9. Line-by-Line Explanation
- `@smoke` — tiny, fast, “is it on fire?”
- `@regression` — deeper coverage after a change.
- `@negative` — we **expect** red errors, not success.
- `@registration` — feature label so checkout tests are not mixed in.
- `--grep` — regex on the title; you can combine with `--project=chromium`.

## 10. How to Run It

```bash
npx playwright test --grep @smoke --project=chromium
npx playwright test --grep "@registration" --project=chromium
npm run test:smoke
```

## 11. Expected Result
Smoke: a few tests (heading, maybe gated success). `@negative`: invalid email/username/password rows. The report titles still show the tags.

## 12. Common Beginner Mistakes
- Tagging **every** test `@smoke` (then smoke is not smoke).
- Putting tags only in comments — `--grep` will not see them.
- Using folders instead of tags and duplicating specs.

## 13. How to Debug It
`npx playwright test --grep @smoke --list` prints what will run. If the list is empty, the tag spelling differs (`@Smoke` vs `@smoke`). Grep is case-sensitive by default.

## 14. Best Practices
- Few smoke tests per feature (load + one happy path if cheap).
- Negative rows tagged `@negative @registration`.
- Success submit still gated by `RUN_REGISTRATION_SUBMISSION`.

## 15. What NOT to Do
Do not invent twenty tags on day one. Do not use tags instead of skipping dangerous submits. Do not grep locators — tags are for **selection**, not for data.

## 16. Hands-On Exercise
Add `@regression @registration` to the empty-form test and run `--grep @regression`. Confirm the heading smoke test is excluded if it lacks `@regression`.

## 17. Challenge Exercise
Write an npm script `test:registration:negative` that greps tests with both `@negative` and `@registration` (hint: `--grep "@negative.*@registration|@registration.*@negative"` or two tags in one title).

## 18. Knowledge Check / Quiz
1. Where must `@smoke` appear for `--grep` to work?
2. What is a smoke test supposed to prove?
3. Which tag fits “password too short”?

### Answers
1. In the test title string.
2. A fast “the form loads / critical path is not dead.”
3. `@negative` (and usually `@registration`).

## 19. Interview Questions
1. How do you structure smoke vs regression in Playwright?
2. How do title tags compare to `test.describe` folders?
3. How should CI jobs use `--grep`?

## 20. Architect's Notes
Tags are a **query** over one suite. Prefer a single tree of specs plus labels. Combine with projects (next: more browsers) so `@smoke` can still run on Chromium-only in PR builds while nightly regression fans out.

## 21. Next Lesson
[Lesson 28 — Cross-Browser Testing](28-cross-browser-testing.md)
