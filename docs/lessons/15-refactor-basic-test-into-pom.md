# Lesson 15 — Refactor the Basic Test into POM

## 1. What You Will Learn

You will rewrite the learning fill test so it uses `RegistrationPage`. You will keep behavior the same: valid data still shows **Registration Successful**.

## 2. Why This Matters in Real Projects

**Problem:** a page class that nobody calls does not help.

**Why it hurts:** two styles live together (raw locators and POM), and people copy the old style.

**Simple solution:** one refactored spec that only speaks to the page object.

**Enterprise version:** fixtures construct `new RegistrationPage(page)` for every test automatically.

## 3. Concept in Plain English

**Refactor** means change the structure, not the story. Before: twenty `getByRole` lines. After: `goto`, `fillValid`, `clickRegister`, `expect` success. The user-visible result must stay the same.

## 4. Real-Life Analogy

You move spices from twelve unlabeled jars into one rack. Dinner is still soup. You just find paprika without opening every jar.

## 5. Prerequisites

[Lesson 14](14-page-object-model.md). `src/pages/RegistrationPage.ts` exists with locators and actions.

## 6. Files We Will Create or Modify

Modify `src/pages/RegistrationPage.ts` to add a full `fillValid()` if it is incomplete. Create `tests/01-basic/fill-with-pom.spec.ts`. Keep the old learning spec until the new one passes.

## 7. Step-by-Step Instructions

1. Add remaining locators and `fillValid()` on the page class.
2. Create a new spec that imports `RegistrationPage`.
3. `const registrationPage = new RegistrationPage(page)`.
4. `await registrationPage.goto()`.
5. `await registrationPage.fillValid()`.
6. `await registrationPage.clickRegister()`.
7. Assert **Registration Successful**.
8. Run both old and new tests. Then you may stop using the long fill spec for new work.

## 8. Complete Code Example

```typescript
import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../src/pages/RegistrationPage';

test('valid registration through the page object', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await registrationPage.goto();
  await registrationPage.fillValid();
  await registrationPage.clickRegister();

  await expect(page.getByText('Registration Successful')).toBeVisible();
});
```

`fillValid()` should type a complete person: John Doe, `john.doe@example.com`, phone `1234567890`, username `johndoe`, matching passwords `Practice1`, Gender Male, date `1990-01-15`, Country United States, terms checked.

## 9. Line-by-Line Explanation

The import brings the page class. `new RegistrationPage(page)` attaches locators to this tab. `goto` / `fillValid` / `clickRegister` are the act. The expect is still in the test, where the story’s outcome belongs.

## 10. How to Run It

```bash
npx playwright test tests/01-basic/fill-with-pom.spec.ts --headed --project=chromium
```

## 11. Expected Result

Same success screen as Lesson 09. The spec is short. If **Email *** changes, you edit `RegistrationPage.ts` only.

## 12. Common Beginner Mistakes

- Forgetting `new RegistrationPage(page)` and calling methods on `page`.
- Leaving `getByRole` copies in the spec “just in case.”
- Changing passwords so they no longer match while refactoring.

## 13. How to Debug It

If the POM test fails and the old spec passes, `fillValid` missed a field (often terms, Confirm Password, or `exact: true`). Run headed and watch each control.

## 14. Best Practices

Refactor with the old test still green. Keep assertions in the spec. Name the test after the story, not after “POM.”

## 15. What NOT to Do

Do not mix half POM and half raw locators in the same test. Do not move the success expect into `clickRegister` unless you rename it to something honest like `submitAndExpectSuccess` (this course keeps expect in the test).

## 16. Hands-On Exercise

Add `fillValid` parameters later in Lesson 18. For now, write a second POM test that clicks Register without filling and asserts **First name is required**.

## 17. Challenge Exercise

Replace `fillValid()` internals so Email uses `getByRole('textbox', { name: 'Email *' })` if you had used something else. Rerun. Tests should not change.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. What does refactor mean here?
2. Where should **Registration Successful** be asserted in this lesson?
3. How do you construct the page object?
4. If Email’s name changes, which file should you edit?

<details>
<summary>Answers</summary>

1. Same behavior, cleaner structure.
2. In the test, after `clickRegister()`.
3. `new RegistrationPage(page)`.
4. `src/pages/RegistrationPage.ts`.

</details>

## 19. Interview Questions

1. How do you migrate existing tests to POM without breaking CI?
2. Why keep assertions out of click methods?
3. What is a Playwright fixture, and how could it supply a page object?

## 20. Architect's Notes

Migration rule: new tests use POM; old tests convert when touched. Fixtures should eventually yield `registrationPage` so constructors disappear from specs. Pair this refactor with a smoke tag. Never “clean up” by deleting assertions.

## 21. Next Lesson

Continue with [Lesson 16](16-component-object-model.md).
