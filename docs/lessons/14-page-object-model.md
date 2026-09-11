# Lesson 14 — Page Object Model

## 1. What You Will Learn

You will explain the Page Object Model (POM). You will create `src/pages/RegistrationPage.ts` so locators and form actions live in one class.

## 2. Why This Matters in Real Projects

**Problem:** Lesson 13 showed duplicated locators.

**Why it hurts:** a label change becomes a scavenger hunt.

**Simple solution:** one class that represents the registration screen. Tests ask the page to `goto`, `fill`, and `submit`.

**Enterprise version:** a `BasePage` for shared navigation, plus one page class per screen, reused across hundreds of tests.

## 3. Concept in Plain English

A **page object** is a helper named after a screen. It knows how to find **First Name ***, **Password *** (with `exact: true`), **Register**, and the rest. Tests stop talking to raw `page.getByRole` for that screen. They talk to `registrationPage`.

## 4. Real-Life Analogy

A receptionist knows which window is Billing. Visitors say “I need Billing,” not “third grey door, badge reader on the left.” If the door moves, only the receptionist updates the map.

## 5. Prerequisites

[Lesson 13](13-why-the-first-test-is-hard-to-maintain.md). You can describe the duplication problem.

## 6. Files We Will Create or Modify

Create `src/pages/RegistrationPage.ts`.

## 7. Step-by-Step Instructions

1. Create `src/pages/RegistrationPage.ts`.
2. Store locators on the class using `getByRole`.
3. Add `goto()`, `fillValid()`, and `clickRegister()`.
4. Keep most assertions in tests; `heading.waitFor()` after load is enough.

## 8. Complete Code Example

```typescript
import { type Locator, type Page } from '@playwright/test';

export class RegistrationPage {
  readonly heading: Locator;
  readonly firstName: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly registerButton: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Registration Form' });
    this.firstName = page.getByRole('textbox', { name: 'First Name *' });
    this.password = page.getByRole('textbox', { name: 'Password *', exact: true });
    this.confirmPassword = page.getByRole('textbox', { name: 'Confirm Password *' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async goto() {
    await this.page.goto('https://gitsuniversity.org/practice/registration-form/');
    await this.heading.waitFor();
  }

  async clickRegister() {
    await this.registerButton.click();
  }
}
```

Add Last Name, Email, Phone Number, Username, Gender, Date of Birth, Country, and the terms checkbox the same way.

## 9. Line-by-Line Explanation

The class holds locators so Password’s `exact: true` is written once. `constructor` receives Playwright’s `page`. `goto` hides the URL. `clickRegister` hides the button. Tests will call these methods instead of repeating roles.

## 10. How to Run It

A page object does not run alone. Lesson 15 wires a spec. Import it and run `npx playwright test tests/01-basic --project=chromium`.

## 11. Expected Result

TypeScript finds `RegistrationPage`. Locators compile. Existing learning tests still pass until you switch them over.

## 12. Common Beginner Mistakes

- Putting `expect` success logic only inside the page so tests become empty and reports lose meaning.
- Using CSS for every field after being asked to prefer `getByRole`.
- Forgetting `exact: true` on Password inside the page class.

## 13. How to Debug It

If a method “does nothing,” you forgot `await` in the test. If Password fills Confirm, the page object is missing `exact: true`.

## 14. Best Practices

One page class per screen. Locators as `readonly` fields. Actions as `async` methods named like user intent (`clickRegister`). Prefer roles.

## 15. What NOT to Do

Do not create `RegistrationPage2`. Do not pass `page` into every method if the class already stores it. Do not import test data before Lesson 17–18 unless you keep it tiny.

## 16. Hands-On Exercise

Add locators for Email, Phone Number, Username, Gender, Country, Date of Birth, and the terms checkbox to `RegistrationPage`.

## 17. Challenge Exercise

Add `async fillFirstName(value: string)` and use it from a tiny experiment spec. Feel how the test reads.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. What file path should the page object use?
2. Why does the password locator belong in the page class?
3. What method should hide the form URL?
4. Should tests still use `getByRole` for every field after POM?

<details>
<summary>Answers</summary>

1. `src/pages/RegistrationPage.ts`.
2. So `exact: true` and the name live in one place.
3. `goto()`.
4. No. They should call the page object.

</details>

## 19. Interview Questions

1. What is the Page Object Model, and what problem does it solve?
2. What belongs in a page object versus in a test?
3. How does POM improve maintainability when a label changes?

## 20. Architect's Notes

Keep pages as locators plus user actions. Keep story assertions in tests. Split dense widgets in Lesson 16. Do not grow a 2,000-line god page.

## 21. Next Lesson

Continue with [Lesson 15](15-refactor-basic-test-into-pom.md).
