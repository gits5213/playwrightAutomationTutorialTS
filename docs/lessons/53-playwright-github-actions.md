# Lesson 53 — Playwright GitHub Actions

## 1. What You Will Learn
- How to read `.github/workflows/playwright.yml`
- Each step: checkout, Node, `npm ci`, lint, typecheck, Chromium, test, report
- How pull requests and pushes start the job

## 2. Why This Matters in Real Projects
A workflow file is code. It is reviewed like `registration.page.ts`. If someone removes typecheck, `main` can go red in types while tests still pass. You must be able to explain every line.

## 3. Concept in Plain English
YAML lists **when** to run (push, pull_request) and **what** to run (steps). GitHub provides a fresh Ubuntu machine. Your steps install Node, packages, browsers, then Playwright.

## 4. Real-Life Analogy
A substitute teacher’s lesson plan: arrive, take attendance (checkout), hand out the same textbooks (`npm ci`), quiz (lint/typecheck), set up the lab (Chromium), run the experiment (tests), collect lab books (upload report).

## 5. Prerequisites
- [Lesson 52](52-cicd-fundamentals.md)
- Scripts: `"lint": "eslint ."`, `"typecheck": "tsc --noEmit"`

## 6. Files We Will Create or Modify
- `.github/workflows/playwright.yml`

## 7. Step-by-Step Instructions
1. Create the file under `.github/workflows/`.
2. Trigger on `pull_request` and `push` to `main` (and `master` if needed).
3. Add steps in the order below.
4. Upload `playwright-report/` even when tests fail (`if: ${{ !cancelled() }}`).
5. Open a PR and confirm the workflow appears on the PR.

## 8. Complete Code Example

```yaml
name: Playwright Tests
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npx playwright install chromium --with-deps
      - run: npx playwright test --project=chromium
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## 9. Line-by-Line Explanation
- `on.push` / `on.pull_request` — start on changes to primary branches.
- `actions/checkout@v4` — copy the repo onto the runner.
- `actions/setup-node@v4` — Node LTS; `cache: npm` speeds installs.
- `npm ci` — clean install from `package-lock.json`.
- `npm run lint` — `eslint .`
- `npm run typecheck` — `tsc --noEmit`
- `playwright install chromium --with-deps` — browser plus Ubuntu libraries.
- `playwright test` — the suite (optionally `--grep @smoke` on PRs later).
- `upload-artifact` — HTML report for debugging; keep on failure.

## 10. How to Run It
Push the workflow on a branch. Local dry-run of the same commands:

```bash
npm ci && npm run lint && npm run typecheck
npx playwright install chromium --with-deps
npx playwright test --project=chromium
```

## 11. Expected Result
Actions shows a green job. The artifact `playwright-report` can be downloaded. A lint error fails **before** Chromium install.

## 12. Common Beginner Mistakes
- Forgetting `--with-deps` on Ubuntu (missing system libraries)
- Uploading reports only `if: success()` so failures have no HTML
- Pinning ancient Action versions copied from a 2021 blog

## 13. How to Debug It
Click the failed step. Missing module → lockfile. `tsc` error → run `npm run typecheck` locally. Browser error → install step. Assertion → download the report and open the trace.

## 14. Best Practices
- Current `checkout@v4`, `setup-node@v4`, `upload-artifact@v4`
- Chromium-only on PRs until the suite is stable
- `concurrency` to cancel outdated runs on the same branch (see repo workflow)

## 15. What NOT to Do
- Do not print secrets in logs
- Do not commit the report; upload it
- Do not run `npm install` in CI when `npm ci` works

## 16. Hands-On Exercise
Open `.github/workflows/playwright.yml` and match each step to the list in section 8.

## 17. Challenge Exercise
Add a comment in YAML (a `#` note) explaining why lint runs before browsers.

## 18. Knowledge Check / Quiz
1. Name the eight conceptual steps in order.
2. What does `--with-deps` add?
3. Why upload the report when tests fail?

**Answers:** 1) checkout, setup-node, npm ci, lint, typecheck, install Chromium, test, upload report 2) OS packages Chromium needs 3) You cannot watch CI; the HTML/trace is the film.

## 19. Interview Questions
1. Walk through a Playwright GitHub Actions workflow.
2. Why use `npm ci` on CI?
3. How do you preserve debugging artifacts on failure?

## 20. Architect's Notes
The workflow is the execution matrix’s PR column: Chromium, full or smoke. Keep YAML boring. Clever bash in CI is harder to teach than a missing `await`. Optimization is the next lesson — do not shard yet.

## 21. Next Lesson
[Lesson 54 — CI Optimization](54-ci-optimization.md)
