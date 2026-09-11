# Troubleshooting

Beginner-friendly fixes for this Playwright TypeScript course. Run commands from the repository root. The practice form is `https://gitsuniversity.org/practice/registration-form/`.

## Playwright browsers missing

**Symptom:** `Executable doesn't exist` or “browser not found.”

**Fix:**

```bash
npx playwright install chromium
```

On Linux CI use `npx playwright install chromium --with-deps` so OS libraries install too. You do not need every browser while learning.

## Node version problems

**Symptom:** `engine` warnings, odd `npm` errors, Playwright refusing to run.

**Fix:** Install **Node.js LTS** from [nodejs.org](https://nodejs.org). Check:

```bash
node --version
npm --version
```

Use the same major version locally and in GitHub Actions (`node-version: lts/*`).

## npm install errors

**Symptom:** `npm install` or `npm ci` fails.

**Fix:**

1. Confirm you are in this repo (it has `package.json` and `package-lock.json`).
2. Delete `node_modules` and retry `npm install`.
3. On CI prefer `npm ci` (needs the lockfile — do not ignore `package-lock.json`).
4. Network or registry issues: retry, or check VPN.

## Locator strict mode (matches more than one element)

**Symptom:** `strict mode violation: resolved to N elements`.

**Fix:** Your locator is too loose. Prefer `getByRole` with a precise `name`. Password vs Confirm Password both contain “Password” — use `exact: true` or the page object’s dedicated field. Do not “fix” it with `.first()` unless you can explain why the first match is the user-visible one.

## Element not found

**Symptom:** `waiting for locator ...` then timeout; count is 0.

**Fix:**

1. Open the form in a headed run: `npx playwright test --headed --project=chromium`.
2. Confirm the accessible name in the page (heading **Registration Form**, button **Register**).
3. Did `goto` run? Fixtures already call `registrationPage.goto()`.
4. Did a previous step fail (success screen vs form)?
5. Do not invent CSS. Inspect the live DOM.

## Timeout

**Symptom:** Test hits 30s (or 45s on registration describes) without a clear assertion error.

**Fix:** Prefer web-first `expect(locator).toBeVisible()`. Do **not** add `waitForTimeout(5000)`. Check network (practice site slow), `baseURL` / `REGISTRATION_FORM_URL`, and whether you asserted something that never appears (for example Confirm Password required on an empty submit — it does **not**).

## Assertion failure

**Symptom:** Received string ≠ expected.

**Fix:** Believe the **received** text. This app’s empty-form messages include `First name is required`, `You must accept the terms and conditions`, and so on. Invalid email is `Invalid email format`. Update data files to match the site; do not “force” an old sentence with a soft assert.

## CI-only failure

**Symptom:** Passes on your Mac, fails on GitHub Actions.

**Fix:** Download the `playwright-report` artifact. Open the trace. Common causes: missing `--with-deps`, different time zone, `CI=true` retries/workers, missing GitHub Secret / env, headed-only assumption, race that workers expose. Run locally with `CI=true npx playwright test --project=chromium`.

## Missing `.env`

**Symptom:** Wrong URL, `undefined` credentials, skipped auth.

**Fix:** Copy `.env.example` to `.env`. Never commit `.env`. The public registration form has defaults in `src/utils/env.ts` if variables are unset. Secrets for a **private** app belong in GitHub Secrets, not in YAML.

## TypeScript errors

**Symptom:** Editor red squiggles or `npm run typecheck` fails (`tsc --noEmit`).

**Fix:** Read the **first** error. Missing `RegistrationPerson` fields, wrong `errorField` union, bad import path. Do not add `as any`. `tests/` and `src/` are included in `tsconfig.json`.

## ESLint errors

**Symptom:** `npm run lint` (`eslint .`) fails.

**Fix:** Read the rule name. Floating promises usually mean a missing `await` on `expect`. Do not disable the Playwright plugin to keep a bad line. Ignore generated folders in `eslint.config.mjs`.

## Git merge conflict

**Symptom:** `<<<<<<<`, `=======`, `>>>>>>>` in a file.

**Fix:**

1. `git status` to see both sides.
2. Edit the file to the correct final content (often **keep both** locators if they are different fields).
3. Remove the conflict markers.
4. `npm run typecheck` and a targeted Playwright spec.
5. `git add` the file and complete the merge/rebase.

Ask a mentor before `git merge --abort` if you are unsure you can recreate work.

## GitHub Actions failure

**Symptom:** Red X on the PR.

**Fix:** Open **Actions** → failed job → failed **step**.

| Step | Likely cause |
| --- | --- |
| checkout | Rare; permissions |
| setup-node | Node version |
| npm ci | Lockfile out of date — run `npm install` locally and commit the lockfile |
| lint | See ESLint above |
| typecheck | See TypeScript above |
| playwright install | Network or missing `--with-deps` |
| test | Assertion, locator, site down |
| upload-artifact | Path `playwright-report/` missing because tests crashed very early |

Re-run failed jobs only after you understand the log. Repeated re-runs will not fix a wrong expected string.

## Still stuck

Run the smallest spec:

```bash
npx playwright test tests/basic/registration-heading.spec.ts --project=chromium --debug
```

Bring the error text, the spec name, and whether it failed locally or only on CI.
