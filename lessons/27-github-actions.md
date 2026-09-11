# Lesson 27 — GitHub Actions

**Time:** about 25 minutes  
**You will:** explain the robot that runs Playwright on every push and pull request  
**You need:** Lesson 26 and [Lesson 20](../README.md#lesson-20--ci-parallel-runs-and-sharding)

---

## The idea

A **GitHub Action** is a checklist GitHub runs on a computer in the cloud.

You do not have to remember to run tests. Opening a **pull request** (Lesson 29) can start the checklist for you.

Kitchen picture: every time someone suggests a new recipe, a second cook follows it in a clean kitchen and reports pass or fail. That cook is CI.

The live workflow is [.github/workflows/playwright.yml](../.github/workflows/playwright.yml).

---

## Read the file as English

| Part | Meaning |
| --- | --- |
| `on: push` / `pull_request` | When to run: a push to main, or a PR into main |
| `concurrency` | If you push twice quickly, cancel the older run |
| `runs-on: ubuntu-latest` | Use a Linux machine (cheaper, standard for CI) |
| `actions/checkout` | Download this branch’s code |
| `npm ci` | Install the **exact** packages from `package-lock.json` |
| `npx playwright install chromium --with-deps` | Only the browser this job needs |
| `npx playwright test --project=chromium` | Run the suite |
| `upload-artifact` | Save the HTML report so humans can download it |

`npm ci` is the CI cousin of `npm install`. It is stricter and repeatable. That is **maintainability** of builds.

---

## Smoke vs full suite

This repo is small, so CI runs **all** tests. When you have hundreds:

- **Pull request:** `--grep @smoke` (fast signal)
- **Main branch / nightly:** the full suite

There is a comment in the workflow showing the smoke command. Uncomment that pattern when waiting for CI becomes painful. That is **scalability** of people’s time.

---

## Try it (no extra tools)

You cannot fully simulate GitHub on a laptop, but you can run the **same commands** the workflow uses:

```bash
npm ci
npx playwright install chromium
npx playwright test --project=chromium
```

On GitHub: **Actions** tab → the latest workflow run → green check or red X → download **playwright-report** if you need the HTML.

---

## Industry habits

- Linux on CI, any OS while you write tests.
- Install **only** the browsers you run (here: Chromium).
- Upload the report **even when tests fail** (`if: ${{ !cancelled() }}`).
- Do not print passwords in logs. Use GitHub **Secrets** for `TEST_USER_PASSWORD`.
- Keep the YAML in Git so it is reviewed like code (CODEOWNERS, Lesson 28).

---

## Check that you got it

You can say:

> GitHub Actions is a cloud cook that runs our Playwright checklist on every PR. We install Chromium, run tests, and save the report.

**Next:** [Lesson 28 — CODEOWNERS](28-codeowners.md)
