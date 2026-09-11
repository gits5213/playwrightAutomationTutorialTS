# Lesson 06 — Navigate to the Registration Form

## 1. What You Will Learn

You will write a test that opens the live registration form and proves the page loaded. You will save it as `tests/01-basic/page-loads.spec.ts`.

## 2. Why This Matters in Real Projects

**Problem:** people jump straight to filling fifteen fields.

**Why it hurts:** if the URL is wrong or the page never loads, every later test fails for the same reason, and the report looks like a form bug.

**Simple solution:** first test only **navigation**. Is the heading there? Is **Register** there?

**Enterprise version:** a `@smoke` load test runs first in CI so a down site is obvious.

## 3. Concept in Plain English

Navigation means “go to this address and wait until the page is usable.” For this course the address is always [https://gitsuniversity.org/practice/registration-form/](https://gitsuniversity.org/practice/registration-form/). You then check the heading **Registration Form**.

## 4. Real-Life Analogy

Before you fill out a paper form at a desk, you confirm you walked into the right office. The sign on the door is the heading.

## 5. Prerequisites

[Lesson 05](05-understand-a-playwright-test.md). Playwright and Chromium are installed.

## 6. Files We Will Create or Modify

Create `tests/01-basic/page-loads.spec.ts`.

## 7. Step-by-Step Instructions

1. Create the folder `tests/01-basic/` if it does not exist.
2. Create `page-loads.spec.ts`.
3. Import `test` and `expect`.
4. Call `page.goto` with the GITS form URL.
5. Assert the heading and the **Register** button are visible.
6. Save the file.

## 8. Complete Code Example

```typescript
import { test, expect } from '@playwright/test';

test('registration form page loads', async ({ page }) => {
  await page.goto('https://gitsuniversity.org/practice/registration-form/');

  await expect(page.getByRole('heading', { name: 'Registration Form' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'First Name *' })).toBeVisible();
});
```

## 9. Line-by-Line Explanation

The test name states the story: the page loads. `goto` requests the URL. The heading check proves you are on the registration screen, not a 404 page. The button check proves the main action is present. The First Name textbox proves the form body rendered, not only a title.

## 10. How to Run It

```bash
npx playwright test tests/01-basic/page-loads.spec.ts --headed --project=chromium
```

## 11. Expected Result

Chromium opens the form. You see **Registration Form**, First Name, and **Register**. The run ends with **passed**.

## 12. Common Beginner Mistakes

- Typos in the URL (`gitsuniversity` is one word).
- Asserting `page.url()` equals the URL while ignoring a trailing slash mismatch. Prefer visible content.
- Putting this file outside `tests/` so Playwright never finds it.

## 13. How to Debug It

If the test times out, open the URL in your own Chrome. If you can see the heading and the test cannot, the locator name is wrong. Copy **Registration Form** exactly, including capitals.

## 14. Best Practices

Keep a dedicated load test. Use `getByRole`. Add `--headed` while learning. Use `--project=chromium` so only one browser runs.

## 15. What NOT to Do

Do not fill fields in this file. Do not click **Register** yet. Stay on the GITS registration form.

## 16. Hands-On Exercise

Add an assertion that the textbox **Email *** is visible. Rerun the file.

## 17. Challenge Exercise

Add `test.describe('registration form', () => { ... })` around the test so the report groups this story. Keep a single test inside it for now.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. What file path should this lesson use?
2. What heading proves the form loaded?
3. Why check **Register** on a load test?
4. What Playwright function opens a URL?

<details>
<summary>Answers</summary>

1. `tests/01-basic/page-loads.spec.ts`.
2. Registration Form.
3. The main action of the page is present.
4. `page.goto`.

</details>

## 19. Interview Questions

1. Why separate a smoke “page loads” test from a full form-submit test?
2. What should you assert after `goto` to know navigation succeeded?
3. How does `test.describe` help a growing suite?

## 20. Architect's Notes

Load tests should be cheap and independent. Tag them `@smoke`. When the site is down, fail fast. Do not combine load with data setup. Later, `RegistrationPage.goto()` will wrap this URL so the string lives in one place.

## 21. Next Lesson

Continue with [Lesson 07](07-understanding-web-elements.md).
