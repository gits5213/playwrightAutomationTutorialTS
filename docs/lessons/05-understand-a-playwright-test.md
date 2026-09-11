# Lesson 05 — Understand a Playwright Test

## 1. What You Will Learn

You will read a Playwright test as English. You will name `test`, `page`, `goto`, and `expect`. You will see the three-part shape: arrange, act, assert.

## 2. Why This Matters in Real Projects

**Problem:** a file full of commands looks like magic, so people copy it without knowing what can fail.

**Why it hurts:** when the test goes red, nobody knows which line was the check.

**Simple solution:** every test does setup, an action, and one clear check.

**Enterprise version:** names describe the business story: “empty form shows required field errors,” not “test1.”

## 3. Concept in Plain English

A test is a named function. Playwright gives you a `page` (a tab). You send the tab to a URL. You find something a person would see. You **assert** it is true. If the assertion is false, the test fails.

## 4. Real-Life Analogy

A driving test: sit in the car (arrange), use the turn signal (act), examiner confirms the light blinked (assert). Missing the last step is not a test. It is only a drive.

## 5. Prerequisites

[Lesson 04](04-create-the-project.md). `npm install` and Chromium are done.

## 6. Files We Will Create or Modify

Read [tests/basic/registration-heading.spec.ts](../../tests/basic/registration-heading.spec.ts). You may copy the same shape into `tests/01-basic/` in the next lesson.

## 7. Step-by-Step Instructions

1. Open the heading spec.
2. Find the import: `test` and `expect` come from `@playwright/test`.
3. Find the test name in quotes. That name appears in the report.
4. Find `page.goto`. That is navigation.
5. Find `expect(...).toBeVisible()`. That is the assertion.

## 8. Complete Code Example

```typescript
import { test, expect } from '@playwright/test';

test('the registration form shows a heading', async ({ page }) => {
  await page.goto('https://gitsuniversity.org/practice/registration-form/');

  await expect(page.getByRole('heading', { name: 'Registration Form' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});
```

## 9. Line-by-Line Explanation

`import` loads Playwright’s test helpers. `test('...', async ({ page }) => {` starts one check and receives a tab. `await` means “wait until this step finishes.” `goto` loads the form. `getByRole('heading', { name: 'Registration Form' })` finds the accessible heading. `toBeVisible()` fails if it is not shown. The second expect finds the **Register** button the same way.

## 10. How to Run It

```bash
npx playwright test tests/basic/registration-heading.spec.ts --headed --project=chromium
```

## 11. Expected Result

A browser opens. You see **Registration Form** and **Register**. The terminal prints **1 passed**.

## 12. Common Beginner Mistakes

- Forgetting `await`. The test continues too soon.
- Using a name that a person would never say, like a long CSS path, on the first test.
- Putting ten unrelated asserts in one test so a fail is confusing.

## 13. How to Debug It

Rerun with `--headed`. If it times out, the locator did not match. Print the title with `console.log(await page.title())` only as a temporary aid. Prefer the trace or HTML report.

## 14. Best Practices

One story per test. Use roles and accessible names. Keep the URL visible while you learn; move it to config later.

## 15. What NOT to Do

Do not skip assertions. A test that only clicks and never `expect`s can pass while the page is broken. Do not name tests `test` or `final2`.

## 16. Hands-On Exercise

Change the heading name in the expect to `Registration`. Run the file. Read the failure. Change it back and confirm it passes.

## 17. Challenge Exercise

Add a third assertion: the link **Terms and Conditions** is visible. Use `getByRole('link', { name: 'Terms and Conditions' })`.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. What does `{ page }` represent?
2. What does `await` tell Playwright to do?
3. Which line is the assertion in the example?
4. Why use `getByRole` for the heading?

<details>
<summary>Answers</summary>

1. A browser tab Playwright created for this test.
2. Wait for that step to finish before the next line.
3. Each `expect(...).toBeVisible()` line.
4. It matches what a person (and assistive tech) calls the heading.

</details>

## 19. Interview Questions

1. What are arrange, act, and assert in a UI test?
2. Why are Playwright tests `async`?
3. What makes a test name useful in a CI report?

## 20. Architect's Notes

Assertions are the contract. Locators should survive styling changes. Later you will hide `goto` and locators in a page object, but the test will still be “story + expect.” Never lose that shape.

## 21. Next Lesson

Continue with [Lesson 06](06-navigate-to-the-registration-form.md).
