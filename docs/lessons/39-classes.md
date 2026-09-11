# Lesson 39 — Classes

## 1. What You Will Learn
- See a **class** as a page robot with locators + methods.
- Construct `new RegistrationPage(page)`.
- Keep `this.firstName` as a named Locator.

## 2. Why This Matters in Real Projects
A class is how Page Object Model is usually written in TypeScript. One `RegistrationPage` owns `#registration-form-email-input`. Tests call `fillForm(registrant)` instead of hunting ids.

## 3. Concept in Plain English
A **class** is a blueprint. An **instance** is one robot attached to **this** browser tab (`page`). `this.firstName` means “the first-name box on that tab.”

## 4. Real-Life Analogy
A job title “registration clerk” (the class) vs Ada on Monday’s shift (the instance). The clerk always knows where the email box is. Ada uses **today’s** desk (the `page`).

## 5. Prerequisites
- [Lesson 38](38-interfaces.md) and [Lesson 24](24-playwright-fixtures.md).

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `src/pages/registration.page.ts` | `class RegistrationPage` |
| `src/keywords/registrationKeywords.ts` | Class of business steps |
| `src/fixtures/test.fixture.ts` | `new RegistrationPage(page)` |

## 7. Step-by-Step Instructions
1. `export class RegistrationPage { constructor(private readonly page: Page) {} }`.
2. Assign locators in the constructor: `this.firstName = page.locator('#registration-form-firstname-input')`.
3. Add methods: `goto`, `fillForm`, `clickRegister`.
4. Fixture constructs one instance per test.
5. Tests never `new` the page if the fixture already does.

## 8. Complete Code Example

```typescript
import { type Locator, type Page } from '@playwright/test';

export class RegistrationPage {
  readonly firstName: Locator;
  readonly email: Locator;
  readonly registerButton: Locator;

  constructor(readonly page: Page) {
    this.firstName = page.locator('#registration-form-firstname-input');
    this.email = page.locator('#registration-form-email-input');
    this.registerButton = page.locator('#registration-form-submit-button');
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstName.fill(firstName);
  }

  async clickRegister(): Promise<void> {
    await this.registerButton.click();
  }
}

test('class types John @registration', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  await page.goto('/practice/registration-form/');
  await registrationPage.fillFirstName('John');
  await expect(registrationPage.firstName).toHaveValue('John');
});
```

## 9. Line-by-Line Explanation
- `class RegistrationPage` — blueprint for the form screen.
- `readonly firstName: Locator` — named locator, not a raw string at call sites.
- `constructor` — wire locators to **this** `page`.
- `this.firstName.fill` — instance uses its own boxes.
- `new RegistrationPage(page)` — one robot; fixtures do this for you.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.spec.ts --project=chromium
```

## 11. Expected Result
John appears in the first-name box. Other specs using the fixture never see `new` — but the class still ran.

## 12. Common Beginner Mistakes
- Creating the class once at module load with a dead `page`.
- Putting `expect` for every field inside the constructor.
- A “God class” that also does login, email, and API calls.

## 13. How to Debug It
If locators are undefined, `super`/`constructor` did not run. Log `await this.firstName.getAttribute('id')`. Use `--debug` and inspect `this.email`.

## 14. Best Practices
- One page class per screen.
- Keywords class **uses** the page class (Lesson 23).
- `BasePage` for shared `goto` helpers if many screens exist.

## 15. What NOT to Do
Do not inherit a jungle of pages to share one locator. Do not store test data as class statics that parallel workers overwrite. Do not skip `readonly` and reassign locators mid-test.

## 16. Hands-On Exercise
Add `readonly username: Locator` and `fillUsername(username: string)` to your class.

## 17. Challenge Exercise
Add `async fillRegistrant(person: RegistrationPerson)` that fills first name and email from the interface.

## 18. Knowledge Check / Quiz
1. What is the difference between a class and an instance?
2. What does `this` refer to in `fillFirstName`?
3. Who should `new RegistrationPage` in a large suite?

### Answers
1. Class = blueprint; instance = robot tied to one `page`.
2. That instance (those locators).
3. Usually a fixture, not every spec.

## 19. Interview Questions
1. How does POM map to TypeScript classes?
2. When would you use a component class vs a page class?
3. How do keyword classes differ from page classes?

## 20. Architect's Notes
Classes package **behavior + locators**. Data stays in interfaces/factories. The last TypeScript lesson is why almost every method here is `async` and why tests `await` them — Playwright never fills a box instantly.

## 21. Next Lesson
[Lesson 40 — Async and Await](40-async-await.md)
