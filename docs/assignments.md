# Assignments

Complete these in order. Use `https://gitsuniversity.org/practice/registration-form/` unless a step says otherwise. Prefer user-facing locators. Do not invent validation the live page does not show. Gate real account creation with `RUN_REGISTRATION_SUBMISSION=true` when you add a success submission.

## Assignment 1 — Open the registration form

Write a test that navigates to the form and asserts the heading **Registration Form** is visible. Run it headed once so you see the page.

## Assignment 2 — Verify form fields

Assert that the required controls are present: First Name, Last Name, Email, Phone Number, Username, Password, Confirm Password, Gender, Date of Birth, Country, Terms checkbox, and the **Register** button. Do not fill anything yet.

## Assignment 3 — Fill the registration form

Fill every field with valid values (unique email and username). Assert the fields hold those values. **Do not submit** unless your instructor asked you to, and then only with the submission gate.

## Assignment 4 — Negative tests

Submit empty and invalid data **based on observed messages**:

- Empty form: required messages for first name, last name, email, phone, username, password, gender, date of birth, country, and terms. Confirm Password is **not** required when the form is empty.
- Invalid email, username shorter than 5, password shorter than 8, mismatched passwords, invalid phone, terms unchecked on an otherwise valid form.

Do **not** automate duplicate username until you have seen the site reject one.

## Assignment 5 — Refactor using POM

Move locators and fills into `src/pages/registration.page.ts` (or your page class). Specs should read like `fillForm` / `clickRegister` / `expect` on errors. No copied CSS in the spec.

## Assignment 6 — Move data outside tests

Put the person shape and `validRegistrant` / `uniqueRegistrant` in `src/data/`. Specs import data; they do not hardcode `john.doe@example.com` in five files.

## Assignment 7 — Data-driven testing

Drive invalid-field tests from a table (`registration-error-cases.ts` or JSON). Each row becomes a named test (`registration rejects an email without @`).

## Assignment 8 — Typed keyword-driven testing

Add `RegistrationKeywords` (or typed keyword runner) so a test reads as business steps: form visible → fill unique valid form → click register → assert success. Keep locators in the page object.

## Assignment 9 — Fixture

Create a fixture that provides `registrationPage` already on the form (`goto` in the fixture). Specs use `async ({ registrationPage })`.

## Assignment 10 — GitHub Actions

Ensure `.github/workflows/playwright.yml` checks out the repo, sets up Node, runs `npm ci`, `npm run lint` (`eslint .`), `npm run typecheck` (`tsc --noEmit`), installs Chromium with `--with-deps`, runs tests, and uploads `playwright-report`.

## Assignment 11 — Create a pull request

Branch from `main`, commit a small change, push, open a PR using the template, and wait for CI. Do not merge to `main` without review if the branch is protected.

## Assignment 12 — Review another engineer’s PR

Review a classmate’s (or a sample) PR with [docs/architecture/code-review.md](architecture/code-review.md). Leave at least one specific comment on locators, data, or independence.

## Final assignment — Enterprise-quality registration framework

Independently assemble a maintainable suite for this form:

- POM + fixture + typed data + factory for unique users
- Data-driven negatives from **observed** rules
- Keywords for at least one journey
- Lint, Prettier, `tsc --noEmit`
- CI, `.gitignore`, PR template, CODEOWNERS with a **real** username (never leave `@YOUR_GITHUB_USERNAME` in a company repo)
- Success submissions gated; no unobserved duplicate-username test
- A short architecture note: which layer owns locators, data, and merge rules

Run:

```bash
npm run lint
npm run typecheck
npx playwright test --project=chromium
```

Then open a PR and treat it as if a staff SDET will reject vague names and hard waits.
