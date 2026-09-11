# Lesson 23 — Page Object Model in depth

**Time:** about 25 minutes  
**You will:** explain POM as layers (base page, page, component) and know what not to put in a page object  
**You need:** [Lesson 10](../README.md#lesson-10--page-object-model-reusability)

---

## The idea, one more time

A **page object** is a named helper for **one screen**.

Kitchen picture: the **page** is one counter in the kitchen. The **component** is a tool on that counter (the toaster). The **base page** is the hallway every counter shares (how you walk into the room).

Tests should say **what** a person does. Page objects say **how** this screen works.

---

## Three layers in this repo

| Layer | File | Job |
| --- | --- | --- |
| Base page | [src/pages/base.page.ts](../src/pages/base.page.ts) | Shared moves, like `open(path)` |
| Page | [src/pages/todo.page.ts](../src/pages/todo.page.ts) | One screen: the to-do app |
| Component | [src/pages/components/todo-item.component.ts](../src/pages/components/todo-item.component.ts) | One widget that appears many times (a row) |

`TodoPage` **extends** `BasePage`. In everyday words: the to-do screen **is a** page, plus to-do-only moves.

A list row is **not** a whole page. It is a **component**. `TodoPage.itemNamed('Buy milk')` hands you that row so you can complete or delete it.

That split is **maintainability**: the delete button changes once in the component, not in every test.

---

## What belongs where

| Put it here | Examples |
| --- | --- |
| **Page / component** | Locators, `addTodo`, `complete`, `open` |
| **Test** | “The list should show Buy milk” (`expect`) |
| **Keyword** (Lesson 25) | A business name for a group of page calls |
| **Data** (Lesson 24) | The titles, emails, and tables of examples |

A page object is a **map of the screen**, not a novel about the product.

---

## Industry rules (keep these)

1. **One class per screen or major widget.** Not `GodPage` with every button in the company.
2. **Methods named as a person would speak:** `addTodo`, not `clickDiv3`.
3. **No raw locators in tests** once the page object exists.
4. **Assertions stay in tests** (or in keywords that wrap `expect`). The page may wait until it is ready.
5. **Do not return Playwright `Locator` from every method** unless the test truly needs to assert on it. Prefer `todoTitles` as a field the test can `expect`, or a keyword that asserts.
6. **Components for repeats.** Header, modal, table row — same idea.

---

## Try it

Open [src/pages/todo.page.ts](../src/pages/todo.page.ts). Find `extends BasePage` and `itemNamed`.

Then run a test that uses the page, not raw locators:

```bash
npx playwright test tests/e2e/todo.spec.ts --project=chromium
```

Change the placeholder text in **one** place (`newTodo`) in your mind. Every test that calls `addTodo` would follow that change. That is the whole point of POM.

---

## Check that you got it

You can say:

> A page object hides locators. A component hides a repeated widget. A base page hides shared navigation. Tests stay short.

**Next:** [Lesson 24 — Data-driven tests](24-data-driven.md)
