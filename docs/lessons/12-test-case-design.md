# Lesson 12 — Test Case Design

## 1. What You Will Learn

You will design a small set of registration cases before you write more code. You will choose coverage that is enough to catch real bugs without repeating the same click path ten ways.

## 2. Why This Matters in Real Projects

**Problem:** people automate whatever they think of in the moment.

**Why it hurts:** gaps (no empty country) and duplicates (three tests that all only check First Name).

**Simple solution:** write a table of cases first: name, data, expected result.

**Enterprise version:** the table becomes typed fixtures and data-driven tests.

## 3. Concept in Plain English

A **test case** is one row: what you do, with what data, and what should happen. Design means picking rows that represent **classes** of behavior: all empty, one invalid field, all valid.

Suggested starter set for this form:

| Case | Data | Expect |
| --- | --- | --- |
| Page loads | none | Heading Registration Form |
| All empty | empty | Required messages listed in Lesson 11 |
| Invalid email | `invalid-email` | Invalid email format |
| Short username | fewer than 5 chars | Username min 5 message |
| Short password | fewer than 8 chars | Password min 8 message |
| Mismatch | two different passwords | Passwords must match |
| Invalid phone | not a valid phone | Invalid phone |
| Happy path | complete valid person | Registration Successful |

## 4. Real-Life Analogy

A cooking class does not test every brand of salt. It tests “no salt,” “too much salt,” and “the amount in the recipe.” Those three classes catch most mistakes.

## 5. Prerequisites

[Lesson 11](11-positive-vs-negative-testing.md). You know positive vs negative.

## 6. Files We Will Create or Modify

Create `tests/01-basic/test-cases.md` for your table, or keep the table in notes. Code can wait.

## 7. Step-by-Step Instructions

1. Copy the table above into your notes.
2. Open the live form and confirm each expected message still matches. Do not invent extras.
3. Mark which cases you already automated.
4. Pick the next case that is missing.
5. Only then write a spec.

## 8. Complete Code Example

A case can be a TypeScript object you will reuse in Lesson 18:

```typescript
const shortUsername = {
  name: 'username shorter than 5 characters',
  username: 'ab',
  expectedError: 'Username must be at least 5 characters',
};
```

Use that `expectedError` in `expect(page.getByText(shortUsername.expectedError)).toBeVisible()`.

## 9. Line-by-Line Explanation

`name` is what the report should say. `username` is the one bad value. `expectedError` is the verified string. Designing the object first keeps the test honest: you cannot “forget” what success means.

## 10. How to Run It

There is nothing new to run until you code a missing row. Rerun your existing `tests/01-basic/` specs to see which rows are already green.

```bash
npx playwright test tests/01-basic --project=chromium
```

## 11. Expected Result

You have a written list. Every automated test maps to a row. Empty rows are planned work, not surprise ideas during a demo.

## 12. Common Beginner Mistakes

- Adding cases for rules the page does not implement.
- Ten tests that all fill the same valid user.
- Skipping empty Country or empty Gender because “the happy path is enough.”

## 13. How to Debug It

If two tests fail the same way, they may be duplicate cases. If a bug escapes, add a row that would have caught it, then automate that row.

## 14. Best Practices

Cover each required field at least once on empty submit. Cover each known format rule once. Keep the happy path as a smoke test.

## 15. What NOT to Do

Do not design 200 combinatorial rows (every country × every gender). Do not automate a case you cannot explain in one sentence.

## 16. Hands-On Exercise

Write six cases in a table, including empty terms and mismatched passwords. Tick which ones you can already run.

## 17. Challenge Exercise

Add a case: valid data but terms unchecked. Expected: **You must accept the terms and conditions**. Automate it.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. What three parts does a test case include?
2. Why not test every country option?
3. What should you do before inventing a new error string?
4. Which case is the happy path?

<details>
<summary>Answers</summary>

1. Action, data, expected result.
2. They are the same class of behavior: choosing a valid country.
3. Confirm it on the live page.
4. Complete valid person → Registration Successful.

</details>

## 19. Interview Questions

1. What is equivalence partitioning, in beginner words?
2. How do you decide the minimum set of form tests before a release?
3. What is a smoke test versus a full regression set?

## 20. Architect's Notes

Case design is a product conversation, not a coding trick. Architects map cases to layers: smoke in CI on every commit, deeper negatives nightly. Data-driven tests should start from this table, not from copy-paste specs. Traceability (“this test exists because of this rule”) is the enterprise habit.

## 21. Next Lesson

Continue with [Lesson 13](13-why-the-first-test-is-hard-to-maintain.md).
