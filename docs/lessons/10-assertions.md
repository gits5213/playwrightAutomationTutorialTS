# Lesson 10 — Assertions

## 1. What You Will Learn

You will use Playwright `expect` checks on the registration form. You will know `toBeVisible`, `toHaveCount`, `toContainText`, and `toHaveValue`. You will see that a test without an assertion is not a test.

## 2. Why This Matters in Real Projects

**Problem:** a script clicks **Register** and ends. CI is green even when success never appears.

**Why it hurts:** you ship a broken form with a “passing” suite.

**Simple solution:** every test ends with an `expect` that states the promise.

**Enterprise version:** assertions use shared message constants so a copy change is one edit.

## 3. Concept in Plain English

An **assertion** asks Playwright, “Is this true?” If not, the test fails and the report shows the expected vs received value. You assert what a person would notice: a heading, a success title, a red required message.

## 4. Real-Life Analogy

Turning on a lamp is the action. Looking at the bulb is the assertion. If you never look, you cannot claim the lamp works.

## 5. Prerequisites

[Lesson 09](09-fill-registration-form.md). You can fill and submit.

## 6. Files We Will Create or Modify

Create or extend `tests/01-basic/assertions.spec.ts`.

## 7. Step-by-Step Instructions

1. After `goto`, assert the heading is visible.
2. Fill First Name and assert `toHaveValue('John')`.
3. Submit an empty form in a **separate** test and assert `toContainText('First name is required')`.
4. Never assert a message this page does not show.

## 8. Complete Code Example

```typescript
import { test, expect } from '@playwright/test';

test('first name keeps the typed value', async ({ page }) => {
  await page.goto('https://gitsuniversity.org/practice/registration-form/');
  const first = page.getByRole('textbox', { name: 'First Name *' });
  await first.fill('John');
  await expect(first).toHaveValue('John');
  await expect(page.getByRole('heading', { name: 'Registration Form' })).toBeVisible();
});
```

Empty-submit assertion (messages verified on this page):

```typescript
await expect(page.getByText('First name is required')).toBeVisible();
await expect(page.getByText('Email is required')).toBeVisible();
```

## 9. Line-by-Line Explanation

`toHaveValue` checks what the textbox holds after `fill`. `toBeVisible` checks the heading is on screen. `toContainText` / `getByText` check the exact required copy. Do not assert a Confirm Password required message on an empty submit; this page does not show one.

## 10. How to Run It

```bash
npx playwright test tests/01-basic/assertions.spec.ts --headed --project=chromium
```

## 11. Expected Result

The value check passes. If you assert a fake message such as “Please enter first name,” the test fails because that text is not on the page.

## 12. Common Beginner Mistakes

- Inventing copy (“This field is required”) instead of using **First name is required**.
- Using `toBeVisible` on a message that is in the DOM but empty. Prefer `toContainText` on the error.
- Asserting URL only and ignoring the success title.

## 13. How to Debug It

The failure shows expected and received. If timeout, the locator never found the text. Open the trace viewer: `npx playwright show-report` and inspect the snapshot.

## 14. Best Practices

Assert user-visible results. Use the exact strings from the live form. Keep one main assertion story per test.

## 15. What NOT to Do

Do not `expect(true).toBe(true)` to force a pass. Do not assert internal CSS classes. Do not assume Confirm Password has a required message.

## 16. Hands-On Exercise

After a valid submit, assert **Registration Successful**. After an empty submit, assert **You must accept the terms and conditions**.

## 17. Challenge Exercise

Assert **Password is required** on empty submit, and also assert that a Confirm Password required message is **not** shown (`toHaveCount(0)` on that text).

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. What assertion checks a heading is on screen?
2. What assertion checks typed text in a box?
3. What is the empty-submit email message?
4. Does Confirm Password show a required message when the form is empty?

<details>
<summary>Answers</summary>

1. `toBeVisible()`.
2. `toHaveValue(...)`.
3. Email is required.
4. No.

</details>

## 19. Interview Questions

1. Why must an automated test include assertions?
2. What is the difference between `toBeVisible` and `toContainText`?
3. How do you assert that a message should *not* appear?

## 20. Architect's Notes

Hardcoded strings in specs will drift. Lesson 18 moves them into typed objects. Soft asserts exist in Playwright, but beginners should fail fast on the first broken promise. Never assert implementation details the user cannot see.

## 21. Next Lesson

Continue with [Lesson 11](11-positive-vs-negative-testing.md).
