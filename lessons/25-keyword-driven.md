# Lesson 25 — Keyword-driven tests

**Time:** about 25 minutes  
**You will:** name a group of steps in business language, like Robot Framework keywords  
**You need:** Lesson 23

---

## The idea

A **keyword** is a named step a non-coder can read out loud.

Robot Framework writes:

```text
Customer orders coffee
    Greet the customer
    Take the order    latte
```

Playwright with TypeScript does the same job with **functions** (here, methods on `TodoKeywords`):

```typescript
await todoKeywords.addATodoCalled('Buy milk');
await todoKeywords.theListShouldShow(['Buy milk']);
```

Kitchen picture: “Make toast” is the keyword. Inside it: take bread, use toaster, put on plate. Guests never see the toaster knobs. That is **reusability**.

---

## How the layers stack (do not pick only one)

```text
Test / keyword story     →  “add a to-do called Buy milk”
        ↓
Keyword                  →  TodoKeywords.addATodoCalled
        ↓
Page object              →  TodoPage.addTodo
        ↓
Playwright locator       →  getByPlaceholder(...)
```

| Layer | Answers |
| --- | --- |
| **Keyword** | What does the *business* call this? |
| **Page object** | How does *this screen* do it? |
| **Data** | Which *examples* do we run? |
| **Test** | Which *story* are we proving? |

Keywords without page objects hide locators in a second messy place. Page objects without keywords are still good — add keywords when tests should read like a manual for the product team.

---

## Live files

| File | Role |
| --- | --- |
| [src/keywords/todo.keywords.ts](../src/keywords/todo.keywords.ts) | Named steps (`addATodoCalled`, `theListShouldBeEmpty`) |
| [src/fixtures/todo.fixture.ts](../src/fixtures/todo.fixture.ts) | Hands the test `todoKeywords` already on the page |
| [tests/e2e/todo.keywords.spec.ts](../tests/e2e/todo.keywords.spec.ts) | Stories written only in keywords |

The test has **no locators**. If the Delete button is renamed, you still fix [todo-item.component.ts](../src/pages/components/todo-item.component.ts), not the keyword file, unless you also renamed the **business** step.

---

## When to make a keyword

Make one when:

- a group of steps has a clear name in real life (“complete the to-do”)
- more than one test would copy those steps
- a product owner should be able to read the test

Do not make a keyword that only calls `click()` once with no extra meaning. Do not put CSS selectors in the keyword file.

---

## Try it

```bash
npx playwright test tests/e2e/todo.keywords.spec.ts --project=chromium
```

Read [tests/e2e/todo.keywords.spec.ts](../tests/e2e/todo.keywords.spec.ts) out loud. It should sound like a checklist, not like programming.

---

## Check that you got it

You can say:

> A keyword is a reusable named step. In Playwright it is a function. It calls page objects. Tests stay in business language.

**Next:** [Lesson 26 — `.gitignore`](26-gitignore.md)
