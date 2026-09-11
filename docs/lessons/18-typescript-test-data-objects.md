# Lesson 18 — TypeScript Test Data Objects

## 1. What You Will Learn

You will define a `RegistrationPerson` type and a `validRegistrant` object, pass it into `fillForm`, and override one field for a negative test.

## 2. Why This Matters in Real Projects

**Problem:** Lesson 17 left values inside the page. **Why it hurts:** new cases require new methods, and TypeScript cannot warn you that Country is missing.

**Simple solution:** one type, one valid object, `fillForm(person)`, negatives via `{ ...validRegistrant, email: 'invalid-email' }`. **Enterprise version:** error-case tables, unique emails, and fixtures that inject data and pages together.

## 3. Concept in Plain English

A **type** is a labeled shape. An **object** is one person who fits it. Spreading (`...validRegistrant`) copies the valid person, then you change one key. The page types whatever it receives.

## 4. Real-Life Analogy

A blank ID card (the type) lists the slots. John’s filled card is the object. A “bad email” drill takes John’s card and only swaps the email line.

## 5. Prerequisites

[Lesson 17](17-why-hardcoded-test-data-is-a-problem.md). `RegistrationPage` can be changed to accept a person.

## 6. Files We Will Create or Modify

Create `src/data/registrationPerson.ts`. Modify `RegistrationPage.fillForm`. Add `tests/01-basic/data-objects.spec.ts`.

## 7. Step-by-Step Instructions

1. Create the type with every form field.
2. Export `validRegistrant` (phone `1234567890`, username ≥ 5, password ≥ 8, matching confirm).
3. Change the page to `fillForm(person: RegistrationPerson)`.
4. Happy path: `fillForm(validRegistrant)`. Negative: spread and set `email: 'invalid-email'`.
5. Store only verified error strings next to the person.

## 8. Complete Code Example

```typescript
export type RegistrationPerson = {
  firstName: string; lastName: string; email: string; phone: string;
  username: string; password: string; confirmPassword: string;
  gender: string; dateOfBirth: string; country: string;
};

export const validRegistrant: RegistrationPerson = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '1234567890',
  username: 'johndoe',
  password: 'Practice1',
  confirmPassword: 'Practice1',
  gender: 'Male',
  dateOfBirth: '1990-01-15',
  country: 'United States',
};
```

```typescript
test('invalid email is rejected', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  await registrationPage.goto();
  await registrationPage.fillForm({ ...validRegistrant, email: 'invalid-email' });
  await registrationPage.clickRegister();
  await expect(page.getByText('Invalid email format')).toBeVisible();
});
```

## 9. Line-by-Line Explanation

The type lists every slot so omitting Country is a compile error. `validRegistrant` is the happy-path person. The test spreads that person and replaces only `email`. `fillForm` stays generic. The assertion uses a known message from this site, not a guessed string.

## 10. How to Run It

```bash
npx playwright test tests/01-basic/data-objects.spec.ts --headed --project=chromium
```

## 11. Expected Result

Valid object → **Registration Successful**. Invalid email override → **Invalid email format**. TypeScript errors if you forget a field on a new object.

## 12. Common Beginner Mistakes

- Optional fields on the type “to make tests easier,” then skipping Gender by accident.
- Overriding password but not confirmPassword when testing length.
- Asserting unproven messages. Empty confirm-password required is **not** a verified empty-submit message.

## 13. How to Debug It

If TypeScript complains, you missed a property. If the negative test still succeeds, the override did not reach `fillForm`. Log `person.email` once. If length tests fail, confirm username ≥ 5 and password ≥ 8 on the base object.

## 14. Best Practices

Export the type. Export one valid constant. Use spread for negatives. Store verified error strings next to the person, not in random specs.

## 15. What NOT to Do

Do not keep `'John'` inside the page after this lesson. Do not use `any`. Do not add a second full person object for each negative case when an override will do.

## 16. Hands-On Exercise

Add a case: `{ ...validRegistrant, username: 'ab' }` and assert **Username must be at least 5 characters**.

## 17. Challenge Exercise

Add `uniqueRegistrant()` that copies `validRegistrant` but sets `email` and `username` using `Date.now()`. Use it on the happy path so parallel runs would not share one identity.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. What does `RegistrationPerson` give you?
2. How do you make an invalid-email person without copying nine fields?
3. What success title does the happy path use?
4. Which empty-submit message must you **not** invent for Confirm Password?

<details>
<summary>Answers</summary>

1. A typed shape so missing form fields are caught before the test runs.
2. `{ ...validRegistrant, email: 'invalid-email' }`.
3. Registration Successful.
4. A required message; Confirm Password does not show one when the whole form is empty.

</details>

## 19. Interview Questions

1. How do TypeScript types improve test data quality?
2. What is object spread used for in negative UI tests?
3. How would you grow this into a data-driven table of registration errors?

## 20. Architect's Notes

Grow this into a table of `{ name, override, errorText }`. Keep person construction out of page objects. Prefer `uniqueRegistrant()` over hidden randomness inside `fillForm`.

## 21. Next Lesson

Continue with [Lesson 19](19-multiple-data-sets.md). Interview answers live in [interview-answers.md](../interview-answers.md).
