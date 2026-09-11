# Lesson 02 — The Technology Stack

## 1. What You Will Learn

You will name each tool in this course and what job it does. You will see how Node.js, npm, TypeScript, and Playwright fit together when you test the registration form.

## 2. Why This Matters in Real Projects

**Problem:** beginners mix up “the language,” “the runner,” and “the browser.”

**Why it hurts:** when something breaks, you install the wrong fix or edit the wrong file.

**Simple solution:** learn a four-layer picture: runtime, packages, language, test tool.

**Enterprise version:** teams pin versions so every laptop and every CI machine run the same stack.

## 3. Concept in Plain English

- **Node.js** runs JavaScript on your computer, not only in a web page.
- **npm** installs packages. Playwright is a package.
- **TypeScript** is JavaScript with labels. Files end in `.ts`. The editor warns you before you run a bad name.
- **Playwright** opens a real browser and follows your test.
- **Chromium** is the browser engine we use while learning (it behaves like Chrome).

The registration form is still a normal website. These tools only visit it.

## 4. Real-Life Analogy

Node.js is the kitchen power outlet. npm is the store where you buy appliances. TypeScript is labeled measuring cups. Playwright is the cook. Chromium is the oven. The registration form is the recipe you are checking.

## 5. Prerequisites

[Lesson 01](01-what-is-test-automation.md). You know what an automated test is for.

## 6. Files We Will Create or Modify

We will only **read** these later: `package.json` (what is installed), `playwright.config.ts` (how tests run), and files ending in `.spec.ts` (the tests).

## 7. Step-by-Step Instructions

1. Remember: you do not test TypeScript. You write tests **in** TypeScript.
2. Remember: npm does not test the form. It only installs Playwright.
3. Remember: Playwright does not host the form. The form already lives at `https://gitsuniversity.org/practice/registration-form/`.
4. When a command starts with `npx`, it means “run a package from this project.”

## 8. Complete Code Example

A tiny TypeScript test still needs the Playwright import:

```typescript
import { test, expect } from '@playwright/test';

test('stack smoke check', async ({ page }) => {
  await page.goto('https://gitsuniversity.org/practice/registration-form/');
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});
```

`package.json` will list `@playwright/test` under `devDependencies`. That is the library the import above uses.

## 9. Line-by-Line Explanation

The `import` line pulls `test` and `expect` from the Playwright package. `test(...)` registers one check. `page` is Playwright’s tab. `getByRole` finds the **Register** button the way a screen reader would, not by a secret CSS class.

## 10. How to Run It

After install (next two lessons):

```bash
node -v
npm -v
npx playwright --version
```

You want three version numbers, not “command not found.”

## 11. Expected Result

Node and npm print versions. Playwright prints its version. You are ready to install remaining tools and open this project.

## 12. Common Beginner Mistakes

- Installing Playwright globally and then wondering why this folder’s tests differ.
- Confusing the website (the product) with Playwright (the checker).
- Skipping TypeScript because it “looks extra.” The labels save you later.

## 13. How to Debug It

If `npx playwright` fails, you are probably not in the project folder, or `npm install` has not been run. If Node is missing, install Node.js first, not Playwright first.

## 14. Best Practices

Use the versions this project pins. Stay inside the project directory when you run npm commands. Prefer one browser (Chromium) until tests are stable.

## 15. What NOT to Do

Do not mix several Node versions without a reason. Do not hand-edit `package-lock.json`. Do not point tests at a random site when the course uses the GITS form.

## 16. Hands-On Exercise

On paper, draw four boxes: Node.js, npm, TypeScript, Playwright. Write one sentence under each: what it does for the registration tests.

## 17. Challenge Exercise

Open `package.json` in this repo (after Lesson 04) and find the `@playwright/test` version. That number is the Playwright you are learning.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. Which tool opens the real browser?
2. Which file lists installed packages?
3. Why does this course use TypeScript?
4. Where does the registration form run?

<details>
<summary>Answers</summary>

1. Playwright.
2. `package.json`.
3. Labels catch wrong names before you run the test.
4. On the live GITS site, not inside Playwright.

</details>

## 19. Interview Questions

1. What is the role of Node.js in a Playwright project?
2. Why do teams commit `package-lock.json`?
3. What is the difference between a test runner and the application under test?

## 20. Architect's Notes

Pin the Playwright version. Run the same browser engines in CI that you run locally. Keep product URLs in config or env, not copied from memory into fifty files. This course still hardcodes the form URL at first so beginners can see it, then later moves URLs and data into shared files.

## 21. Next Lesson

Continue with [Lesson 03](03-install-development-tools.md).
