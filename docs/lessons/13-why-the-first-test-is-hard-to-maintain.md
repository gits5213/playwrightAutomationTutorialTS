# Lesson 13 — Why the First Test Is Hard to Maintain

## 1. What You Will Learn

You will see why the long Lesson 09 spec becomes expensive. You will count how many files would change if **Email *** were relabeled. You will feel the problem before POM is offered as the fix.

## 2. Why This Matters in Real Projects

**Problem:** every test repeats `getByRole('textbox', { name: 'Email *' })` and the same ten `fill` lines.

**Why it hurts:** a label change, a new required field, or a URL change means hunting through every spec. Teams stop trusting the suite because updates take longer than the product change.

**Simple solution:** notice duplication first. Do not add more copy-paste tests.

**Enterprise version:** locators live in one page class; data lives in objects; tests only tell the story.

## 3. Concept in Plain English

**Maintainability** means a product change causes a small, obvious test change. The first test is correct and still hard to maintain because knowledge is **scattered**. The Email locator, the valid password, and the success title are mixed together in one file, then copied.

## 4. Real-Life Analogy

If every recipe in a binder repeats “the red pan in the third cupboard,” and you move the pan, you must edit every recipe. If recipes say “use the sauce pan,” you update the kitchen map once.

## 5. Prerequisites

[Lesson 12](12-test-case-design.md). You have more than one registration spec, or you can imagine five copies of Lesson 09.

## 6. Files We Will Create or Modify

Read `tests/01-basic/fill-registration-form.spec.ts`. Do not refactor yet. Lesson 15 will.

## 7. Step-by-Step Instructions

1. Open the fill spec.
2. Count locator strings (First Name, Email, Password, Register, …).
3. Imagine five specs with the same locators.
4. Imagine the designer changes **Phone Number *** to **Mobile ***.
5. Write down how many lines you would edit. That number is the pain.
6. Circle the values `John`, `Practice1`, `1990-01-15`. Those are data, not locators, mixed into the same file.

## 8. Complete Code Example

This is the **problem** shape, not the goal:

```typescript
await page.getByRole('textbox', { name: 'Email *' }).fill('john.doe@example.com');
await page.getByRole('textbox', { name: 'Password *', exact: true }).fill('Practice1');
await page.getByRole('button', { name: 'Register' }).click();
await expect(page.getByText('Registration Successful')).toBeVisible();
```

Copied into ten files, `Email *` and `Practice1` become ten future edits.

## 9. Line-by-Line Explanation

Line 1 mixes **where** Email is with **what** to type. Line 2 hides a locator rule (`exact: true`) that every author must remember. Line 3 repeats the button. Line 4 repeats the success contract. None of these belong in every story file.

## 10. How to Run It

Rerun the learning fill test. It should still pass. Passing is not the same as maintainable.

```bash
npx playwright test tests/01-basic/fill-registration-form.spec.ts --project=chromium
```

## 11. Expected Result

The test is green. Your notes say: locators duplicated, data duplicated, success text duplicated. You are ready for a page object.

## 12. Common Beginner Mistakes

- Adding more specs by copying Lesson 09.
- “Fixing” maintainability with comments instead of one shared place.
- Jumping to a huge framework before you can name the duplication.

## 13. How to Debug It

When a locator breaks, search the repo for the accessible name. If the same string appears in many specs, you have found the maintainability bug, even if tests still pass today.

## 14. Best Practices

When you need the same fill twice, stop copying. One learning file is allowed. A family of product tests is not. Keep `tests/01-basic/` small.

## 15. What NOT to Do

Do not delete the learning test in a panic. Do not start renaming files randomly. Do not introduce POM and data objects in the same unreadable commit if you are still learning; the next lessons do it in order.

## 16. Hands-On Exercise

Copy the Email locator into a second dummy spec (or write it twice in comments). Then change the string in only one place and watch the other go stale. That is the bug.

## 17. Challenge Exercise

List three change types: locator, test data, assertion text. For each, write whether Lesson 09 would need one edit or many.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. Why can a green test still be a maintenance problem?
2. What gets duplicated in the first fill spec?
3. What product change would break every copy of the Email locator?
4. What lesson introduces the fix?

<details>
<summary>Answers</summary>

1. Knowledge is copied, so small product changes need many test edits.
2. Locators, typed values, and success text.
3. Relabeling Email *.
4. Lesson 14 (page object model).

</details>

## 19. Interview Questions

1. What does maintainability mean for an automated suite?
2. Why is copy-paste of locators a risk?
3. How would you explain DRY to a new tester without sounding like a programmer?

## 20. Architect's Notes

The first test’s job is to prove the path. Its job is not to be the template for 500 tests. Architects budget a refactor **immediately after** the first green path: extract locators, then data, then keywords. Skipping that step is how suites die in six months.

## 21. Next Lesson

Continue with [Lesson 14](14-page-object-model.md).
