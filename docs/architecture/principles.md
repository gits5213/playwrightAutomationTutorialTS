# Architectural principles

These rules are for humans who will grow a Playwright suite from a handful of registration checks to thousands of jobs. They are not slogans to tattoo on every spec.

## DRY (Don’t Repeat Yourself)

Put a locator in **one** page object. Put “Invalid email format” in **one** data row. When the heading “Registration Form” changes, you should not grep fifty specs.

**Warning against premature abstraction:** two similar lines are not a framework. If you extract a helper before the duplication is real, you will name it badly and every test will depend on a muddled function. Copy once, feel the pain, then extract.

## KISS (Keep It Simple)

A test named `empty form shows required field errors` that calls `clickRegister` and asserts visible messages is better than a XML keyword spreadsheet. Prefer the smallest layer that removes the pain you actually have.

## YAGNI (You Aren’t Gonna Need It)

Do not add Allure, Docker, a custom runner, or GitFlow because a blog showed them. Add a tool when a lesson or a production constraint needs it. Do not invent duplicate-username tests until the live form is observed to reject duplicates.

## SOLID — only where useful

Automation is not a Spring application. Use the ideas, skip the ceremony.

- **Single responsibility:** pages click; tests assert; data stores values; CI runs.
- **Open/closed:** add an error-case row without rewriting `RegistrationPage`.
- **Liskov:** a keyword that takes a page should not secretly need a different page subtype.
- **Interface segregation:** do not pass a 40-field god object when the assertion needs `email`.
- **Dependency inversion:** tests depend on fixtures/pages, not on `new Chromium()` in every file.

Do **not** force a design-pattern name onto every fill.

## Separation of concerns

```text
Test        = WHAT we verify
Page object = HOW we interact
Data        = WHAT information we use
Factory     = HOW unique values are born
Fixture     = HOW dependencies are provided
Keyword     = WHAT a business person would say
Config      = WHERE/HOW tests execute
CI          = WHEN automation executes
Governance  = WHO may merge
```

## Scalability: 5 → 50 → 500 → 5,000 tests

| Size | What usually breaks | What to add |
| --- | --- | --- |
| 5 | Nothing; a linear spec is fine | Clear names, user-facing locators |
| 50 | Copied locators, copied people | POM, typed data |
| 500 | Time, collisions, unclear owners | Fixtures, factory, tags, workers, CODEOWNERS |
| 5,000 | CI capacity, flakes, environment | Sharding, smoke vs regression, flake triage, governance |

Watch **execution time**, **parallelism**, **test ownership**, **suite folders**, **data collisions**, **environment stability**, **reporting**, **flaky-test management**, **CI minutes**, **sharding**, and **who can merge**.

## Flaky tests

A flake is a test that changes color without a product change. Sort the cause before you add retries:

| Kind | Example |
| --- | --- |
| Product defect | Register stays disabled — the site is wrong |
| Test defect | Wrong locator, missing `await`, asserting Confirm Password as required on empty submit |
| Environment failure | Practice site down, DNS, CI image |
| Data failure | Reused username, missing `.env` |
| Intermittent failure | Animation, third-party, overloaded workers |

Retries on CI (`retries: 2`) absorb rare network blips. They must **not** become the way you ship an unreliable locator. Investigate with trace viewer, HTML report, and isolation (run the spec alone).

## Test pyramid / portfolio

```text
        E2E/UI
       /      \
      API
     /         \
 Unit/Component
```

UI tests are slow and precious. Use them for journeys a person can see (load form, required fields, invalid email, success). Prefer API or unit checks for rules that do not need Chromium — when the product exposes them. This course stays focused on Playwright UI. Do not automate the entire universe in the browser.

## Accessibility awareness

`getByRole` and labeled fields work when the page is operable for people. Good names (`button "Register"`, heading `"Registration Form"`) make tests **and** users happier. Locator strategy is **not** an accessibility audit. For a dedicated a11y program, add axe or Playwright accessibility snapshots in a later course — and still keep user-facing locators here.

## Execution matrix

```text
Local Development
    Chromium
        ↓
Pull Request
    Chromium smoke (and lint + typecheck)
        ↓
Main Branch
    Broader regression
        ↓
Scheduled
    Cross-browser regression (Firefox, WebKit) when the suite is stable
```

Organizations spend minutes where risk is highest. PRs need a fast signal. `main` needs confidence. Nightly can afford browsers. See [Lesson 54](../lessons/54-ci-optimization.md).

## Related

- [Overview diagram](overview.md)
- [Code review checklist](code-review.md)
