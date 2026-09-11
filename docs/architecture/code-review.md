# Playwright code review

Use this checklist on every pull request. Green CI is necessary and **not** sufficient. You are reviewing whether the suite will still make sense at 500 tests.

Authors should fill `.github/pull_request_template.md` first. Reviewers walk the diff with this page.

## Test design

- Is the scenario valuable (a real risk on the registration form or a documented learning goal)?
- Is the test independent (any order, parallel-safe)?
- Does the test verify **user-observable** behavior (heading, error text, success title)?
- Is the name a sentence (`empty form shows required field errors`) rather than `test1`?
- Are success submissions gated when they create accounts (`RUN_REGISTRATION_SUBMISSION`)?
- Are duplicate-username/email cases **omitted** until observed on the live app?

## Locators

- Are accessible / user-facing locators preferred (`getByRole`, label, placeholder, text)?
- Are selectors stable (no `div:nth-child(4)` unless justified)?
- Do locators live in a **page object**, not copied into the spec?
- Is `Password` distinguished from `Confirm Password` (`exact: true` or a dedicated locator)?

## Data

- Is data reusable (`src/data/`) instead of magic strings in five files?
- Is unique data generated when the run might collide (`uniqueRegistrant()`)?
- Do negative rows match **observed** messages (`Invalid email format`, username ≥ 5, password ≥ 8, mismatch, invalid phone)?
- Does the empty-form case **not** assert Confirm Password as required?

## Maintainability

- Is duplicated logic extracted **only** when the duplication is real?
- Is the abstraction justified (page vs keyword vs helper)?
- Are new folders explained, or is this YAGNI?

## Reliability

- Any static `waitForTimeout` used as synchronization?
- Any dependency “test B needs test A”?
- Timeouts reasonable? Assertions web-first (`expect(locator).toBeVisible()`)?
- Flakes investigated, not papered over with huge retries?

## Security

- Any credentials, tokens, or `.env` files committed?
- Auth storage (`playwright/.auth/`) still ignored?
- Screenshots in the PR free of secrets?

## CI

- Does lint pass (`npm run lint` → `eslint .`)?
- Does typecheck pass (`npm run typecheck` → `tsc --noEmit`)?
- Do the relevant Playwright tests pass?
- Did the author run smoke where tags changed?
- Is the workflow still installing Chromium with `--with-deps` and uploading the report?

## How to leave comments

Prefer questions that teach: “Where should this locator live if the heading is reused?” over “Wrong.” Approve when the checklist is honestly green, not when the author is a friend.

See also [Lesson 49](../lessons/49-pull-request-process.md) and [Lesson 50](../lessons/50-pull-request-template.md).
