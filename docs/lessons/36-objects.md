# Lesson 36 — Objects

## 1. What You Will Learn
- Group a registrant’s fields in one **object**.
- Read `registrant.email` and `registrant.firstName`.
- Pass the object into `fillForm`.

## 2. Why This Matters in Real Projects
Loose variables (`firstName`, `email`, `username`) get out of order. One object is one person. Page objects in this repo already take `RegistrationPerson` — that is an object type.

## 3. Concept in Plain English
An **object** is a labeled bundle: `{ firstName: 'John', email: 'john.doe@example.com' }`. Labels are **keys**. You do not remember that “the third string was the email.”

## 4. Real-Life Analogy
A student ID card: photo, name, id number together. You hand the card to the office, not five sticky notes.

## 5. Prerequisites
- [Lesson 35](35-arrays.md).
- `fillForm` on `RegistrationPage`.

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `src/data/registration.data.ts` | `validRegistrant` object |
| `src/pages/registration.page.ts` | Consumes the object |

## 7. Step-by-Step Instructions
1. Write curly braces with `key: value` pairs.
2. Keys match the form: `firstName`, `locatorName` if you bundle a locator string.
3. Pass the whole registrant into helpers.
4. Override one key with a spread: `{ ...registrant, country: 'Canada' }`.
5. Arrays of objects = data-driven rows.

## 8. Complete Code Example

```typescript
const registrant = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  username: 'johndoe',
  locatorName: '#registration-form-firstname-input',
};

test('fills from a registrant object @registration', async ({ registrationPage }) => {
  await registrationPage.firstName.fill(registrant.firstName);
  await registrationPage.email.fill(registrant.email);
  await expect(registrationPage.page.locator(registrant.locatorName)).toHaveValue('John');
});

const ada = { ...registrant, firstName: 'Ada', email: 'ada@example.com' };
```

## 9. Line-by-Line Explanation
- `registrant` — one person plus an optional `locatorName` for teaching.
- `.firstName` / `.email` — read a labeled field.
- `fill(registrant.firstName)` — types `John`.
- `locatorName` — still a string id, now sitting next to the person (in real code, locators stay on the page object).
- `...registrant` — copy, then change `firstName` to Ada.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.spec.ts --project=chromium
```

## 11. Expected Result
The first-name box shows `John` (or `Ada` if you filled `ada`). `validRegistrant` in the repo behaves the same way with more keys (`gender`, `country`).

## 12. Common Beginner Mistakes
- `registrant[0]` — objects are not arrays (unless you meant a list of people).
- Typo `fristName` — with an interface (Lesson 38) TypeScript catches it.
- Putting `heading` Locator inside the data object and reusing it after navigation.

## 13. How to Debug It
`console.log(registrant.email)`. If it is `undefined`, the key is misspelled. Compare to `validRegistrant` in `registration.data.ts`.

## 14. Best Practices
- Data objects hold **values**; page objects hold **locators**.
- `locatorName` in this lesson is for learning keys — prefer `registrationPage.firstName` in real tests.
- Spread to override one field for `@negative` cases.

## 15. What NOT to Do
Do not build one mega-object for the whole app (login + cart + registrant). Do not mutate a shared `validRegistrant` in parallel tests — copy first (`{ ...validRegistrant }`).

## 16. Hands-On Exercise
Add `phone: '1234567890'` to your object and fill `registrationPage.phone`.

## 17. Challenge Exercise
Make `const people = [registrant, ada]` and loop two fill tests (Lesson 19 + objects).

## 18. Knowledge Check / Quiz
1. How do you read the email from `registrant`?
2. What does `{ ...registrant, firstName: 'Ada' }` do?
3. Should locators live on the data object in production tests?

### Answers
1. `registrant.email`.
2. Copies the person and changes first name.
3. No. Keep locators on `RegistrationPage`.

## 19. Interview Questions
1. Why pass a registrant object into `fillForm` instead of ten arguments?
2. How do object spreads help negative testing?
3. How do you stop tests from mutating shared data objects?

## 20. Architect's Notes
Objects without a declared shape still allow extra keys and typos until you add an **interface** or **type**. That is Lesson 38. Functions (next) are how `fillForm(person)` becomes reusable.

## 21. Next Lesson
[Lesson 37 — Functions](37-functions.md)
