# Lesson 29 — Parallel Execution

## 1. What You Will Learn
- What **workers** and `fullyParallel` mean.
- Why unique `email` / `username` matter when tests run together.
- How to slow down locally without hiding data bugs.

## 2. Why This Matters in Real Projects
A 10-minute suite can become 3 minutes with parallel workers. It also **breaks** tests that share `john.doe@example.com`. Parallel is a feature and a stress test for your factory.

## 3. Concept in Plain English
Playwright starts several **workers** (mini processes). Each can run a different test at the same time, each with its own browser. `fullyParallel: true` even splits tests **inside** one file.

## 4. Real-Life Analogy
Several cashiers, one store. If every cashier tries to use the same coupon code, the register rejects it. Unique coupon = unique email from the factory.

## 5. Prerequisites
- [Lesson 21](21-test-data-factory.md) unique factory.
- [Lesson 28](28-cross-browser-testing.md) projects multiply runs.

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `playwright.config.ts` | `fullyParallel`, `workers` |
| `src/factories/registrationDataFactory.ts` | Stamp on email/username |
| Heavy specs | Avoid shared mutable files |

## 7. Step-by-Step Instructions
1. Keep `fullyParallel: true` in config (good default for this class).
2. Let `workers` be unset locally (Playwright picks) and smaller on CI if the runner is tiny.
3. Never reuse one email across success tests.
4. To debug a race, run `--workers=1` **temporarily**.
5. Do not share one `page` across tests; fixtures give a fresh `page`.

## 8. Complete Code Example

```typescript
export default defineConfig({
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  use: {
    baseURL: process.env.BASE_URL ?? 'https://gitsuniversity.org',
  },
});

const person = createRegistrant(); // student.1710000000123@example.com
await registrationPage.fillForm(person);
```

```bash
npx playwright test tests/e2e/registration.data-driven.spec.ts --workers=1
npx playwright test tests/e2e/registration.spec.ts --workers=4
```

## 9. Line-by-Line Explanation
- `fullyParallel` — tests in the **same file** can run at once.
- `workers: 2` on CI — cap load on a small GitHub runner.
- `undefined` locally — use CPU count.
- `createRegistrant()` — new stamp per call, even if four workers fill the form together.
- `--workers=1` — serial replay when you suspect a clash.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.data-driven.spec.ts --project=chromium
```

## 11. Expected Result
Several error-row tests finish overlapping in time. All pass. If you hard-code one email on two submit tests with the flag on, one or both may fail unpredictably.

## 12. Common Beginner Mistakes
- Global `let currentEmail` at file top, written by two tests.
- Assuming order: “the empty-form test always runs first.”
- Fixing a flake by adding `workers=1` in config forever.

## 13. How to Debug It
Run with `--workers=1`. If it passes only then, you have shared state. Log `createRegistrant().email` per test. Playwright’s report shows worker index.

## 14. Best Practices
- Isolated tests + factory uniqueness.
- Fixture-scoped `page` (default).
- Cap workers in CI; keep parallel on.

## 15. What NOT to Do
Do not depend on test order. Do not write to a shared `downloads/user.json` without unique names. Do not turn off parallel to avoid learning factories.

## 16. Hands-On Exercise
Run the data-driven spec with `--workers=1` and `--workers=4`. Times change; results should not.

## 17. Challenge Exercise
Intentionally (locally) reuse `john.doe@example.com` in two submit tests with `RUN_REGISTRATION_SUBMISSION=true` and `--workers=2`, then fix them with the factory.

## 18. Knowledge Check / Quiz
1. What does a worker own that another worker must not share?
2. Why unique usernames?
3. When is `--workers=1` appropriate?

### Answers
1. Browser `page`/context and any created accounts.
2. The form (and parallel tests) may reject duplicates.
3. Debugging a suspected race — not as a permanent architecture.

## 19. Interview Questions
1. How does Playwright parallelize tests?
2. What data-isolation rules do you enforce for parallel UI tests?
3. How do you choose `workers` on CI?

## 20. Architect's Notes
Parallel execution is how you scale (Lesson idea from the README). It requires **stateless tests**, factories, and env gates on submits. Debugging (next) should start with one worker and a headed browser, then traces — not by disabling parallel in main.

## 21. Next Lesson
[Lesson 30 — Debugging Playwright](30-debugging-playwright.md)
