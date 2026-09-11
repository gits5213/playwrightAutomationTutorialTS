# Lesson 54 — CI Optimization

## 1. What You Will Learn
- When to optimize CI (after it is correct)
- Caching, installing only Chromium, workers, sharding, artifacts, fail-fast, timeouts
- How PR smoke vs `main` regression saves minutes without hiding bugs

## 2. Why This Matters in Real Projects
Five tests do not need sharding. Five thousand do. Premature optimization adds YAML nobody understands. Late optimization makes every PR wait 40 minutes and people skip checks. Match the machine to the suite size.

## 3. Concept in Plain English
**Faster CI** means: do less work, or do work in parallel, or stop early when the answer is already “no.” You still need a full run somewhere (often `main` or a nightly schedule).

## 4. Real-Life Analogy
A pop quiz (PR smoke) is not the final exam (`main` regression). You do not hire 20 proctors for a 5-question quiz.

## 5. Prerequisites
- [Lesson 53](53-playwright-github-actions.md)
- Tags such as `@smoke` (Lesson 27)

## 6. Files We Will Create or Modify
- `.github/workflows/playwright.yml` (optional comments and flags)
- `playwright.config.ts` (`workers`, `retries`, `timeout`)

## 7. Step-by-Step Instructions
1. Confirm tests pass on CI **before** speeding them up.
2. Install only Chromium on PRs (`--project=chromium`).
3. Keep npm cache (`setup-node` `cache: npm`).
4. Cap `timeout-minutes` on the job; cap Playwright `timeout` in config.
5. Consider `--grep @smoke` on PRs and full suite on `main`.
6. Shard only when wall-clock time is a real problem.

## 8. Complete Code Example

```yaml
# PR: fast signal
# npx playwright test --project=chromium --grep @smoke

# main: broader (separate job or branch filter)
# npx playwright test --project=chromium
```

```ts
// playwright.config.ts (ideas, not a dump)
retries: process.env.CI ? 2 : 0,
workers: process.env.CI ? 2 : undefined,
```

Sharding (later):

```bash
npx playwright test --shard=1/4
```

## 9. Line-by-Line Explanation
- **Browser caching / install only Chromium** — Firefox and WebKit cost time; add them on a schedule.
- **Parallelization** — `workers` run files together; tests must be isolated (unique usernames).
- **Sharding** — split the suite across machines; needs a blob reporter to merge.
- **Artifact retention** — 7–30 days; not forever.
- **Fail-fast** — cancel siblings when one shard fails; can hide later failures. Use with care.
- **Timeouts** — hung tests must die; 60-minute job cap is a backstop.

## 10. How to Run It

```bash
npx playwright test --project=chromium --grep @smoke
```

## 11. Expected Result
Smoke finishes faster than the full suite. CI logs show two workers, not a frozen single worker. Reports still upload.

## 12. Common Beginner Mistakes
- Sharding 12 tests across 4 machines (overhead > gain)
- `retries: 10` to hide flakes
- Caching browsers incorrectly so CI uses a stale binary

## 13. How to Debug It
If CI is slow, time each step. Is `npm ci` the cost, or the tests? If shards fail randomly, look for shared data (same username). If smoke is green and `main` is red, the grep missed a needed file — fix tags, do not skip `main`.

## 14. Best Practices
- Optimize the slowest honest step
- Unique data so parallel/shard does not collide
- Retries are a shock absorber, not a quality strategy

## 15. What NOT to Do
- Do not optimize prematurely
- Do not drop typecheck to “save 8 seconds”
- Do not run every browser on every PR by default

## 16. Hands-On Exercise
List which tests in this repo carry `@smoke`. Decide whether a PR-only smoke job would still protect the empty-form required-field test.

## 17. Challenge Exercise
Draft (on paper) a matrix: Local Chromium → PR smoke → `main` regression → scheduled cross-browser. Compare with [docs/architecture/principles.md](../architecture/principles.md).

## 18. Knowledge Check / Quiz
1. Why install only Chromium on PRs?
2. What must be true before you raise `workers`?
3. Do retries replace fixing flakes?

**Answers:** 1) Faster feedback 2) Tests are isolated 3) No.

## 19. Interview Questions
1. How would you speed up a Playwright CI job?
2. What is sharding, and when is it worth it?
3. How would you design PR vs `main` vs nightly suites?

## 20. Architect's Notes
Speed is a feature of the architecture. Isolation and unique factories enable workers. Tags enable smoke. Governance decides what is required to merge. Measure first.

## 21. Next Lesson
[Lesson 55 — Protected Main Branch](55-protected-main-branch.md)
