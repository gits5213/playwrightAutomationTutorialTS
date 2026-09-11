# Lesson 08 — Playwright Locators

## 1. What You Will Learn

You will write locators with `getByRole`. You will use `{ exact: true }` on **Password *** because **Confirm Password *** also contains the word Password. You will prefer roles over CSS.

## 2. Why This Matters in Real Projects

**Problem:** `getByRole('textbox', { name: 'Password *' })` also matches **Confirm Password *** because Playwright’s default name match is not exact.

**Why it hurts:** Playwright throws “strict mode violation: resolved to 2 elements,” or it fills the wrong box.

**Simple solution:** `name: 'Password *', exact: true` for Password. Confirm Password can use its full name.

**Enterprise version:** page objects hide that detail so tests never repeat the trick.

## 3. Concept in Plain English

A **locator** is the instruction “find this control.” Playwright’s first choice is role plus name. CSS (`#id`, `.class`) is a last resort while you learn. On this form, Password needs **exact** matching.

## 4. Real-Life Analogy

If you shout “Pat” in a room with Pat and Patricia, both people look up. If you say the exact full name, only one person answers. `exact: true` is the full name.

## 5. Prerequisites

[Lesson 07](07-understanding-web-elements.md). You know each field’s role and name.

## 6. Files We Will Create or Modify

`tests/01-basic/locators.spec.ts` (create).

## 7. Step-by-Step Instructions

1. Create the file.
2. Locate each textbox by role and full name, including `*`.
3. Locate Password with `exact: true`.
4. Locate Gender and Country as comboboxes.
5. Locate the terms checkbox and the Register button.
6. Assert each one has count `1` so you know the locator is unique.

## 8. Complete Code Example

```typescript
import { test, expect } from '@playwright/test';

test('password locator is unique with exact true', async ({ page }) => {
  await page.goto('https://gitsuniversity.org/practice/registration-form/');

  const password = page.getByRole('textbox', { name: 'Password *', exact: true });
  const confirm = page.getByRole('textbox', { name: 'Confirm Password *' });

  await expect(password).toHaveCount(1);
  await expect(confirm).toHaveCount(1);
  await expect(page.getByRole('textbox', { name: 'Phone Number *' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Country *' })).toHaveCount(1);
});
```

## 9. Line-by-Line Explanation

The Password locator passes `exact: true` so “Confirm Password *” is not included. Confirm Password uses its full accessible name. Phone Number uses the name, not the placeholder. Country is a combobox, not a textbox. `toHaveCount(1)` proves strict uniqueness.

## 10. How to Run It

```bash
npx playwright test tests/01-basic/locators.spec.ts --headed --project=chromium
```

Then, as an experiment, remove `exact: true` and rerun. Read the error.

## 11. Expected Result

With `exact: true`, the test passes. Without it, Playwright reports the locator matched more than one textbox.

## 12. Common Beginner Mistakes

- Forgetting `exact: true` on Password.
- Using `{ name: 'Password' }` without the asterisk.
- Switching to a long CSS selector after the first strict-mode error instead of fixing the name.

## 13. How to Debug It

The error lists the matching elements. Read their names. If two names overlap, add `exact: true` or use a longer unique name. `--debug` highlights the matches.

## 14. Best Practices

Prefer `getByRole`. Use `exact: true` when names overlap. Keep locators unique; never `first()` to silence strict mode unless you have a real list.

## 15. What NOT to Do

Do not copy XPath from a browser extension. Do not locate Password by placeholder. Do not use `page.locator('input').nth(5)` for registration fields.

## 16. Hands-On Exercise

Write locators for First Name, Email, Username, Date of Birth, and the terms checkbox. Assert each `toHaveCount(1)`.

## 17. Challenge Exercise

Intentionally use `getByRole('textbox', { name: 'Password *' })` without `exact`. Capture the strict-mode message in your notes, then fix it.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. Why does Password need `exact: true`?
2. Should you prefer CSS or `getByRole` in this course?
3. What role is Gender?
4. What happens if a locator matches two elements?

<details>
<summary>Answers</summary>

1. Confirm Password * also contains Password *.
2. `getByRole`.
3. combobox.
4. Playwright fails in strict mode (or you might fill the wrong field).

</details>

## 19. Interview Questions

1. What is Playwright strict mode, and why is it useful?
2. When would you choose `getByRole` over a CSS id?
3. How do you handle two controls whose accessible names overlap?

## 20. Architect's Notes

Exact matching is a locator policy, not a one-off hack. Put it in the page object once. Ban `nth()` in review unless the control is truly a list. CSS ids are acceptable on this form in production code when names are awkward, but the teaching default remains role plus name.

## 21. Next Lesson

Continue with [Lesson 09](09-fill-registration-form.md).
