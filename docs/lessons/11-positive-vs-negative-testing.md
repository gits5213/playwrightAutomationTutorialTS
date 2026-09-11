# Lesson 11 — Positive vs Negative Testing

## 1. What You Will Learn

You will split registration checks into **positive** (valid data succeeds) and **negative** (the page refuses bad or missing data). You will use only messages that this form actually shows.

## 2. Why This Matters in Real Projects

**Problem:** teams only test the happy path.

**Why it hurts:** invalid email, short passwords, and empty required fields reach production.

**Simple solution:** one success test plus targeted failure tests.

**Enterprise version:** a table of negative cases (data-driven) so each mistake is one row.

## 3. Concept in Plain English

**Positive / happy path:** a complete valid person sees **Registration Successful**.

**Negative:** the page blocks the action and shows a message.

Verified empty-submit messages: First name is required, Last name is required, Email is required, Phone number is required, Username is required, Password is required, Gender is required, Date of birth is required, Country is required, You must accept the terms and conditions. Confirm Password does **not** show a required message when the whole form is empty.

Also known on this page: invalid email format, username at least 5 characters, password at least 8 characters, passwords must match, invalid phone.

## 4. Real-Life Analogy

A lock should open with the right key (positive). It should stay shut with the wrong key or no key (negative). Testing only the right key does not prove the lock.

## 5. Prerequisites

[Lesson 10](10-assertions.md). You can assert visible text.

## 6. Files We Will Create or Modify

`tests/01-basic/positive-negative.spec.ts`.

## 7. Step-by-Step Instructions

1. Keep the valid fill from Lesson 09 as the positive test.
2. Add a test that clicks **Register** with the form empty and asserts several required messages.
3. Add a test that fills a valid person except email `invalid-email`, then asserts the email format error.
4. Do not write a Confirm Password required check on empty submit.

## 8. Complete Code Example

```typescript
test('empty submit shows required messages', async ({ page }) => {
  await page.goto('https://gitsuniversity.org/practice/registration-form/');
  await page.locator('#registration-form').evaluate((form) => {
    form.setAttribute('novalidate', 'novalidate');
  });
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText('First name is required')).toBeVisible();
  await expect(page.getByText('Password is required')).toBeVisible();
  await expect(page.getByText('You must accept the terms and conditions')).toBeVisible();
});
```

`novalidate` turns off the browser’s own “fill this out” balloon so you can see the **page’s** red text.

## 9. Line-by-Line Explanation

The empty test is negative: we expect refusal, not success. `novalidate` is a test helper for this page, not a product feature you are testing. Each `getByText` uses verified copy. A positive test would instead expect **Registration Successful**.

## 10. How to Run It

```bash
npx playwright test tests/01-basic/positive-negative.spec.ts --headed --project=chromium
```

## 11. Expected Result

Empty submit stays on the form and shows required text. Valid submit shows **Registration Successful**. Invalid email does not succeed.

## 12. Common Beginner Mistakes

- Asserting a Confirm Password required message on empty submit.
- Mixing success and failure expects in one test.
- Guessing “Invalid email format” wording without reading the page (on this form that wording is known; still verify it).

## 13. How to Debug It

If you only see a browser tooltip, add `novalidate` as in the example. If a negative test still shows success, your override did not change the field you thought.

## 14. Best Practices

Name tests so the report says empty, invalid email, or success. One invalid change per negative test when you can. Record exact strings.

## 15. What NOT to Do

Do not invent rules such as “middle name is required.” Do not treat a crash as a good negative test. Do not skip terms on a positive test.

## 16. Hands-On Exercise

Write a negative test with username `ab` (shorter than 5). Assert the username length message the page shows.

## 17. Challenge Exercise

Write a negative test where Password is `Practice1` and Confirm Password is `Practice2`. Assert that the passwords must match.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. What is a positive registration result on this page?
2. Name two empty-submit messages.
3. Does Confirm Password show required on empty submit?
4. Why use `novalidate` in the empty test?

<details>
<summary>Answers</summary>

1. The title Registration Successful.
2. Any two from the verified list in section 3.
3. No.
4. So the page’s red messages appear instead of the browser balloon.

</details>

## 19. Interview Questions

1. What is negative testing, and why is it required for forms?
2. How do you avoid false failures from native HTML5 validation in UI tests?
3. Why should each negative test change as little as possible?

## 20. Architect's Notes

Positive tests prove value. Negative tests prove guardrails. The enterprise pattern is: fill a valid baseline, override one field, assert one error. That becomes a data table in later lessons. Never encode unverified business rules.

## 21. Next Lesson

Continue with [Lesson 12](12-test-case-design.md).
