# Lesson 52 — CI/CD Fundamentals

## 1. What You Will Learn
- What **CI** (continuous integration) and **CD** (continuous delivery/deployment) mean for tests
- The pipeline from a push to a published Playwright report
- Why humans should not be the only people who run the suite

## 2. Why This Matters in Real Projects
A green laptop is not evidence. CI is a **neutral machine**: same Node version, same `npm ci`, same Chromium. Pull requests that skip CI rot. Registration tests that only pass headed on one Mac will fail the first Friday they run in the cloud.

## 3. Concept in Plain English
**CI** means: every change is automatically built and tested. **CD** means: passing builds can be released. This course focuses on CI for Playwright. GitHub Actions is the robot that listens for push and pull_request events.

## 4. Real-Life Analogy
Every time you submit a draft chapter, a copy editor reprints it in a clean room and reruns the lab. You do not ship the handwritten notes.

## 5. Prerequisites
- [Lesson 43](43-eslint.md), [Lesson 45](45-typescript-type-checking.md), [Lesson 49](49-pull-request-process.md)

## 6. Files We Will Create or Modify
- Conceptual only in this lesson
- Concrete YAML is [Lesson 53](53-playwright-github-actions.md): `.github/workflows/playwright.yml`

## 7. Step-by-Step Instructions
1. Memorize the pipeline order below (cheap gates first).
2. Map each box to an npm script: `lint` → `eslint .`, `typecheck` → `tsc --noEmit`, `test` → Playwright.
3. Remember: browsers are large. Install Chromium **after** lint and typecheck so a typo does not wait on browsers.

## 8. Complete Code Example

```text
Code
 ↓
Push / PR
 ↓
GitHub Actions
 ↓
Install (npm ci)
 ↓
Lint (eslint .)
 ↓
Type Check (tsc --noEmit)
 ↓
Install Browser (Chromium --with-deps)
 ↓
Run Tests
 ↓
Publish Report
```

## 9. Line-by-Line Explanation
- **Code / Push / PR** — GitHub starts the workflow.
- **Install** — `npm ci` uses the lockfile (repeatable).
- **Lint / Type Check** — no browser, fail fast.
- **Install Browser** — Playwright’s Chromium plus OS libraries (`--with-deps` on Ubuntu).
- **Run Tests** — the registration and other specs.
- **Publish Report** — HTML artifact for failures you cannot watch live.

## 10. How to Run It
Push a branch and open a PR. On GitHub, open the **Actions** tab. Local equivalent of the cheap gates:

```bash
npm ci
npm run lint
npm run typecheck
```

## 11. Expected Result
A yellow/green/red check on the PR. Green means the robot agreed with your laptop (or found something your laptop skipped). The report artifact is downloadable.

## 12. Common Beginner Mistakes
- Running browsers before lint
- Using `npm install` in CI without a lockfile (drifting versions)
- Treating CD as “we deploy the tests to production users”

## 13. How to Debug It
Open the failed step’s log. Is it lint, tsc, missing browser, or a real assertion? See [docs/troubleshooting/README.md](../troubleshooting/README.md).

## 14. Best Practices
- Same commands locally and in CI
- Fail fast: lint and typecheck first
- Keep secrets in GitHub Secrets, not in YAML

## 15. What NOT to Do
- Do not skip CI because a deadline looms
- Do not use CI retries as the only flake strategy (Lesson 54 and architecture notes)

## 16. Hands-On Exercise
Write the pipeline on paper from memory. Check against this lesson.

## 17. Challenge Exercise
Explain to a teammate why `npm ci` is preferred over `npm install` on a robot.

## 18. Knowledge Check / Quiz
1. What does CI mean in one sentence?
2. Why lint before installing Chromium?
3. Which command typechecks?

**Answers:** 1) Every change is automatically verified 2) Fail cheap 3) `npm run typecheck` → `tsc --noEmit`.

## 19. Interview Questions
1. What is CI?
2. What tests should execute during a PR?
3. How does CI support reliability of a Playwright suite?

## 20. Architect's Notes
CI is part of the architecture diagram: GitHub Actions points at tests; reports point back at CI. Without it, fixtures and POM are local folklore. Next lesson walks the real YAML.

## 21. Next Lesson
[Lesson 53 — Playwright GitHub Actions](53-playwright-github-actions.md)
