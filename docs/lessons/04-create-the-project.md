# Lesson 04 — Create the Project

## 1. What You Will Learn

You will see how a new Playwright TypeScript project is created with `npm init playwright@latest`. You will also learn that **this repository is already initialized**, so you install dependencies instead of running the wizard from scratch.

## 2. Why This Matters in Real Projects

**Problem:** people run the init wizard inside a folder that already has Playwright and overwrite config.

**Why it hurts:** tests, scripts, and `playwright.config.ts` get replaced or duplicated.

**Simple solution:** know both paths — greenfield (`npm init playwright@latest`) and this course repo (`npm install`).

**Enterprise version:** new hires clone a template repo. They almost never run init on a live suite.

## 3. Concept in Plain English

`npm init playwright@latest` asks questions (TypeScript or JavaScript, where tests live, GitHub Actions) and writes a starter folder. **This course folder already has that work done.** You clone or download it, install packages, and install browsers.

## 4. Real-Life Analogy

Buying a new apartment means signing a lease and buying furniture (init). Moving into a furnished classroom means bringing your backpack and sitting down (`npm install`). This repo is the furnished classroom.

## 5. Prerequisites

[Lesson 03](03-install-development-tools.md). `node -v` and `npm -v` work. You are in the `playwrightAutomationTutorialTS` folder.

## 6. Files We Will Create or Modify

Already present: `package.json`, `playwright.config.ts`, `tests/`. You will create `node_modules/` by installing. You will **not** create those files again.

## 7. Step-by-Step Instructions

**Path A — this course (do this):**

1. Open Terminal and `cd` into this project folder.
2. Run `npm install`.
3. Run `npx playwright install chromium`.
4. Run a quick test in Lesson 05.

**Path B — a brand new folder (know this, do not run it on top of this repo):**

```bash
mkdir my-playwright-class && cd my-playwright-class
npm init playwright@latest
```

Choose TypeScript, tests in `tests`, and GitHub Action if you want CI. Then `npx playwright install`.

## 8. Complete Code Example

Commands for **this** repo:

```bash
cd ~/Desktop/toGithub/playwrightAutomationTutorialTS
npm install
npx playwright install chromium
npx playwright test tests/basic/registration-heading.spec.ts --project=chromium
```

The init wizard you would use **elsewhere**:

```bash
npm init playwright@latest
```

## 9. Line-by-Line Explanation

`cd` puts you in the project. `npm install` reads `package.json` and fills `node_modules`. `npx playwright install chromium` downloads the browser Playwright drives. The last line runs one small form test that already exists so you know the engine works.

## 10. How to Run It

Run Path A commands in order. Stay in the project root (the folder that contains `package.json`).

## 11. Expected Result

`npm install` finishes without errors. Chromium installs. The heading test **passes** and opens the GITS registration form.

## 12. Common Beginner Mistakes

- Running `npm init playwright@latest` **inside this repo** and accepting overwrites.
- Running `npm install` in the wrong directory.
- Forgetting `npx playwright install`, then seeing “browser not found.”

## 13. How to Debug It

If install fails, check the internet and Node version. If tests say the browser is missing, rerun `npx playwright install chromium`. If Git shows lots of new files after an init wizard, you ran Path B in the wrong place; do not commit those changes.

## 14. Best Practices

Use the existing repo for this course. Use `npm init playwright@latest` only when you start a **new** empty project. Commit `package-lock.json`. Do not commit `node_modules`.

## 15. What NOT to Do

Do not delete `playwright.config.ts` to “start clean.” Do not mix JavaScript `tests/example.spec.js` from a default wizard with this TypeScript course. Do not point `baseURL` at a different app for these lessons.

## 16. Hands-On Exercise

Run Path A. Confirm `node_modules/@playwright/test` exists. Confirm `npx playwright --version` prints a version.

## 17. Challenge Exercise

Read `package.json` scripts (`test`, `test:headed`, `test:ui`). You will use them often. Do not change them yet.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. Which command creates a **new** Playwright project from scratch?
2. Which command do you run in **this** repo after Node.js is installed?
3. Why should you not run the init wizard here?
4. What does `npx playwright install chromium` download?

<details>
<summary>Answers</summary>

1. `npm init playwright@latest`.
2. `npm install`, then install Chromium.
3. The project is already initialized; the wizard can overwrite files.
4. The Chromium browser Playwright uses for tests.

</details>

## 19. Interview Questions

1. What files does `npm init playwright@latest` typically add?
2. Why do repositories commit lockfiles but ignore `node_modules`?
3. How do you add Playwright to a repo that already has a `package.json` without using the full wizard?

## 20. Architect's Notes

Greenfield init is for empty folders. Existing products add `@playwright/test` as a dev dependency and write config by hand. Pin the Playwright version. Teach newcomers the clone-and-install path so they never regenerate a living suite.

## 21. Next Lesson

Continue with [Lesson 05](05-understand-a-playwright-test.md).
