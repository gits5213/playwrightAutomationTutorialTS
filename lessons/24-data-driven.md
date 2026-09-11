# Lesson 24 — Data-driven tests

**Time:** about 25 minutes  
**You will:** run the same steps with many rows of data instead of copying tests  
**You need:** Lesson 23 and [Lesson 12](../README.md#lesson-12--test-data-and-environments)

---

## The idea

**Data-driven** means: the **steps stay the same**. The **examples** live in a table.

Kitchen picture: the recipe is “bake a cake.” The table is flavors: vanilla, chocolate, lemon. You do not write three cookbooks.

Without data-driven:

```typescript
test('add milk', async ({ todoPage }) => { /* same steps */ });
test('add bread', async ({ todoPage }) => { /* same steps again */ });
test('add eggs', async ({ todoPage }) => { /* same steps again */ });
```

When the steps change, you edit three tests and miss one. That hurts **maintainability**.

With data-driven, you add a **row**. The loop writes the tests for you. That is **scalability**.

---

## Two tables in this repo

| File | What it holds |
| --- | --- |
| [src/data/todo-add-cases.json](../src/data/todo-add-cases.json) | Titles to add (JSON — easy for non-coders to edit) |
| [src/data/todo-filter-cases.ts](../src/data/todo-filter-cases.ts) | Add + complete + filter examples (TypeScript — extra labels) |

The tests that loop those rows: [tests/e2e/todo.data-driven.spec.ts](../tests/e2e/todo.data-driven.spec.ts)

```typescript
for (const row of addCases) {
  test(`a person can add ${row.name} @data`, async ({ todoPage }) => {
    await todoPage.addTodo(row.title);
    await expect(todoPage.todoTitles).toHaveText([row.title]);
  });
}
```

Each row becomes **its own test** in the report. If “a longer sentence” fails, the other rows can still pass. That is easier to debug than one giant test with a loop inside.

---

## Industry habits

| Do | Do not |
| --- | --- |
| Keep **behavior** in the test / page / keyword | Copy-paste the same test per example |
| Keep **examples** in `src/data/` | Hide magic strings only inside one spec |
| Name the row (`row.name`) so the report is readable | Name tests `test1`, `test2` |
| Use unique data when tests create users | Reuse `sam@example.com` in parallel runs |
| One table, one behavior | One CSV that tries to test login, checkout, and email |

JSON, CSV, and TypeScript arrays are all fine. Start with a TypeScript or JSON list. Add CSV later if a business analyst owns the file.

---

## Try it

```bash
npx playwright test tests/e2e/todo.data-driven.spec.ts --project=chromium
```

You should see several passed tests, one per row.

Then add a fourth title to [src/data/todo-add-cases.json](../src/data/todo-add-cases.json), save, and run again. You wrote **no new test function**. That is data-driven.

---

## How this fits with POM

The table does **not** contain locators. It contains **values** (`Milk`, `Bread`).

The page object still clicks. Data-driven without POM just copies selectors into a loop — still brittle.

**Data-driven + POM** = many examples, one set of locators.

---

## Check that you got it

You can say:

> Data-driven tests loop a table. Each row is one test. I add examples without copying steps.

**Next:** [Lesson 25 — Keyword-driven tests](25-keyword-driven.md)
