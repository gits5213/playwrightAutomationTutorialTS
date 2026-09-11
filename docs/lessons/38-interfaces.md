# Lesson 38 — Interfaces

## 1. What You Will Learn
- Describe a registrant with an **interface** (or `type`).
- Let the editor reject `fristName` and missing `email`.
- Share the shape between data, factory, and `fillForm`.

## 2. Why This Matters in Real Projects
JSON will not stop a missing `username`. An interface is a contract: every valid person has `firstName`, `email`, `password`. Playwright tests stay aligned with `RegistrationPage.fillForm(person: RegistrationPerson)`.

## 3. Concept in Plain English
An **interface** is a checklist of keys and their primitive types. It is not a running person. It is the **shape** a person object must match.

## 4. Real-Life Analogy
A blank registration form (the paper). The interface is the blank. `{ firstName: 'John', ... }` is one filled-in copy. The office rejects a paper with no email box filled.

## 5. Prerequisites
- [Lesson 36](36-objects.md) and [Lesson 37](37-functions.md).

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `src/data/registration.data.ts` | `RegistrationPerson` type/interface |
| `src/pages/registration.page.ts` | `fillForm(person: RegistrationPerson)` |
| `src/factories/registrationDataFactory.ts` | Returns that shape |

## 7. Step-by-Step Instructions
1. Declare `interface RegistrationPerson { ... }` (this repo also uses `export type` — same idea for beginners).
2. List every form value you need: names, email, phone, username, passwords, gender, date, country.
3. Annotate `fillForm(person: RegistrationPerson)`.
4. Use `Partial<RegistrationPerson>` for overrides (`{ email: 'invalid-email' }`).
5. Do not put `locatorName` on the person in production — locators are not registrant data.

## 8. Complete Code Example

```typescript
interface RegistrationPerson {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
  dateOfBirth: string;
  country: string;
}

const registrant: RegistrationPerson = {
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

async function fillForm(page: Page, person: RegistrationPerson): Promise<void> {
  await page.locator('#registration-form-firstname-input').fill(person.firstName);
  await page.locator('#registration-form-email-input').fill(person.email);
}
```

## 9. Line-by-Line Explanation
- `interface RegistrationPerson` — the contract.
- Each field `string` — what `fill` types.
- `const registrant: RegistrationPerson` — object must include every key.
- `fillForm(..., person: RegistrationPerson)` — only a full person compiles.
- Missing `email` in the object = editor error, not a blank box in CI.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.spec.ts --project=chromium
```

## 11. Expected Result
`fillForm` types John and the email. If you delete `username` from the object, TypeScript fails **before** the browser opens.

## 12. Common Beginner Mistakes
- Optional `email?` “to make tests easier” — then success tests forget it.
- Adding `heading: Locator` onto `RegistrationPerson`.
- Duplicating the interface in every spec instead of importing one.

## 13. How to Debug It
Read “Property 'email' is missing.” Add the key. If JSON import does not match, validate or use a mapper (Lesson 20).

## 14. Best Practices
- One domain interface in `src/data/`.
- `Partial<>` for negative overrides, not for the happy path type.
- `Pick<RegistrationPerson, 'email' | 'username'>` when success asserts only some fields.

## 15. What NOT to Do
Do not use `interface` for one boolean. Do not export twenty tiny interfaces for every spec. Do not type `person: any`.

## 16. Hands-On Exercise
Add `middleName?: string` only if the **form** has it. If not, do not add it — keep the interface honest.

## 17. Challenge Exercise
Type `KeywordStep` as `{ keyword: 'ENTER_FIRST_NAME'; value: string }` (Lesson 23) using an interface or union.

## 18. Knowledge Check / Quiz
1. Does an interface run in the browser by itself?
2. What does `Partial<RegistrationPerson>` mean?
3. Where should `RegistrationPerson` live?

### Answers
1. No. It is erased at compile time; it only checks your code.
2. Every key becomes optional — good for overrides.
3. Shared data module, imported by page, factory, and tests.

## 19. Interview Questions
1. When do you prefer `interface` vs `type` in TypeScript tests?
2. How do interfaces prevent data-driven row mistakes?
3. How do `Pick` and `Partial` show up in page-object APIs?

## 20. Architect's Notes
The interface is the **bounded context** of registration data. Classes (next) implement behavior: locators + methods. Do not mix “who the person is” with “how the page clicks” in one interface.

## 21. Next Lesson
[Lesson 39 — Classes](39-classes.md)
