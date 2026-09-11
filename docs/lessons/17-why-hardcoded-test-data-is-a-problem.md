# Lesson 17 — Why Hardcoded Test Data Is a Problem

## 1. What You Will Learn

You will see why typing `'John'`, `'Practice1'`, and `'john.doe@example.com'` inside `fillValid()` becomes a second duplication problem, even after POM.

## 2. Why This Matters in Real Projects

**Problem:** locators are centralized, but every method still hides magic values.

**Why it hurts:** changing the sample person, making emails unique, or building a negative override means editing action code. Testers who only want new data must touch `RegistrationPage.ts`.

**Simple solution:** treat data as an object the test (or a data file) owns. The page only types whatever it is given.

**Enterprise version:** factories, unique stamps, and environment-specific users — still not strings sprinkled in locators.

## 3. Concept in Plain English

**Hardcoded test data** is a value baked into code, like `fill('John')` inside the page. POM fixed **where** Email is. It did not fix **who** is registering. Negative tests need the same person with one field wrong. That is painful if John only exists inside `fillValid()`.

## 4. Real-Life Analogy

A mail-merge letter that has “Dear John” painted on the printer is not a template. A real template says “Dear {firstName}.” The printer should not own the customer list.

## 5. Prerequisites

[Lesson 16](16-component-object-model.md). `fillValid()` still contains literal strings.

## 6. Files We Will Create or Modify

Read `src/pages/RegistrationPage.ts`. You will extract data in Lesson 18. Here you only mark the strings.

## 7. Step-by-Step Instructions

1. Open `fillValid()` (or the Lesson 09 spec if you still have literals there).
2. Highlight every name, email, phone, username, password, date, and country.
3. Notice Password and Confirm Password must stay in sync. Hardcoding both twice is a bug farm.
4. Imagine two tests needing two people. You would copy `fillValid` or add `fillValid2`.
5. Write the rule: **pages type; tests (or data modules) decide the values.**

## 8. Complete Code Example

The problem:

```typescript
async fillValid() {
  await this.firstName.fill('John');
  await this.email.fill('john.doe@example.com');
  await this.password.fill('Practice1');
  await this.confirmPassword.fill('Practice1');
}
```

The direction (next lesson implements it fully):

```typescript
async fillForm(person: { firstName: string; email: string; password: string; confirmPassword: string }) {
  await this.firstName.fill(person.firstName);
  await this.email.fill(person.email);
  await this.password.fill(person.password);
  await this.confirmPassword.fill(person.confirmPassword);
}
```

## 9. Line-by-Line Explanation

The first block hides John inside an action named “valid,” so invalid email tests cannot reuse the typing sequence cleanly. The second block takes a `person`. Matching passwords become a data concern: set both fields in one object.

## 10. How to Run It

Do not change behavior yet. Rerun the POM happy path to keep a baseline:

```bash
npx playwright test tests/01-basic/fill-with-pom.spec.ts --project=chromium
```

## 11. Expected Result

Tests still pass. You have a list of hardcoded values to move. You know `fillValid()` should become `fillForm(person)` plus a default person.

## 12. Common Beginner Mistakes

- Creating `fillInvalidEmail()` that copies all ten fills. That multiplies data and locators-in-spirit.
- Using a real production email.
- Generating a random password in one field and not the confirm field.

## 13. How to Debug It

If mismatch errors appear after a “tiny” password edit, you changed only one of the two hardcoded strings. That is evidence they should be one object.

## 14. Best Practices

One default valid person. Overrides for negatives. Unique emails when the app would collide. Keep secrets out of the repo.

## 15. What NOT to Do

Do not read data from a live production database for this practice form. Do not put passwords in environment variables yet if they are just `Practice1` on a public demo. Do not keep John in both the page and the test.

## 16. Hands-On Exercise

Write on paper a person record with all form fields. Circle which fields negatives will override (email, username, password, phone).

## 17. Challenge Exercise

Try to describe “invalid phone” without repeating the nine valid fields. If you cannot, you need a base person plus an override. That is Lesson 18.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. What is hardcoded test data?
2. Why is POM not enough by itself?
3. Why are password and confirm password a data problem?
4. Who should own the values: the page or a data object?

<details>
<summary>Answers</summary>

1. Literal values baked into code, such as `'John'` inside `fillValid()`.
2. It centralizes locators, not the person being typed.
3. They must stay in sync; two literals drift.
4. A data object (or the test that passes it in).

</details>

## 19. Interview Questions

1. What risks come from hardcoded test data in UI tests?
2. How do you reuse one valid user for many negative cases?
3. When should test users be unique per run?

## 20. Architect's Notes

Separate **object under test** (the page) from **data**. Pages accept types; modules export fixtures. Uniqueness (`Date.now()` in an email) is a scalability concern when tests run in parallel. This practice form may not persist accounts, but the habit still matters. Never mix locator changes and data changes in a way reviewers cannot see.

## 21. Next Lesson

Continue with [Lesson 18](18-typescript-test-data-objects.md).
