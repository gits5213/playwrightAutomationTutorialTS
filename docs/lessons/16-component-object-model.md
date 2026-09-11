# Lesson 16 — Component Object Model

## 1. What You Will Learn

You will split a reusable piece of the registration screen into a **component object**. You will see when a page is enough and when a component is better.

## 2. Why This Matters in Real Projects

**Problem:** `RegistrationPage` grows every locator and every small widget (terms row, success panel, date field).

**Why it hurts:** the page class becomes a junk drawer. Two screens that share a widget copy locators again.

**Simple solution:** a small class for a repeating widget, owned by the page.

**Enterprise version:** design system components (datepicker, modal, nav) each have one component object used by many pages.

## 3. Concept in Plain English

A **component object** is POM for a *part* of a page. On this form, the terms row is a good first component: checkbox **I agree to the Terms and Conditions *** plus link **Terms and Conditions**. The success panel (**Registration Successful** and a way to register again) is another.

## 4. Real-Life Analogy

A car manual does not reprint “how a seatbelt works” in every chapter. Seatbelt is a component. The registration **page** is the car. Terms is the seatbelt.

## 5. Prerequisites

[Lesson 15](15-refactor-basic-test-into-pom.md). You have a working `RegistrationPage`.

## 6. Files We Will Create or Modify

Create `src/pages/components/TermsBlock.ts`. Modify `src/pages/RegistrationPage.ts` to use it.

## 7. Step-by-Step Instructions

1. Create `src/pages/components/`.
2. Write `TermsBlock` with `checkbox` and `link` locators scoped from the page (or a root locator).
3. Add `accept()` that checks the box.
4. On `RegistrationPage`, replace the raw terms locator with `readonly terms: TermsBlock`.
5. Call `this.terms.accept()` from `fillValid()`.
6. Keep field locators on the page; do not over-split every textbox into its own class.

## 8. Complete Code Example

```typescript
import { type Locator, type Page } from '@playwright/test';

export class TermsBlock {
  readonly checkbox: Locator;
  readonly link: Locator;

  constructor(page: Page) {
    this.checkbox = page.getByRole('checkbox', {
      name: 'I agree to the Terms and Conditions *',
    });
    this.link = page.getByRole('link', { name: 'Terms and Conditions' });
  }

  async accept() {
    await this.checkbox.check();
  }
}
```

On the page: `this.terms = new TermsBlock(page);` and `await this.terms.accept();` inside `fillValid()`.

## 9. Line-by-Line Explanation

The component stores the two terms controls that belong together. `accept()` is the user intent. The page no longer needs to know the long checkbox name. Tests still call `registrationPage.fillValid()`, not the component, unless a test is specifically about the link.

## 10. How to Run It

```bash
npx playwright test tests/01-basic/fill-with-pom.spec.ts --project=chromium
```

Behavior must match Lesson 15.

## 11. Expected Result

Happy path still shows **Registration Successful**. Terms locators live in `TermsBlock.ts`. A test about the link can use `registrationPage.terms.link`.

## 12. Common Beginner Mistakes

- Creating a component per textbox (`FirstNameComponent`). That is noise.
- Letting tests import `TermsBlock` and ignore the page.
- Duplicating the checkbox locator in both classes.

## 13. How to Debug It

If terms errors persist, `accept()` was not called. If the link click opens a new tab, your test needs to handle the new page; this lesson only needs `accept()`.

## 14. Best Practices

Extract a component when a widget has two or more locators or is reused. Pass a root locator if the same widget appears twice. Keep the page as the tests’ front door.

## 15. What NOT to Do

Do not rename POM to “COM” in interviews without explaining it. Component objects sit *inside* page objects. Do not split Gender into a component unless a custom dropdown becomes complex.

## 16. Hands-On Exercise

Extract a `SuccessPanel` component with the success title text **Registration Successful**. Use it in the POM test assertion via `registrationPage.success.title`.

## 17. Challenge Exercise

Write a test that clicks the **Terms and Conditions** link using the component. Assert that a document or URL related to terms appears. If the live page only stays on the same screen, assert the link is visible and enabled instead. Do not invent navigation.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. What is a component object?
2. Why are terms a better component than First Name?
3. Should tests usually talk to the component or the page?
4. What is over-splitting?

<details>
<summary>Answers</summary>

1. A class for a reusable piece of a screen.
2. It groups a checkbox and a link with one user intent: accept terms.
3. The page, except when the test is about that widget.
4. A class per single textbox with no extra behavior.

</details>

## 19. Interview Questions

1. When do you extract a component object from a page object?
2. How do you scope locators if two identical widgets exist on one page?
3. How do page objects and component objects work together in a large suite?

## 20. Architect's Notes

Component objects scale when the product has a design system. Mirror the UI hierarchy: page → region → control. Avoid a deep inheritance tree. Prefer composition (`RegistrationPage` has a `TermsBlock`). Shared nav bars belong in a component used by every page, not copied.

## 21. Next Lesson

Continue with [Lesson 17](17-why-hardcoded-test-data-is-a-problem.md).
