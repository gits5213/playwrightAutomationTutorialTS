# Lesson 03 — Install Development Tools

## 1. What You Will Learn

You will install Node.js, a code editor, and Git enough to open this course. You will confirm each tool with a short command. You will not create the Playwright project yet; that is Lesson 04.

## 2. Why This Matters in Real Projects

**Problem:** Playwright cannot start if Node.js is missing.

**Why it hurts:** you copy commands from a guide and every one fails, so you think Playwright is broken.

**Simple solution:** install the runtime first, then the editor, then confirm versions.

**Enterprise version:** onboarding docs list exact LTS Node versions so laptops match CI.

## 3. Concept in Plain English

You need three things on your machine:

1. **Node.js** (includes **npm**) to run Playwright.
2. **Visual Studio Code** or Cursor to read `.ts` files with red squiggles when a name is wrong.
3. **Git** to later save work. This folder is already a Git repository.

Browsers for tests are installed in Lesson 04 with `npx playwright install`.

## 4. Real-Life Analogy

Before you bake, you plug in the oven and buy a mixing bowl. You do not start the recipe yet. Node.js is the power. The editor is the bowl. Lesson 04 is mixing the batter.

## 5. Prerequisites

[Lesson 02](02-technology-stack.md). Permission to install programs. Internet access.

## 6. Files We Will Create or Modify

None in the project. You only install programs on your computer.

## 7. Step-by-Step Instructions

1. Open [https://nodejs.org](https://nodejs.org) and install the **LTS** version with default options.
2. Open Terminal (Mac) or a terminal in your editor.
3. Run `node -v` and `npm -v`. You should see version numbers.
4. Install [Visual Studio Code](https://code.visualstudio.com/) or use Cursor, which you may already have.
5. Optional: install the **Playwright** extension in the editor so locators are easier to explore later.
6. Confirm Git with `git -v` or `git --version`. If it is missing, install Git from [https://git-scm.com](https://git-scm.com).

## 8. Complete Code Example

These are commands, not a test file:

```bash
node -v
npm -v
git --version
```

After Lesson 04 you will also run:

```bash
npx playwright --version
```

## 9. Line-by-Line Explanation

`node -v` prints the JavaScript runtime version. `npm -v` prints the package installer. `git --version` prints Git. If any command says “not found,” that tool is not on your PATH yet. Restart the terminal after installing Node.js.

## 10. How to Run It

Type each command in a new terminal window so it sees the new PATH. Press Enter after each line. Do not type the `$` if a website shows `$ node -v`.

## 11. Expected Result

Three version numbers. Exact digits can differ. LTS Node is typically 20 or 22 in this era. npm is bundled with Node.

## 12. Common Beginner Mistakes

- Installing Node, then using an old terminal that still cannot find `node`.
- Installing a random “Java” JDK because the word JavaScript looks similar. You need **Node.js**.
- Skipping LTS and picking a cutting-edge nightly build.

## 13. How to Debug It

Close all terminals and open a new one. On a Mac, if `node` is still missing, the installer may not have finished; run it again. Do not proceed to `npm init playwright` until `node -v` works.

## 14. Best Practices

Use LTS Node. Keep the editor’s terminal, not a hidden one from last week. Sign in to GitHub later only when you need to push; you do not need that for Lesson 04.

## 15. What NOT to Do

Do not install Playwright with a random global command yet. Do not change npm’s default registry unless your company requires it. Do not store passwords in test files.

## 16. Hands-On Exercise

Create a folder note (paper or a comment) with your three version numbers. You will compare them if a classmate’s install behaves differently.

## 17. Challenge Exercise

In the editor, open this project folder (`playwrightAutomationTutorialTS`). Confirm you can see `package.json` in the file tree.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. Which installer comes with Node.js?
2. Should you install Playwright browsers before Node.js?
3. Why restart the terminal after installing Node?
4. Which Node release should beginners pick?

<details>
<summary>Answers</summary>

1. npm.
2. No. Node.js first.
3. So it picks up the new PATH.
4. LTS (long-term support).

</details>

## 19. Interview Questions

1. Why does Playwright require Node.js?
2. What is LTS, and why do teams prefer it for test machines?
3. How would you verify a new laptop is ready for Playwright work?

## 20. Architect's Notes

Document the Node version in onboarding (`.nvmrc` or a README). CI should use the same major version. Editors are personal; the **commands** must be the same. Never assume a GUI install modified PATH until a fresh shell prints `node -v`.

## 21. Next Lesson

Continue with [Lesson 04](04-create-the-project.md).
