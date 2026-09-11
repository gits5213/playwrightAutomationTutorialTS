# Lesson 35 — Arrays

## 1. What You Will Learn
- Store many locator names or error messages in an **array**.
- Loop with `for...of` in tests (Lesson 19 again, now with types).
- Use `string[]` so every item is text.

## 2. Why This Matters in Real Projects
Required-field errors are a **list**: first name, email, username. An array plus a loop is how data-driven tests stay short. A typo in one message is one row to fix.

## 3. Concept in Plain English
An **array** is an ordered list: item 0, item 1, item 2. `['John', 'Ada']` is two first names. `locatorNames[0]` is the first locator string.

## 4. Real-Life Analogy
A roll-call list of students. The order matters. You do not need a separate sticky note per name if they share the same check (“is present?”).

## 5. Prerequisites
- [Lesson 34](34-primitive-types.md) and [Lesson 19](19-multiple-data-sets.md).

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `src/data/registration-error-cases.ts` | Array of error rows |
| `src/data/registration.data.ts` | Related messages |

## 7. Step-by-Step Instructions
1. Write square brackets: `const firstNames: string[] = ['John', 'Ada']`.
2. Prefer `for (const row of rows)` over index soup when you only need items.
3. Keep **homogeneous** lists (all strings, or all error-row objects).
4. Do not put locators and passwords in the same untyped list.
5. Each data-driven test should still be created **outside** a single `test` when you want separate report rows.

## 8. Complete Code Example

```typescript
const locatorNames: string[] = [
  '#registration-form-firstname-input',
  '#registration-form-email-input',
  '#registration-form-username-input',
];

const requiredMessages: string[] = [
  'First name is required',
  'Email is required',
  'Username is required',
];

test('required inputs are visible @smoke @registration', async ({ page }) => {
  await page.goto('/practice/registration-form/');
  for (const locatorName of locatorNames) {
    await expect(page.locator(locatorName)).toBeVisible();
  }
});
```

## 9. Line-by-Line Explanation
- `string[]` — every element is a string (a locator name or a message).
- `locatorNames` — ids for first name, email, username.
- `for (const locatorName of locatorNames)` — one visibility check per field.
- `page.locator(locatorName)` — turns the string into a Locator.
- Error cases in the repo are an array of **objects** (next lesson), not only strings.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.data-driven.spec.ts --project=chromium
```

## 11. Expected Result
Each listed field is visible, or each error row fails/passes on its own in the data-driven spec. Adding a locator name to the array adds coverage without a new function body if you loop.

## 12. Common Beginner Mistakes
- `locatorNames[1]` mix-ups (arrays start at 0).
- Looping **inside** one `test` for negative cases you wanted as separate report lines.
- `any[]` so a `boolean` sneaks in.

## 13. How to Debug It
`console.log(locatorNames.length)`. If one locator fails, run with the id hard-coded to confirm the page. Check spelling of `#registration-form-email-input`.

## 14. Best Practices
- Type the array: `string[]` or a row type.
- Name lists in the plural: `requiredMessages`, `locatorNames`.
- Data-driven **rows** as objects when each item has `name` + `errorText`.

## 15. What NOT to Do
Do not use arrays as a junk drawer. Do not store `Locator` objects from a previous test in a module-level array (stale page). Do not confuse `string[]` with a single concatenated string.

## 16. Hands-On Exercise
Add `'#registration-form-phone-input'` to `locatorNames` and re-run the visibility loop.

## 17. Challenge Exercise
Zip messages with fields: an array of `{ field: 'email', text: 'Email is required' }` and assert `registrationPage.error('email')`.

## 18. Knowledge Check / Quiz
1. What does `string[]` mean?
2. Why `for...of` over a copied test per locator?
3. Index of the first locator name?

### Answers
1. An array whose items are all strings.
2. One behavior, many examples; less copy-paste.
3. `0`.

## 19. Interview Questions
1. How do arrays enable data-driven Playwright tests?
2. When should an array of strings become an array of objects?
3. What isolation issue appears if you cache Locators in a global array?

## 20. Architect's Notes
Arrays of primitives are for simple lists (ids, messages). The moment each example needs a **firstName and email together**, you want objects (Lesson 36) and then a `RegistrationPerson` interface (Lesson 38).

## 21. Next Lesson
[Lesson 36 — Objects](36-objects.md)
