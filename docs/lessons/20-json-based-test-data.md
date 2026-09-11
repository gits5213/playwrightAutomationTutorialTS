# Lesson 20 — JSON-Based Test Data

## 1. What You Will Learn
- Load registration people from a `.json` file.
- Import JSON into a TypeScript spec and loop it like Lesson 19.
- Decide when JSON helps — and when a `.ts` file is safer.

## 2. Why This Matters in Real Projects
Sometimes a product owner wants to add a registrant without opening TypeScript. JSON is a plain list they can edit. Teams still need types, unique emails, and locators in code. JSON is **optional**, not automatically better.

## 3. Concept in Plain English
**JSON** is a text file of names and values. Playwright/TypeScript can `import` it. The test still does the clicking. The file only holds **data** (first name, email), never button ids.

## 4. Real-Life Analogy
A paper guest list at a party: names and emails only. The host (your test) still greets people and seats them. The guest list is not the kitchen.

## 5. Prerequisites
- [Lesson 19](19-multiple-data-sets.md) — loops outside `test()`.
- Comfort with a registrant: `firstName`, `email`, `username`.

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `src/data/registration-users.json` | Optional list of people |
| `src/data/registration.data.ts` | TypeScript type the JSON should match |
| `tests/e2e/registration.json-data.spec.ts` | Spec that imports the JSON |

## 7. Step-by-Step Instructions
1. Create `src/data/registration-users.json` with an array of people.
2. Keep the same field names as `RegistrationPerson`.
3. Import the file in a spec (`import users from '...json'`).
4. Loop **outside** `test()` with a readable name per row.
5. Fill the form from the row. Do not put locators in JSON.

## 8. Complete Code Example

```json
[
  {
    "name": "John from the United States",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.json@example.com",
    "phone": "1234567890",
    "username": "johnjson",
    "password": "Practice1",
    "confirmPassword": "Practice1",
    "gender": "Male",
    "dateOfBirth": "1990-01-15",
    "country": "United States"
  }
]
```

```typescript
import { test, expect } from '../../src/fixtures';
import users from '../../src/data/registration-users.json';

for (const row of users) {
  test(`fills form for ${row.name} @registration`, async ({ registrationPage }) => {
    await registrationPage.fillForm(row);
    await expect(registrationPage.firstName).toHaveValue(row.firstName);
  });
}
```

## 9. Line-by-Line Explanation
- JSON array — a list of registrant objects.
- `"name"` — label for the report, not a form field.
- `import users from '...json'` — load the list at start time.
- `fillForm(row)` — page object types into `#registration-form-firstname-input` and friends.
- This example **fills** only. Submitting success accounts needs `RUN_REGISTRATION_SUBMISSION=true` later.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.json-data.spec.ts --project=chromium
```

## 11. Expected Result
One passing test per JSON person. The first name box shows `John`. No success screen unless you later opt in to submit.

## 12. Common Beginner Mistakes
- A trailing comma after the last JSON property (JSON forbids it; TypeScript allows it).
- Typos like `firstnme` — JSON will not warn you; TypeScript data files will.
- Putting `#registration-form-email-input` inside the JSON.

## 13. How to Debug It
If import fails, check `tsconfig` `resolveJsonModule`. If a field is empty, log `row` with `console.log(row)`. Compare keys to `RegistrationPerson` in `registration.data.ts`.

## 14. Best Practices
- Use JSON when non-coders own the list.
- Keep a TypeScript type and treat JSON as untyped input.
- Prefer `.ts` data when the team is all engineers — types catch mistakes early.

## 15. What NOT to Do
Do not assume JSON is “more professional.” Do not store passwords for real systems in JSON committed to Git. Do not drive locators from JSON strings.

## 16. Hands-On Exercise
Add a second person (`Ada`, country `Canada`) to `registration-users.json`. Run again. You wrote no new `test()` function.

## 17. Challenge Exercise
After import, map JSON through a helper that checks required keys exist before `fillForm`. If `email` is missing, fail with a clear message.

## 18. Knowledge Check / Quiz
1. Does JSON give you TypeScript type errors for a misspelled `username`?
2. Should locators live in JSON?
3. When is a `.ts` data file better than JSON?

### Answers
1. No. JSON is untyped until you validate it.
2. No. Locators stay in the page object.
3. When the people who edit data are comfortable with TypeScript, or when you need types and helper functions.

## 19. Interview Questions
1. Compare JSON, CSV, and TypeScript modules as test-data sources.
2. How do you keep JSON data from drifting away from your domain type?
3. When would you refuse to put test data in JSON?

## 20. Architect's Notes
JSON is a **transport** for examples, not an architecture. This course uses TypeScript first (`registration.data.ts`) because beginners get editor warnings. Add JSON when a non-coder must edit rows. Never let JSON replace page objects or a factory for unique emails.

## 21. Next Lesson
[Lesson 21 — Test Data Factory](21-test-data-factory.md)
