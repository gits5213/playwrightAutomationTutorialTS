# Lesson 33 — TypeScript Variables

## 1. What You Will Learn
- Store a first name, an email, and a locator name in variables.
- Choose `const` vs `let`.
- Use those values in a Playwright fill.

## 2. Why This Matters in Real Projects
If `John` is typed in five tests, changing the demo person is painful. A variable is a **named box**. Registration data (`validRegistrant.firstName`) is how this repo already avoids magic strings.

## 3. Concept in Plain English
A **variable** holds a value you can reuse. `const firstName = 'John'` means the box `firstName` contains the text John. Playwright then types that box into the first-name field.

## 4. Real-Life Analogy
A name sticker on a student’s folder. You write “John” once on the sticker. Every teacher reads the sticker instead of guessing.

## 5. Prerequisites
- Lessons [19](19-multiple-data-sets.md)–[32](32-html-reporting.md) in this folder help, but you can start here if you can open a `.ts` file.
- The form: [registration form](https://gitsuniversity.org/practice/registration-form/).

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `src/data/registration.data.ts` | `validRegistrant` constants |
| A small spec or the factory | Uses `const` for email and locator names |

## 7. Step-by-Step Instructions
1. Prefer `const` unless you will reassign the box.
2. Name boxes after the domain: `firstName`, `emailLocator`, `registrant`.
3. Pass them into `fill`, not raw `'John'` everywhere.
4. Do not name variables `x`, `data1`, or `foo`.
5. Reassign only with `let` (for example a `username` you stamp later).

## 8. Complete Code Example

```typescript
const firstName = 'John';
const lastName = 'Doe';
const emailLocator = '#registration-form-email-input';
let username = 'johndoe';
username = `user${Date.now()}`.slice(0, 16);

test('types the registrant first name @registration', async ({ page }) => {
  await page.goto('/practice/registration-form/');
  await page.locator('#registration-form-firstname-input').fill(firstName);
  await page.locator(emailLocator).fill('john.doe@example.com');
  await expect(page.locator('#registration-form-firstname-input')).toHaveValue(firstName);
});
```

## 9. Line-by-Line Explanation
- `const firstName = 'John'` — cannot point this box at a new string later.
- `emailLocator` — the **name of the locator string**, reused if you query twice.
- `let username` — we **replace** the value with a unique stamp.
- `.fill(firstName)` — types whatever is in the box.
- `toHaveValue(firstName)` — assert using the same box, not a second copy of `'John'`.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.spec.ts --project=chromium
```

## 11. Expected Result
The first-name box shows `John`. If you change `firstName` to `Ada` and re-run a fill assertion that uses the variable, both the type and the check stay in sync.

## 12. Common Beginner Mistakes
- Using `let` for values you never change.
- Calling a locator `thing` instead of `emailLocator` or `firstName`.
- Reassigning `const firstName` (TypeScript error — that is good).

## 13. How to Debug It
Hover in the editor: you should see type `string`. If fill types `undefined`, the variable was never set. `console.log({ firstName, username })` before fill.

## 14. Best Practices
- `const` by default.
- Names from the form: `confirmPassword`, `country`.
- Group related values in an object next lesson-but-one (Lesson 36).

## 15. What NOT to Do
Do not use `var`. Do not store a Playwright `Locator` in a loop-unsafe `let` without understanding closures — keep locators on the page object.

## 16. Hands-On Exercise
Create `const headingName = 'Registration Form'` and assert `getByRole('heading', { name: headingName })`.

## 17. Challenge Exercise
Use `let email` starting as `john.doe@example.com`, then reassign to a stamped factory email before fill.

## 18. Knowledge Check / Quiz
1. When do you use `const`?
2. Why name a box `emailLocator` instead of `x`?
3. Can you reassign `const firstName`?

### Answers
1. When the variable will not be pointed at a new value.
2. Testers can read the intent next to `#registration-form-email-input`.
3. No. Use `let` if you must replace it.

## 19. Interview Questions
1. How do you decide between `const` and `let` in test code?
2. Why are magic strings a maintainability problem in UI tests?
3. How do variables relate to test-data factories?

## 20. Architect's Notes
Variables are the smallest reuse tool. The next step is **types** (what kind of thing is in the box: text vs yes/no). After that, arrays of error rows and a `registrant` object scale better than a pile of loose `const`s.

## 21. Next Lesson
[Lesson 34 — Primitive Types](34-primitive-types.md)
