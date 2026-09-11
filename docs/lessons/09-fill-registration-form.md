# Lesson 09 — Fill the Registration Form

## 1. What You Will Learn

You will type into every field, choose Gender and Country, check the terms, and click **Register**. You will keep this in `tests/01-basic/` as a **learning** test. Production tests later use a page object.

## 2. Why This Matters in Real Projects

**Problem:** the first working fill is often a long script with values typed inline.

**Why it hurts:** that file is hard to reuse. You will feel that pain in Lesson 13, then fix it with POM.

**Simple solution:** one learning test that fills a valid person and looks for **Registration Successful**.

**Enterprise version:** `RegistrationPage.fillForm(person)` plus typed data objects (Lessons 14–18).

## 3. Concept in Plain English

`fill` types into a textbox. `selectOption` chooses a combobox label. `check` ticks a checkbox. `click` presses **Register**. Use the locators from Lesson 08, including `exact: true` on Password.

## 4. Real-Life Analogy

You complete a paper packet in order: name, contact, password twice, gender, birthday, country, then you tick terms and hand it to the clerk. The clerk stamps **Registration Successful**.

## 5. Prerequisites

[Lesson 08](08-playwright-locators.md). You can locate each control uniquely.

## 6. Files We Will Create or Modify

Create `tests/01-basic/fill-registration-form.spec.ts`. This folder is for learning. Do not treat it as the final architecture.

## 7. Step-by-Step Instructions

1. Create the spec file under `tests/01-basic/`.
2. `goto` the form.
3. `fill` First Name, Last Name, Email, Phone (`1234567890`), Username (at least 5 characters), Password and Confirm Password (at least 8 characters, matching).
4. `selectOption({ label: 'Male' })` on Gender (or another real option on the page).
5. `fill` Date of Birth as `1990-01-15`.
6. `selectOption({ label: 'United States' })` on Country.
7. `check` the terms checkbox.
8. Click **Register**.
9. Assert the success title **Registration Successful**.

## 8. Complete Code Example

```typescript
import { test, expect } from '@playwright/test';

test('valid registration succeeds', async ({ page }) => {
  await page.goto('https://gitsuniversity.org/practice/registration-form/');

  await page.getByRole('textbox', { name: 'First Name *' }).fill('John');
  await page.getByRole('textbox', { name: 'Last Name *' }).fill('Doe');
  await page.getByRole('textbox', { name: 'Email *' }).fill('john.doe@example.com');
  await page.getByRole('textbox', { name: 'Phone Number *' }).fill('1234567890');
  await page.getByRole('textbox', { name: 'Username *' }).fill('johndoe');
  await page.getByRole('textbox', { name: 'Password *', exact: true }).fill('Practice1');
  await page.getByRole('textbox', { name: 'Confirm Password *' }).fill('Practice1');
  await page.getByRole('combobox', { name: 'Gender *' }).selectOption({ label: 'Male' });
  await page.getByRole('textbox', { name: 'Date of Birth *' }).fill('1990-01-15');
  await page.getByRole('combobox', { name: 'Country *' }).selectOption({ label: 'United States' });
  await page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions *' }).check();
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText('Registration Successful')).toBeVisible();
});
```

## 9. Line-by-Line Explanation

Each `fill` writes one field. Phone uses ten digits, matching the placeholder pattern. Username is at least five characters. Passwords match and are at least eight characters. Comboboxes use visible labels. The checkbox must be checked or the page asks you to accept the terms. The last line checks the success title.

## 10. How to Run It

```bash
npx playwright test tests/01-basic/fill-registration-form.spec.ts --headed --project=chromium
```

## 11. Expected Result

The form fills, **Register** is clicked, and **Registration Successful** appears. Nothing is saved as a real student account on this practice page.

## 12. Common Beginner Mistakes

- Filling Password without `exact: true`.
- Using a username shorter than 5 characters or a password shorter than 8.
- Skipping the terms checkbox.
- Treating this long test as the pattern to copy into every future file.

## 13. How to Debug It

Watch the headed run. If success never appears, read the red messages. If a native browser balloon appears, the HTML `required` tooltip may be blocking you; later empty-form tests disable that. For a valid fill, complete every `*` field.

## 14. Best Practices

Keep this as a learning spec. Next, you will extract locators. Use realistic but fake data (`example.com`). Prefer labels on `selectOption`.

## 15. What NOT to Do

Do not copy this entire fill into five other tests. Do not invent extra validation. Do not use a real personal password you use elsewhere.

## 16. Hands-On Exercise

Change First Name to your first name. Rerun. Confirm the success view still appears.

## 17. Challenge Exercise

Duplicate the test, change Email to `invalid-email`, and expect failure to succeed (you should **not** see **Registration Successful**). Full negative testing is Lesson 11.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. Which folder is for learning tests?
2. Why is `exact: true` on Password?
3. What success text should you see?
4. What comes later instead of this long spec?

<details>
<summary>Answers</summary>

1. `tests/01-basic/`.
2. So Confirm Password is not matched.
3. Registration Successful.
4. The page object model (POM).

</details>

## 19. Interview Questions

1. What is the difference between a learning test and a production test?
2. How do you fill a `<select>` in Playwright?
3. Why should valid passwords in examples be fake?

## 20. Architect's Notes

A linear fill is the right first success. It is the wrong long-term API. The enterprise version is one `fillForm` method, unique emails if the app stored users, and no locators in the spec. You will refactor this file in Lesson 15 rather than decorating it.

## 21. Next Lesson

Continue with [Lesson 10](10-assertions.md).
