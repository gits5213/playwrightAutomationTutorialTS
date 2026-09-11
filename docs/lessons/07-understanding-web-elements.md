# Lesson 07 — Understanding Web Elements

## 1. What You Will Learn

You will name the kinds of controls on the registration form. You will match each one to a role a tester (and Playwright) can use: textbox, combobox, checkbox, button, heading, link.

## 2. Why This Matters in Real Projects

**Problem:** beginners treat every box as a “div” and hunt CSS classes.

**Why it hurts:** class names change when a designer restyles the page. Tests break even though users still see “First Name.”

**Simple solution:** find elements the way a person names them.

**Enterprise version:** accessible names are the contract between design, development, and test.

## 3. Concept in Plain English

A **web element** is one control on the page. The GITS form’s live accessible names are:

| Role | Accessible name |
| --- | --- |
| heading | Registration Form |
| textbox | First Name *, Last Name *, Email *, Phone Number *, Username *, Password *, Confirm Password *, Date of Birth * |
| combobox | Gender *, Country * |
| checkbox | I agree to the Terms and Conditions * |
| link | Terms and Conditions |
| button | Register |

Phone Number shows placeholder `1234567890`. That is a hint, not the accessible name.

## 4. Real-Life Analogy

A paper form has blanks, a dropdown for country, a checkbox for terms, and a submit stamp. You would never tell a helper “fill the third grey rectangle.” You would say “First Name.”

## 5. Prerequisites

[Lesson 06](06-navigate-to-the-registration-form.md). You can open the form with a test.

## 6. Files We Will Create or Modify

None required. Optionally add comments in `tests/01-basic/page-loads.spec.ts`.

## 7. Step-by-Step Instructions

1. Open the live form.
2. Click in **First Name *** and type a letter. That is a textbox.
3. Open **Gender ***. That is a combobox (a select).
4. Tick **I agree to the Terms and Conditions ***. That is a checkbox.
5. Notice **Terms and Conditions** as a link next to the checkbox.
6. Find **Register**. That is a button.

## 8. Complete Code Example

```typescript
import { test, expect } from '@playwright/test';

test('key form elements are present', async ({ page }) => {
  await page.goto('https://gitsuniversity.org/practice/registration-form/');

  await expect(page.getByRole('textbox', { name: 'First Name *' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Gender *' })).toBeVisible();
  await expect(page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions *' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Terms and Conditions' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});
```

## 9. Line-by-Line Explanation

Each `getByRole` pair is “what kind of control” plus “what a person calls it.” The asterisk is part of the accessible name on this page, so you include `*` in the string. The link name does **not** include the checkbox sentence; it is only **Terms and Conditions**.

## 10. How to Run It

Paste the example into `tests/01-basic/elements.spec.ts` if you want to run it:

```bash
npx playwright test tests/01-basic/elements.spec.ts --headed --project=chromium
```

## 11. Expected Result

All five expects pass. You have proven the main control types exist.

## 12. Common Beginner Mistakes

- Calling Gender a textbox. It is a combobox.
- Using the placeholder `1234567890` as the Phone name. The name is **Phone Number ***.
- Dropping the `*` from names. On this page the `*` is in the accessible name.

## 13. How to Debug It

In headed mode, open Playwright Inspector (`npx playwright test --debug`) and use the picker. If two names look similar, read Lesson 08 (`exact: true` for Password).

## 14. Best Practices

Inventory roles before you write fills. Prefer labels users see. Write the asterisk if the accessibility tree includes it.

## 15. What NOT to Do

Do not start with `#id` or `.css` while you are learning this form. Do not invent roles. Do not ignore the difference between the terms **checkbox** and the terms **link**.

## 16. Hands-On Exercise

List every textbox name from the table above. Check them on the live page. Add **Last Name *** to the example test.

## 17. Challenge Exercise

Use Chrome DevTools → Accessibility pane on **Password ***. Confirm the name includes the asterisk. Compare it with **Confirm Password ***.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. What role is Country?
2. What is the checkbox’s accessible name?
3. Is Date of Birth a combobox or a textbox on this page?
4. What is the phone placeholder?

<details>
<summary>Answers</summary>

1. combobox.
2. I agree to the Terms and Conditions *
3. textbox.
4. 1234567890.

</details>

## 19. Interview Questions

1. What is an accessible name, and why do automation tools use it?
2. How do you choose a locator strategy when a control has both an id and a visible label?
3. What is the difference between a button and a link in UI testing?

## 20. Architect's Notes

Roles map to how assistive technology reads the page. Teams that ship accessible names get more stable tests for free. When a label is duplicated, ids can be a backup — but only after you prove the name is not unique. That is the next lesson.

## 21. Next Lesson

Continue with [Lesson 08](08-playwright-locators.md).
