# Playwright Test Automation with TypeScript

A step-by-step class for people who are **not** professional programmers.

You will learn how to write checks (called **tests**) that open a real browser, click and type like a person, and tell you if a website still works.

You will also learn the three ideas that keep a test suite healthy as it grows:

| Idea | Everyday meaning |
| --- | --- |
| **Maintainability** | When the website changes, you fix the tests in **one place**, not in fifty files. |
| **Reusability** | You write a useful step **once** (login, fill a form) and use it in many tests. |
| **Scalability** | The suite can grow from 5 tests to 500 without becoming slow, messy, or fragile. |

Go in order. Each part builds on the last.

1. **Part 1 — Basic:** install tools, write a first test, find buttons, check results.
2. **Part 2 — Advanced:** stop copying steps, share setup, keep data and environments clean.
3. **Part 3 — Architectural:** fold everything into a structure teams use in real companies.

You do **not** need to be a TypeScript expert. TypeScript here is a safety net: the editor warns you when a name is wrong, before the test even runs.

---

## How to use this guide

1. Read one lesson at a time.
2. When a lesson says **Try it**, do that before you move on.
3. If a word is confusing, jump to [Words you will see a lot](#words-you-will-see-a-lot).
4. If you forget a command, jump to [Cheatsheet](#cheatsheet).

Set aside about **20–30 minutes per lesson**.

This folder is already a working project. You do not start from a blank directory. After Node.js is installed (Lesson 2):

```bash
cd ~/Desktop/toGithub/playwrightAutomationTutorialTS
npm install
npx playwright install chromium
npx playwright test
```

You should see **8 passed**. Then read the lessons in order. When a lesson says **Try it**, run the matching file from the table below.

Practice site used in the examples:

[https://demo.playwright.dev/todomvc](https://demo.playwright.dev/todomvc)

Open that link once in Chrome. You will see a to-do list. That is the page the first tests will use.

### Practice files

| When you are in | Open this | What it shows |
| --- | --- | --- |
| Part 1 | [tests/basic/first-test.spec.ts](tests/basic/first-test.spec.ts) | Smallest possible test |
| Part 1 | [tests/basic/add-todo.spec.ts](tests/basic/add-todo.spec.ts) | Arrange, act, assert |
| Part 2 | [src/pages/todo.page.ts](src/pages/todo.page.ts) | Page Object (selectors in one place) |
| Part 2 | [src/pages/components/todo-item.component.ts](src/pages/components/todo-item.component.ts) | A reusable widget |
| Part 2 | [src/fixtures/todo.fixture.ts](src/fixtures/todo.fixture.ts) | Shared setup without copy-paste |
| Part 2 | [src/data/todos.data.ts](src/data/todos.data.ts) | Titles kept in one place |
| Parts 2–3 | [tests/e2e/todo.spec.ts](tests/e2e/todo.spec.ts) | Short tests that use the page object |
| Part 2 | [tests/api/demo-site.spec.ts](tests/api/demo-site.spec.ts) | A check with no browser |
| Part 3 | [playwright.config.ts](playwright.config.ts) | The control room |
| Part 3 | [examples/auth.setup.example.ts](examples/auth.setup.example.ts) | Login-once pattern (template) |
| Part 3 | [.github/workflows/playwright.yml](.github/workflows/playwright.yml) | Run tests on every change |

---

## Words you will see a lot

| Word | Everyday meaning |
| --- | --- |
| **Test** | One named checklist. Example: “User can add a to-do.” |
| **Pass** | “Yes, that was correct.” Green. |
| **Fail** | “No, that was not what we expected.” Red. Useful. It means “look here.” |
| **Suite** | A group of tests, often one folder or one file. |
| **Locator** | How a test finds a box, button, or heading on the page. |
| **Assertion** | A check. “This heading should be visible.” |
| **Page Object** | A named helper that knows one screen of the app (login page, cart page). |
| **Fixture** | A ready-made ingredient Playwright hands your test (a browser tab, a logged-in user). |
| **Flaky test** | A test that sometimes passes and sometimes fails with no code change. Treat this as a bug. |
| **CI** | A robot computer that runs your tests on every change (GitHub Actions is one example). |
| **TypeScript** | JavaScript with labels on the data, so mistakes show up early. Files end in `.ts`. |
| **Terminal** | A window where you type commands, then press Enter. On a Mac: **Terminal**. |

---

# Part 1 — Basic

**Goal:** you can install Playwright, write a small test, run it, and explain a pass or fail.

**The industry habit you start here:** test what a **person** can see and do. Do not chase hidden CSS class names.

---

## Lesson 1 — What is Playwright?

**Time:** about 10 minutes  
**You will:** explain Playwright in everyday words  
**You need:** nothing installed yet

### The simple version

**Playwright is a helper that opens a real browser, follows a checklist, and tells you if each item is true.**

If the checklist item is true, it says **PASS**.  
If the checklist item is not true, it says **FAIL**.

People use it to check that a website still works after a change: a new button, a new page, a bug fix.

### A kitchen picture

Think of a recipe:

1. Open the kitchen (the browser)
2. Walk to the counter (go to a web page)
3. Add an ingredient (type in a box)
4. Press the oven button (click)
5. Check that the cake is there (assertion)

A **test** is one recipe.  
A **step** is one line in the recipe.  
**Playwright** is the cook who follows the recipe and reports back.

You write the recipe in a file that ends with `.spec.ts`. Then you ask Playwright to run it.

### Why TypeScript?

TypeScript is still the same recipe. It just labels the bowls:

- “this is a page”
- “this is a button”
- “this function needs an email”

If you pass a banana where an email is required, the editor complains **before** you run the test. That is maintainability: fewer surprises later.

### What this course will not do yet

Part 1 does not build a company-sized framework. You will write small, clear tests first.

That is on purpose. First you learn the shape of a test. Reuse and architecture come in Parts 2 and 3.

### Check that you got it

Before Lesson 2, you should be able to say:

> Playwright opens a browser, follows steps I write in a `.spec.ts` file, and each test either passes or fails.

If that sentence makes sense, you are ready.

**Next:** Lesson 2 — Install the tools

---

## Lesson 2 — Install the tools

**Time:** about 20 minutes  
**You will:** get Node.js, Playwright, and browsers on your computer  
**You need:** internet, and permission to install programs

### Step 1 — Install Node.js

Playwright runs on **Node.js**, which is a way to run JavaScript on your computer.

1. Open [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version (the stable one)
3. Install it with the default options

To check it worked, open Terminal and run:

```bash
node -v
npm -v
```

You should see version numbers, like `v20.11.0` and `10.2.4`. The exact numbers can differ.

### Step 2 — Open this project

In Terminal, go to this folder:

```bash
cd ~/Desktop/toGithub/playwrightAutomationTutorialTS
```

`package.json` is already here. Think of it as a shopping list of tools this project uses.

### Step 3 — Install Playwright and a browser

```bash
npm install
npx playwright install chromium
```

`npm install` downloads the tools named in `package.json`.  
`npx playwright install chromium` downloads the Chrome-like browser Playwright will drive. You do not have to click it yourself.

The first time can take a few minutes. That is normal.

### Step 4 — Confirm it works

```bash
npx playwright --version
npx playwright test
```

The second command runs the tests in this folder. You want to see tests **passed**.

Then open the HTML report:

```bash
npx playwright show-report
```

A page opens in your browser. Green means pass. Red means fail.

Optional: watch only the first lesson’s test in a real window:

```bash
npx playwright test tests/basic/first-test.spec.ts --headed
```

### If something goes wrong

| What you see | What to try |
| --- | --- |
| `node: command not found` | Install Node.js, close Terminal, open a new one, try again. |
| `npx: command not found` | Same as above. `npx` comes with Node.js. |
| Browser download failed | Check internet. Run `npx playwright install chromium`. |
| `Playwright does not support chromium on mac13` | This project pins Playwright **1.57**, which still supports macOS 13. Stay on that version, or upgrade macOS. |
| Permission errors on Mac | Do not use `sudo` unless you know why. Reinstall Node.js with the official installer. |

### Check that you got it

You are ready for Lesson 3 when `npx playwright test` ran and you opened the report.

**Next:** Lesson 3 — Your first test

---

## Lesson 3 — Your first test

**Time:** about 20 minutes  
**You will:** write a tiny test that opens a page and checks a heading  
**You need:** Lesson 2 finished

### What a test looks like

Open [tests/basic/first-test.spec.ts](tests/basic/first-test.spec.ts):

```typescript
import { test, expect } from '@playwright/test';

test('the to-do page shows a heading', async ({ page }) => {
  await page.goto('/todomvc');

  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
});
```

Read it as English:

1. Import the tools named `test` and `expect`.
2. Name one checklist: **the to-do page shows a heading**.
3. Open the to-do page.
4. Check that a heading called “todos” is visible.

`async` and `await` mean “wait until this step finishes before doing the next one.” Browsers are slow compared with computers. Waiting is normal.

`{ page }` is a **fixture**. Playwright hands you a fresh browser tab. You did not create it yourself. That is already a bit of reusability.

### Try it

```bash
npx playwright test tests/basic/first-test.spec.ts
```

You want **1 passed**.

Watch it in a real window:

```bash
npx playwright test tests/basic/first-test.spec.ts --headed
```

Slow it down so you can see each step:

```bash
npx playwright test tests/basic/first-test.spec.ts --headed --slow-mo=400
```

### Why this is already a good habit

- The test checks something a person can see (a heading).
- It does not mention CSS classes or hidden IDs.
- It has a name that explains the **business** outcome, not “test1”.

That is maintainability in miniature: the next reader understands *why* this test exists.

### Check that you got it

You are ready for Lesson 4 when you can change the heading name to a wrong word, run the test, see it **fail**, then put it back and see it **pass**.

**Next:** Lesson 4 — How a test file is written

---

## Lesson 4 — How a test file is written

**Time:** about 15 minutes  
**You will:** read a `.spec.ts` file without panic  
**You need:** Lesson 3

### The shape of every test

Almost every Playwright test has the same four parts:

```text
1. Import      →  bring in test and expect
2. Arrange     →  open a page, maybe log in
3. Act         →  click, type, submit
4. Assert      →  check the result
```

People call this **Arrange, Act, Assert**. It is an industry standard. It keeps a test easy to read.

### A slightly richer example lives in [tests/basic/add-todo.spec.ts](tests/basic/add-todo.spec.ts):

```typescript
import { test, expect } from '@playwright/test';

test('a person can add one to-do item', async ({ page }) => {
  // Arrange
  await page.goto('/todomvc');

  // Act
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  // Assert
  await expect(page.getByTestId('todo-title')).toHaveText('Buy milk');
});
```

### Rules that keep files readable

| Do | Do not |
| --- | --- |
| One idea per test | Ten unrelated checks in one test |
| Name the outcome | Name the clicks (`clickButton1`) |
| Keep steps in order | Hide important clicks in comments only |
| Let Playwright wait | Sprinkle `waitForTimeout(5000)` everywhere |

Hard sleeps (`waitForTimeout`) are a common beginner trap. They make tests slow and flaky. Playwright already waits for buttons to be ready. Prefer that.

### Check that you got it

You should be able to point at any test and say: “this is arrange, this is act, this is assert.”

**Next:** Lesson 5 — Locators (finding things on a page)

---

## Lesson 5 — Locators

**Time:** about 25 minutes  
**You will:** find buttons and boxes the way Playwright recommends  
**You need:** Lesson 4

### The problem locators solve

A test cannot click “the blue thing on the right.” It needs a **stable way** to find an element.

If you find it by a CSS class like `button.btn-primary-xyz`, a designer can rename that class tomorrow and your test breaks. That is a maintainability failure.

Industry standard: prefer what a **user** (or a screen reader) would notice.

### The recommended order

Use this list from best to last resort:

1. **`getByRole`** — button, heading, textbox, link, checkbox
2. **`getByLabel`** — form fields with a visible label
3. **`getByPlaceholder`** — empty boxes that show hint text
4. **`getByText`** — visible text
5. **`getByTestId`** — a `data-testid` the developers added on purpose
6. CSS / XPath — only when nothing else works

Examples:

```typescript
page.getByRole('button', { name: 'Submit' });
page.getByRole('heading', { name: 'todos' });
page.getByLabel('Email');
page.getByPlaceholder('What needs to be done?');
page.getByText('Buy milk');
page.getByTestId('todo-title');
```

### Narrow the search (chaining)

A page can have many “Add” buttons. Narrow by a nearby fact:

```typescript
await page
  .getByRole('listitem')
  .filter({ hasText: 'Buy milk' })
  .getByRole('button', { name: 'Delete' })
  .click();
```

Read it as: “In the list item that contains Buy milk, click Delete.”

### Let Playwright pick the locator

```bash
npx playwright codegen https://demo.playwright.dev/todomvc
```

A browser opens. Click around. Playwright writes locators for you. Copy the good ones. Do not paste a giant recorded script into your suite forever. Recordings are a **draft**, not architecture.

### Check that you got it

Prefer `getByRole('button', { name: 'Save' })` over `.css-save-btn-2`. That one choice prevents a large share of brittle tests.

**Next:** Lesson 6 — Assertions (checking the result)

---

## Lesson 6 — Assertions

**Time:** about 15 minutes  
**You will:** check results in the way Playwright waits for the page  
**You need:** Lesson 5

### What an assertion is

An assertion is a sentence that must be true:

> The heading “todos” is visible.

If it is not true, the test fails.

### Use web-first assertions

Playwright’s `expect` **retries** until the thing appears (or time runs out). That matches real pages, which load a moment later.

```typescript
// Good — waits and retries
await expect(page.getByText('Buy milk')).toBeVisible();

// Fragile — checks once, immediately
expect(await page.getByText('Buy milk').isVisible()).toBe(true);
```

Always `await expect(...)`. Missing `await` is a common bug. Later you can add a linter rule so the editor catches it.

### Useful checks

```typescript
await expect(page).toHaveURL(/todomvc/);
await expect(page).toHaveTitle(/TodoMVC/i);
await expect(page.getByRole('textbox')).toHaveValue('');
await expect(page.getByTestId('todo-title')).toHaveCount(1);
await expect(page.getByText('Buy milk')).toBeHidden();
```

### One test, a few focused checks

It is fine to have two or three expects in one test if they prove **one story**.

It is not fine to check the header, the footer, the ads, and the checkout in the same test. When it fails, you will not know which story broke.

### Check that you got it

Assertions belong in the test (the checklist). They should wait for the page. They should prove one user story.

**Next:** Lesson 7 — Running tests and reading the report

---

## Lesson 7 — Running tests and reading the report

**Time:** about 15 minutes  
**You will:** run one test, many tests, and read HTML results  
**You need:** at least one `.spec.ts` file

### Everyday commands

```bash
npx playwright test
npx playwright test tests/basic/first-test.spec.ts
npx playwright test tests/basic/first-test.spec.ts --headed
npx playwright test --ui
npx playwright show-report
```

`--ui` opens **UI Mode**: a panel where you pick tests, watch them, and jump through time. Use it when you are learning.

### Browsers

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Industry habit: run **Chromium** while you write. Run all browsers in CI (Part 3) so customers on Safari and Firefox are covered.

### What to look at when a test fails

1. The **error message** — what was expected vs what was found
2. The **screenshot** (if enabled)
3. The **trace** — a film strip of every click (Lesson 15)

Do not guess. Open the report:

```bash
npx playwright show-report
```

### Check that you got it

You can run a file, run everything, and open the HTML report without help.

**Next:** Lesson 8 — Debugging when something fails

---

## Lesson 8 — Debugging when something fails

**Time:** about 20 minutes  
**You will:** pause a test and see what Playwright saw  
**You need:** Lesson 7

### Slow look

```bash
npx playwright test tests/basic/first-test.spec.ts --debug
```

This opens the Inspector. You step one action at a time. The page is frozen so you can inspect it.

### Trace (the film strip)

```bash
npx playwright test tests/basic/first-test.spec.ts --trace on
npx playwright show-report
```

Open the trace. You will see each click, a snapshot of the page, and network calls. This is the industry default for understanding CI failures.

### Temporary pause in code

```typescript
await page.pause();
```

The test stops and hands you the Inspector. Remove `pause()` before you share the code. Leaving it in will hang CI.

### A calm debugging order

1. Read the assertion message.
2. Run headed, or open the trace.
3. Check the locator (did the button name change?).
4. Check the URL (did the test land on the wrong page?).
5. Only then change the test.

Changing locators blindly is how suites become unmaintainable.

### Part 1 checkpoint

You can:

- install Playwright with TypeScript
- write a test with arrange / act / assert
- find elements with `getByRole` and friends
- read a pass/fail report
- debug with headed mode and traces

That is enough to be useful. It is **not** enough to stay useful at 100 tests. Part 2 is about not copying the same steps forever.

---

# Part 2 — Advanced

**Goal:** you stop copy-pasting. Tests stay short. Shared steps live in one place.

**The industry habits you add here:** Page Object Model, fixtures, isolated test data, tags, and API checks beside UI checks.

---

## Lesson 9 — Why messy tests become expensive

**Time:** about 10 minutes  
**You will:** recognize the three costs before you feel them  
**You need:** Part 1

Imagine you copy this login into 40 tests:

```typescript
await page.goto('/login');
await page.getByLabel('Email').fill('user@example.com');
await page.getByLabel('Password').fill('secret');
await page.getByRole('button', { name: 'Sign in' }).click();
```

Three months later the button is renamed **Log in**.

| Approach | What you do |
| --- | --- |
| Copy-paste | Change 40 files. Miss three. CI goes red for a week. |
| Reusable login | Change **one** function. Forty tests keep working. |

That is **maintainability**.

If two features both need login, they should call the same login, not invent two slightly different ones. That is **reusability**.

If 400 tests each log in through the slow UI, the nightly run takes hours. If they reuse a saved session, the run stays minutes. That is **scalability**.

Part 2 gives you the tools. Part 3 puts them in a folder structure a team can live with.

### Check that you got it

Copy-paste is fast on day one and expensive on day thirty. We will trade a little structure now for a lot of calm later.

**Next:** Lesson 10 — Page Object Model

---

## Lesson 10 — Page Object Model (reusability)

**Time:** about 30 minutes  
**You will:** put one screen’s knowledge in one TypeScript class  
**You need:** Lesson 9

### The idea

A **page object** is a named helper for **one screen** (or one large widget).

- It knows **how** to find fields and buttons.
- It knows **what a person can do** there (add a to-do, complete an item).
- It does **not** own the story assertion like “the user should be billed $12.” That stays in the test.

Kitchen picture: the page object is the cupboard that holds the tea tools. The test is the recipe that says “make tea, then check it is hot.”

### Why locators live in the page object

When the placeholder text changes, you update **one** line in `TodoPage`. Every test that uses `todoPage.addTodo('Buy milk')` keeps working.

That is the single most important maintainability pattern in UI automation.

### Example

The live file is [src/pages/todo.page.ts](src/pages/todo.page.ts):

```typescript
import { type Locator, type Page } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodo: Locator;
  readonly todoTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodo = page.getByPlaceholder('What needs to be done?');
    this.todoTitles = page.getByTestId('todo-title');
  }

  async goto() {
    await this.page.goto('/todomvc');
  }

  async addTodo(title: string) {
    await this.newTodo.fill(title);
    await this.newTodo.press('Enter');
  }

  async expectItemVisible(title: string) {
    await this.page.getByText(title).waitFor();
  }
}
```

A test that uses the page object without a custom fixture yet:

```typescript
import { test, expect } from '@playwright/test';
import { TodoPage } from '../src/pages/todo.page';

test('a person can add one to-do item', async ({ page }) => {
  const todoPage = new TodoPage(page);

  await todoPage.goto();
  await todoPage.addTodo('Buy milk');

  await expect(todoPage.todoTitles).toHaveText(['Buy milk']);
});
```

The test now reads like a story. The selectors are hidden in the page object.

### Industry rules for page objects

| Do | Do not |
| --- | --- |
| One class per page or major component | One giant `AllPages` class |
| Methods named as user actions (`addTodo`) | Methods named as clicks (`clickDiv3`) |
| Locators as class fields or getters | Locators copied into every test |
| Keep assertions in tests (or very small page-level waits) | Put the whole business story inside the page class |
| Shared widgets (nav bar, modal) get their own class | Duplicate the nav bar in every page |

A common debate: “Should page objects contain `expect`?”  
A practical rule for this class:

- **Tests** assert the business outcome.
- **Page objects** may wait until the page is ready (`waitFor`, `toBeVisible` on a spinner disappearing).
- Page objects should not decide “was this a successful checkout?”

### Check that you got it

If the placeholder changes, you should know **exactly one file** to edit.

**Next:** Lesson 11 — Fixtures

---

## Lesson 11 — Fixtures (shared setup without copy-paste)

**Time:** about 25 minutes  
**You will:** let Playwright hand tests a ready-made page object  
**You need:** Lesson 10

### The idea

A **fixture** is an ingredient prepared for the test, then cleaned up after.

Playwright already gives you `page`, `context`, `browser`, `request`.

You can add your own: `todoPage`, `loggedInPage`, `adminUser`.

Kitchen picture: instead of every recipe starting with “wash the pan, light the stove,” the kitchen hands you a hot pan.

### Why fixtures beat `beforeEach` copy-paste

`beforeEach` in one file is fine.  
The same `beforeEach` copied into 20 files will drift: one file logs in, another almost logs in, a third forgets.

A fixture is defined **once** and imported everywhere. That is reusability **and** maintainability.

### Example

The live file is [src/fixtures/todo.fixture.ts](src/fixtures/todo.fixture.ts):

```typescript
import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/todo.page';

type TodoFixtures = {
  todoPage: TodoPage;
};

export const test = base.extend<TodoFixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
  },
});

export { expect } from '@playwright/test';
```

Tests import it through [src/fixtures/index.ts](src/fixtures/index.ts):

```typescript
import { test, expect } from '../../src/fixtures';

test('a person can add one to-do item', async ({ todoPage }) => {
  await todoPage.addTodo('Buy milk');
  await expect(todoPage.todoTitles).toHaveText(['Buy milk']);
});
```

Notice:

- The test asks for `todoPage` by name.
- It does not call `new TodoPage(page)`.
- Setup (`goto`) happens automatically.
- Cleanup happens after `use(...)` finishes (you can add it later).

**Always import `test` and `expect` from your fixture file**, not from `@playwright/test`, once you start extending. Mixing them loses your custom fixtures.

### Isolation still matters

Each test still gets a **fresh** page by default. Tests must not depend on “the previous test already added milk.”

That is an official Playwright best practice: isolated tests are easier to debug and can run in parallel (scalability).

### Check that you got it

Fixtures are how you reuse setup without copying it. Tests stay short. Setup lives in one place.

**Next:** Lesson 12 — Test data and environments

---

## Lesson 12 — Test data and environments

**Time:** about 20 minutes  
**You will:** stop hard-coding emails and URLs in tests  
**You need:** Lesson 11

### Why this matters

A test with `https://staging.myapp.com` and `password123` baked in cannot move to another environment without a hunt-and-replace. Secrets also leak into Git.

Industry standard:

- **URLs** come from config (`baseURL`).
- **Secrets** come from environment variables, never from committed files.
- **Data** is either dedicated test accounts or generated uniquely per run.

### Base URL

`playwright.config.ts` (you already have this file):

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: process.env.BASE_URL ?? 'https://demo.playwright.dev',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

Then in code:

```typescript
await page.goto('/todomvc');
```

`/todomvc` is added to `baseURL`. Change the host in config without changing every test.

A path that starts with `/` is from the **website root**. That is why this demo uses `/todomvc`, not `/` — `/` would open `https://demo.playwright.dev/`, which is not the to-do app.

Run against another host:

```bash
BASE_URL=https://demo.playwright.dev npx playwright test
```

### Keep secrets out of Git

`.env` (do not commit real passwords):

```bash
BASE_URL=https://demo.playwright.dev
TEST_USER_EMAIL=someone@example.com
TEST_USER_PASSWORD=replace-me
```

Add `.env` to `.gitignore`. In CI, set the same names as encrypted secrets.

### Unique data for scalability

If two tests create a user named `Sam`, they will collide when they run at the same time.

```typescript
const email = `sam.${Date.now()}@example.com`;
```

Or use a library like `@faker-js/faker` for names and addresses.

Unique data is how parallel tests stay isolated. That is scalability.

### Static vs dynamic data

| Kind | Use when |
| --- | --- |
| Static account (`admin@company.test`) | Login, roles, permissions |
| Dynamic (`sam.171000@example.com`) | Sign-up, create-record, anything that must not clash |
| Fixtures / seed scripts | You need a known order in the database |

### Check that you got it

Tests should not know which server they are on. They should not contain real passwords. Data that is created during a test should be unique.

**Next:** Lesson 13 — Isolation, hooks, and tags

---

## Lesson 13 — Isolation, hooks, and tags

**Time:** about 20 minutes  
**You will:** keep tests independent and run only the slice you need  
**You need:** Lesson 12

### Isolation

Official rule: **each test owns its cookies, storage, and data.**

Do not write:

```text
Test A creates a user
Test B assumes that user exists
```

If A is skipped, B fails for a mysterious reason. If tests run in a different order, B fails. Parallel runs make this worse.

Share **functions** (login, createTodo). Do not share **side effects** between tests.

### Hooks — use sparingly

```typescript
test.beforeEach(async ({ todoPage }) => {
  await todoPage.addTodo('seed item');
});
```

`beforeEach` is fine when every test in **that file** needs the same seed.

If only half the tests need it, use a fixture or put the seed inside those tests. Hidden setup that does not apply to every test is hard to maintain.

### Tags

Tags let you run a slice: smoke, checkout, slow, mobile.

```typescript
test('add a to-do @smoke', async ({ todoPage }) => {
  await todoPage.addTodo('Buy milk');
});
```

```bash
npx playwright test --grep @smoke
```

Industry habit:

- `@smoke` — a tiny set that must pass before a release (5–15 minutes max)
- `@regression` — the full set
- `@slow` — tests you skip on pull requests if needed

This is scalability of **feedback**: developers get a fast signal, and the long suite still runs on a schedule.

### Check that you got it

Tests can run alone, in any order, in parallel. Tags decide *which* tests to run, not *how* they depend on each other.

**Next:** Lesson 14 — API tests beside UI tests

---

## Lesson 14 — API tests beside UI tests

**Time:** about 25 minutes  
**You will:** check a server without clicking the whole website  
**You need:** Lesson 13

### Why bother?

A UI test is a full meal: browser, layout, clicks, network.

An **API** test is a phone call to the kitchen: “do you have milk?” It is faster and more stable.

Industry pyramid (keep this picture):

```text
        /\
       /  \        a few UI journeys (slow, precious)
      /----\
     / API  \      many contract checks (faster)
    /--------\
   /  Unit    \    most checks in the app’s own code (fastest)
```

Use UI tests for journeys a person cares about. Use API tests to create data, or to check the server directly.

### Playwright can do both

```typescript
import { test, expect } from '@playwright/test';

test('the demo site responds', async ({ request }) => {
  const response = await request.get('https://demo.playwright.dev/todomvc');
  expect(response.ok()).toBeTruthy();
});
```

`request` is another fixture: no browser.

### A powerful reuse pattern: API setup + UI assert

Instead of signing up through 12 screens, create the user via API, then open the UI already logged in.

That keeps UI tests focused on what only the UI can prove. It also scales: API setup is seconds, not minutes.

### Do not test third parties

If your page loads Google Maps or a payment iframe you do not control, do not assert on their inner text. Mock the network, or assert only on **your** app around it.

```typescript
await page.route('**/api/third-party/**', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ ok: true }),
  });
});
```

### Check that you got it

UI proves the journey. API proves the contract and prepares data. Mixing them on purpose is a strength of Playwright.

**Next:** Lesson 15 — Waiting, traces, and flaky tests

---

## Lesson 15 — Waiting, traces, and flaky tests

**Time:** about 20 minutes  
**You will:** make tests stable without random sleeps  
**You need:** Lessons 6 and 8

### Auto-waiting is the default

When you `click()`, Playwright waits until the button is visible, enabled, and stable. You usually do **not** need extra waits.

### Prefer expecting the outcome

```typescript
await todoPage.addTodo('Buy milk');
await expect(todoPage.todoTitles).toContainText(['Buy milk']);
```

The assertion waits for the list to update. That is the official **web-first** style.

### Ban this pattern (almost always)

```typescript
await page.waitForTimeout(5000);
```

It waits even when the page was ready in 200ms. It still fails when the page needs 6 seconds. It is the number one source of slow, flaky suites.

### Traces on failure, not always

In config:

```typescript
use: {
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},
retries: process.env.CI ? 2 : 0,
```

Locally, fail fast (0 retries) so you see the bug.  
On CI, retry a couple of times for rare network blips, and keep the trace from the retry.

Retries are a **safety net**, not a fix. If a test needs retries to pass, it is still flaky. Fix the locator, the wait, or the test data.

### Part 2 checkpoint

You can:

- hide selectors in page objects
- inject those pages with fixtures
- keep URLs and secrets out of tests
- isolate tests and tag a smoke set
- use API calls for speed
- debug with traces instead of sleeps

Part 3 turns these habits into a **system** a team can grow for years.

---

# Part 3 — Architectural

**Goal:** a folder layout, config, auth, CI, and quality gates that scale.

**The industry habits you add here:** layered folders, `playwright.config.ts` as the control room, login once per role, parallel workers, sharding, and lint/typecheck on CI.

---

## Lesson 16 — Folder structure that scales

**Time:** about 20 minutes  
**You will:** know where a new file belongs  
**You need:** Part 2

### The idea

A growing suite fails when nobody knows where to put the next test.

Industry practice: **tests describe what. Framework code describes how.**

This repo already uses that layout:

```text
playwrightAutomationTutorialTS/
├── tests/
│   ├── basic/               Part 1: small tests, no page objects yet
│   ├── e2e/                 UI journeys that use page objects
│   │   └── todo.spec.ts
│   └── api/                 API-only checks
├── src/                     not tests — reusable framework code
│   ├── pages/               one class per screen
│   │   ├── todo.page.ts
│   │   └── components/      shared widgets
│   ├── fixtures/            test.extend(...)
│   │   └── index.ts
│   ├── data/                test data builders
│   └── utils/               small helpers (dates, env)
├── examples/
│   └── auth.setup.example.ts  login-once pattern (Lesson 18)
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Why this layout helps the three ideas

| Folder | Helps |
| --- | --- |
| `tests/e2e` by **feature** | Scalability of finding tests (“checkout lives here”) |
| `src/pages` | Maintainability of locators |
| `src/fixtures` | Reusability of setup |
| `src/data` | Maintainability of environments and accounts |
| `src/utils` | Reusability without dumping junk into page objects |

### Naming conventions (pick them and keep them)

- Test files: `checkout.spec.ts` (Playwright looks for `*.spec.ts`)
- Page files: `checkout.page.ts`
- Component files: `navbar.component.ts`
- Fixture files: `checkout.fixture.ts`

Convention is cheaper than creativity. New teammates should guess the filename correctly.

### Check that you got it

A locator never lives in a spec if that screen already has a page object. A new checkout test goes under `tests/e2e/`, not in a random folder named `misc`.

**Next:** Lesson 17 — Config as the control room

---

## Lesson 17 — Config as the control room

**Time:** about 20 minutes  
**You will:** read `playwright.config.ts` as the place that controls how the whole suite behaves  
**You need:** Lesson 16

### What config is for

Config answers:

- Where are the tests?
- Which browsers?
- How many workers (parallel runs)?
- What is the base URL?
- When do we save traces?
- What runs on CI vs your laptop?

Keep those answers **out of individual tests**. That is maintainability of operations.

### A solid starter config

```typescript
import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  reporter: isCI ? [['html', { open: 'never' }], ['github']] : [['html']],
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: process.env.BASE_URL ?? 'https://demo.playwright.dev',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

### What the important lines mean

| Setting | Everyday meaning |
| --- | --- |
| `fullyParallel` | Different files run at the same time |
| `forbidOnly` | Someone’s leftover `test.only` cannot silently skip the suite on CI |
| `retries` | CI tries a failed test again; locally you see the first failure |
| `workers` | How many browsers at once. Cap this on small CI machines |
| `timeout` | A single test cannot hang forever |
| `projects` | Same tests, different browsers or roles |

### Projects are how you scale dimensions

A **project** is a named way to run tests: Chromium, Pixel 5, “admin user,” “customer user.”

You add a project when you need a new **axis** (browser, device, role, environment), not when you add a new test.

### Check that you got it

If you need “run slower / more traces / different URL,” look at config and environment variables first, not at copying flags into every command.

**Next:** Lesson 18 — Authenticate once, reuse everywhere

---

## Lesson 18 — Authenticate once, reuse everywhere

**Time:** about 30 minutes  
**You will:** log in one time per role and reuse the session  
**You need:** Lessons 11 and 17

### The problem

UI login on every test is:

- **slow** (scalability)
- **noisy** (every failure looks like a login bug)
- **duplicated** (maintainability)

### The industry pattern (Playwright official)

1. A **setup project** logs in.
2. It saves cookies and local storage to a file (`storageState`).
3. Real tests start already logged in.
4. Each test still gets a **fresh browser context** (isolation), just pre-filled with that session.

Kitchen picture: bake the bread once in the morning. Every sandwich uses a slice. You do not mill flour for each sandwich.

### Setup spec

The to-do demo has no login screen. A copy-paste template is in [examples/auth.setup.example.ts](examples/auth.setup.example.ts). For an app that *does* have login, a real file would look like `tests/auth.setup.ts`:

```typescript
import { test as setup, expect } from '@playwright/test';
import path from 'node:path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill(process.env.TEST_USER_EMAIL!);
  await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD!);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.context().storageState({ path: authFile });
});
```

Never commit real `playwright/.auth/*.json` files. They contain session cookies. Add that folder to `.gitignore`.

### Config with a dependency

```typescript
projects: [
  { name: 'setup', testMatch: /auth\.setup\.ts/ },
  {
    name: 'chromium',
    dependencies: ['setup'],
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'playwright/.auth/user.json',
    },
  },
],
```

`dependencies` means: run setup first. If login is broken, the rest of the suite is skipped instead of producing 80 fake failures. That is maintainability of **signal**.

### Multiple roles

Admins and customers are different people. Give them different saved sessions:

- `playwright/.auth/admin.json`
- `playwright/.auth/customer.json`

And different projects, or different fixtures that open two contexts in one test (approver + requester).

### Check that you got it

Login is a product feature. Test it in a few dedicated tests. Every other test should start already signed in.

**Next:** Lesson 19 — Layers: tests, fixtures, pages, components, data

---

## Lesson 19 — Layers (the architecture picture)

**Time:** about 25 minutes  
**You will:** explain who is allowed to talk to whom  
**You need:** Lessons 10, 11, 16, 18

### The picture

```text
 tests/e2e  →  “A customer can check out with a saved card”
     |
     | asks for fixtures
     v
 fixtures/  →  hands you todoPage, adminPage, apiClient
     |
     | creates
     v
 pages/     →  todoPage.addTodo('Milk')
     |
     | may use
     v
 components/ →  navbar.logout()
     |
     v
 Playwright page / request  →  real browser or HTTP
```

### Dependency rule (keep this strict)

- **Tests** may use fixtures, page objects, and `expect`.
- **Tests** may not use raw `page.locator('.css-xyz')` once a page object exists.
- **Page objects** may use Playwright `page` and components.
- **Page objects** may not import test files.
- **Fixtures** glue pages to tests. They own setup and teardown.
- **Utils** have no Playwright page unless they are truly shared browser helpers.

When these arrows reverse, the suite becomes spaghetti. Spaghetti does not scale.

### Components for reuse across pages

The header exists on every screen. Do not paste it into `TodoPage`, `SettingsPage`, and `CheckoutPage`.

```typescript
export class NavBar {
  constructor(private readonly page: Page) {}

  async logout() {
    await this.page.getByRole('button', { name: 'Account' }).click();
    await this.page.getByRole('menuitem', { name: 'Log out' }).click();
  }
}
```

Each page can expose `readonly nav = new NavBar(page)`.

### Fixtures as the “front door”

A mature suite’s tests look like:

```typescript
test('admin can disable a user', async ({ adminUsersPage }) => {
  await adminUsersPage.disable('sam@example.com');
  await expect(adminUsersPage.statusOf('sam@example.com')).toHaveText('Disabled');
});
```

No URLs. No CSS. No login. That is what maintainability *looks like* in a review.

### Check that you got it

If you are about to paste a locator into a second test, it belongs in a page or component. If you are about to paste setup into a second file, it belongs in a fixture.

**Next:** Lesson 20 — CI, parallel runs, and sharding

---

## Lesson 20 — CI, parallel runs, and sharding

**Time:** about 25 minutes  
**You will:** run the suite on every change, faster as it grows  
**You need:** Lesson 17

### Why CI

If tests only run on your laptop, they will not run. People forget.

Industry standard: every pull request runs at least the **smoke** set. The full set runs on main, or nightly.

Playwright’s installer can add `.github/workflows/playwright.yml`. Keep it. Adjust browsers and secrets.

A typical job does this:

1. Checkout the code
2. Install Node.js
3. `npm ci`
4. `npx playwright install chromium --with-deps` (install only what you need)
5. `npx playwright test`
6. Upload the HTML report and traces as artifacts

Use **Linux** on CI. It is cheaper. Developers can still use Mac locally.

### Parallel workers

Playwright runs files in parallel by default. That is free speed — if tests are isolated (Lesson 13).

If tests share one database row named `Sam`, parallel will randomly fail. Fix the data, do not turn parallel off forever.

### Sharding (many machines)

When one computer is not enough:

```bash
npx playwright test --shard=1/3
npx playwright test --shard=2/3
npx playwright test --shard=3/3
```

Three machines each run a third of the suite. That is how large companies keep a 30-minute suite from becoming a 3-hour suite.

### What to run when

| Moment | What to run |
| --- | --- |
| While coding | One file, headed or UI mode |
| Before you push | Chromium smoke (`--grep @smoke`) |
| Pull request | Smoke + critical journeys |
| Main branch / nightly | All browsers, full regression |

This is scalability of **people’s time**, not only machines.

### Check that you got it

CI is part of the architecture. A suite that only works on one laptop is not a suite. Isolation makes parallel and sharding possible.

**Next:** Lesson 21 — Quality gates

---

## Lesson 21 — Quality gates (keep the suite honest)

**Time:** about 15 minutes  
**You will:** catch mistakes before CI runs a browser  
**You need:** Lesson 20

### Typecheck

TypeScript only helps if you actually check it:

```bash
npx tsc --noEmit
```

Run this on CI. It catches “this fixture does not exist” and “this function wants a string, you passed a page.”

### Lint

ESLint with `@typescript-eslint/no-floating-promises` catches missing `await`. Missing `await` is a silent bug: the test continues before the click happens.

### Do not leave `test.only` in a pull request

`forbidOnly: !!process.env.CI` in config fails the build if someone forgot `test.only`. That one flag has saved many teams.

### Review checklist (human gate)

When you review a new test, ask:

1. Does the name describe a **user outcome**?
2. Are locators in a **page object**, using role/label/testid?
3. Is data **unique** or a dedicated account?
4. Is login **reused**, not re-implemented?
5. Did we add a UI test where an API test would be enough?
6. Will this run **alone** and in **parallel**?

If those six are yes, you are practicing industry standards, not just “making it pass on my machine.”

### Keep Playwright updated

```bash
npm install -D @playwright/test@latest
npx playwright install
```

New browser versions ship constantly. Updating Playwright is how you catch “it broke in the new Chrome” before customers do.

### Check that you got it

Green tests are not enough. Types, lint, no `test.only`, and a short review checklist keep the architecture from rotting.

**Next:** Lesson 22 — What “done well” looks like

---

## Lesson 22 — What “done well” looks like

**Time:** about 10 minutes  
**You will:** see the whole path from Lesson 1 to a team-ready suite

### A maintainable test (read this out loud)

```typescript
import { test, expect } from '../../src/fixtures';

test('customer can add an item to the list @smoke', async ({ todoPage }) => {
  await todoPage.addTodo('Buy milk');
  await expect(todoPage.todoTitles).toHaveText(['Buy milk']);
});
```

A new teammate understands it. A designer can rename a CSS class and this file does not change. CI can run it next to 400 others.

### The three ideas, one last time

**Maintainability**  
Change the placeholder in `TodoPage`. Change the base URL in config. Change login in `auth.setup.ts`. Specs stay still.

**Reusability**  
`addTodo`, `NavBar.logout`, the `todoPage` fixture, the saved session — written once, used many times.

**Scalability**  
Isolated tests + unique data + parallel workers + shards + smoke vs full suite. The architecture absorbs growth.

### How the three parts fit

| Part | You learned | Without it |
| --- | --- | --- |
| Basic | What a test is, locators, asserts, reports | You cannot start |
| Advanced | POM, fixtures, data, tags, API, traces | You drown in copy-paste |
| Architectural | folders, config, auth projects, CI, gates | The team cannot grow the suite |

You do not need every advanced trick on day one. You **do** need to know which layer a new line of code belongs in.

### A gentle order of growth for a real project

1. First 5 tests: Part 1 style is fine.
2. First repeated locator: extract a page object.
3. First repeated setup: extract a fixture.
4. First slow login: storage state (Lesson 18).
5. First CI job: Chromium only, HTML report uploaded.
6. First time the suite is slow: parallel, then smoke tags, then shards.
7. First second browser: add a project, do not copy the suite.

Grow the architecture when **pain appears**, but grow it **into this shape**, not into a new invention every week.

---

# Cheatsheet

### Install and run

```bash
npm install
npx playwright install chromium
npx playwright test
npx playwright test tests/basic/first-test.spec.ts
npx playwright test tests/e2e/todo.spec.ts
npx playwright test --headed
npx playwright test --ui
npx playwright test --grep @smoke
npx playwright test --project=chromium
npx playwright test --debug
npx playwright test --trace on
npx playwright show-report
npx playwright codegen https://demo.playwright.dev/todomvc
```

### Locator preference

```typescript
page.getByRole('button', { name: 'Save' })
page.getByLabel('Email')
page.getByPlaceholder('What needs to be done?')
page.getByText('Buy milk')
page.getByTestId('todo-title')
```

### Assertion preference

```typescript
await expect(locator).toBeVisible();
await expect(page).toHaveURL(/dashboard/);
```

### Do / do not

| Do | Do not |
| --- | --- |
| Test what a user sees | Depend on CSS class soup |
| One story per test | Couple tests through leftover data |
| Page objects for screens | Duplicate locators |
| Fixtures for setup | Copy `beforeEach` across files |
| `storageState` for login | UI-login in every test |
| Unique data | Hard-coded `sam@example.com` in parallel tests |
| Traces on failure | `waitForTimeout(5000)` |
| Smoke on PR, full at night | One 3-hour run as the only signal |

---

# What to learn next

When this guide feels comfortable:

1. Official docs: [https://playwright.dev/docs/intro](https://playwright.dev/docs/intro)
2. Best practices: [https://playwright.dev/docs/best-practices](https://playwright.dev/docs/best-practices)
3. Locators: [https://playwright.dev/docs/locators](https://playwright.dev/docs/locators)
4. Auth setup: [https://playwright.dev/docs/auth](https://playwright.dev/docs/auth)
5. Trace viewer: [https://playwright.dev/docs/trace-viewer](https://playwright.dev/docs/trace-viewer)

Then pick **one** real page at work or school. Write one smoke test. Extract one page object. Add one fixture. Stop. That small loop is how suites actually get built.

---

## Check that you got the whole course

You should be able to say:

> Playwright runs checklists in TypeScript. I find elements the way a person would. I hide locators in page objects, hide setup in fixtures, hide login in a saved session, and hide environment details in config. Isolated tests plus CI let the suite grow without falling apart.

If that paragraph makes sense, you are no longer at “my first test.” You are ready to keep a suite **maintainable, reusable, and scalable**.
