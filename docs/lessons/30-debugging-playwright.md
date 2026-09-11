# Lesson 30 — Debugging Playwright

## 1. What You Will Learn
- Run tests headed, in UI mode, and with the Playwright Inspector.
- Use `page.pause()` on the registration form.
- Pick the right tool instead of adding `waitForTimeout(5000)`.

## 2. Why This Matters in Real Projects
A red test is a gift if you can **see** it. Beginners guess locators in the dark. Playwright can freeze the browser on `#registration-form-email-input` and step one action at a time.

## 3. Concept in Plain English
**Debugging** means slowing the checklist until you see the lie: wrong page, hidden button, or assertion too early. Headed = you watch. Inspector = you click **Next**. UI mode = a sidebar of tests.

## 4. Real-Life Analogy
A slow-motion replay of a missed catch, versus guessing from the final score. `--debug` is slow motion.

## 5. Prerequisites
- [Lesson 29](29-parallel-execution.md).
- A failing or passing registration spec you can re-run.

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| Any spec under `tests/e2e/` | Optional temporary `page.pause()` |
| `playwright.config.ts` | Already has screenshot/trace on failure |

## 7. Step-by-Step Instructions
1. Reproduce with `--project=chromium` first (one browser).
2. Add `--headed` to watch the form.
3. Add `--debug` for Inspector (step, pick locator).
4. Or run `--ui` and click the test name.
5. For a stubborn click, `await registrationPage.page.pause()` before `clickRegister`, then resume. Remove `pause` before you commit.

## 8. Complete Code Example

```typescript
test('empty form shows required field errors @negative @registration', async ({ registrationPage }) => {
  await registrationPage.page.pause(); // temporary
  await registrationPage.clickRegister();
  await expect(registrationPage.error('email')).toContainText('Email is required');
});
```

```bash
npx playwright test tests/e2e/registration.spec.ts --headed --project=chromium
npx playwright test tests/e2e/registration.spec.ts --debug --project=chromium
npx playwright test --ui
npx playwright test tests/e2e/registration.spec.ts -g "empty form" --workers=1
```

## 9. Line-by-Line Explanation
- `--headed` — see Chromium; still automatic.
- `--debug` — Inspector; default timeout is stretched so you can think.
- `--ui` — time-travel style list, watch steps.
- `page.pause()` — freeze **this** test until you press resume.
- `--workers=1` — one puzzle at a time.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.spec.ts -g "page loads" --debug --project=chromium
```

## 11. Expected Result
The Inspector opens, the form is visible, and you can step until the heading assertion. You should not need a five-second sleep.

## 12. Common Beginner Mistakes
- `waitForTimeout(10000)` to “fix” a missing `await`.
- Leaving `page.pause()` in committed code (CI will hang).
- Debugging three projects at once.

## 13. How to Debug It
If Inspector never appears, you are in CI (`CI=true`) or a non-interactive terminal. If the locator is wrong, use the Pick Locator tool on **First name**. Next lesson: traces when you cannot sit at the machine.

## 14. Best Practices
- Fail small: `-g` one title, one project, one worker.
- Prefer traces and Inspector over sleeps.
- Assert with `expect(locator).toBeVisible()` (auto-wait).

## 15. What NOT to Do
Do not debug by refreshing the live site and typing by hand only — also reproduce in Playwright. Do not screenshot blindly without an assertion. Do not ignore `await`.

## 16. Hands-On Exercise
Run the empty-form test with `--debug`. Step until red messages appear. Note the id `registration-form-firstname-error`.

## 17. Challenge Exercise
Break the heading name on purpose, run headed, read the error, then restore it. Time how long Inspector took vs guessing.

## 18. Knowledge Check / Quiz
1. Which flag opens the Inspector?
2. Why is `waitForTimeout` a poor fix?
3. Why remove `page.pause()` before Git?

### Answers
1. `--debug`.
2. It hides missing awaits and makes the suite slow and flaky.
3. CI has nobody to press Resume; the job hangs.

## 19. Interview Questions
1. Walk through how you debug a failing Playwright test.
2. When do you choose UI mode vs Inspector vs a trace?
3. How does Playwright’s auto-waiting change debugging habits?

## 20. Architect's Notes
Local debug tools assume a human. CI needs artifacts: trace, screenshot, video (already in config). Trace Viewer is the same movie when you were not at the laptop. That is the next lesson.

## 21. Next Lesson
[Lesson 31 — Trace Viewer](31-trace-viewer.md)
