# Interview questions

Attempt these **without** opening [interview-answers.md](interview-answers.md). They follow the course phases. There are no answers on this page.

## Phase 0 — Orientation

1. What is the difference between manual testing and test automation?
2. What is a test case in everyday words?
3. What is regression testing, and why do teams automate it?

## Phase 1 — First Playwright test

4. What is Playwright?
5. What do `test`, `async`, and `await` mean in a Playwright spec?
6. How do you navigate to a URL and prove a page loaded?

## Phase 2 — Locators and interactions

7. What is a locator?
8. Why prefer `getByRole()` over a CSS path like `div:nth-child(4) > button`?
9. What is Playwright’s strict locator mode?

## Phase 3 — Test design

10. What is the difference between positive and negative testing on a registration form?
11. What is boundary value analysis? Give a username example.
12. How do you decide whether Confirm Password is required on empty submit?

## Phase 4 — Maintainability

13. Why does a first “everything in one file” test become expensive at 100 tests?
14. What do maintainability, reusability, and scalability mean for a suite?

## Phase 5 — Page Object Model

15. What is POM, and what problem does it solve?
16. What belongs in a page object vs in a test?
17. When should you introduce a component object?

## Phase 6 — Data-driven automation

18. Why is hardcoded test data a problem?
19. What is data-driven testing?
20. When is JSON a good idea, and when is a TypeScript module better?
21. Why generate unique emails and usernames?

## Phase 7 — Keyword-driven automation

22. What is keyword-driven testing?
23. How does a keyword layer relate to page objects?
24. When should you **not** build a keyword engine?

## Phase 8 — Fixtures

25. What is a Playwright fixture?
26. Why inject `registrationPage` instead of constructing it in every test?

## Phase 9 — Configuration

27. What belongs in `playwright.config.ts`?
28. Why use environment variables and `.env.example` instead of committing secrets?

## Phase 10 — Organization, browsers, parallel

29. How do smoke and regression tags help a growing suite?
30. Why test more than one browser?
31. How does parallel execution work, and what breaks it?

## Phase 11–12 — Debugging and reporting

32. What causes flaky tests?
33. Why avoid `page.waitForTimeout` as a wait strategy?
34. How does Trace Viewer help a CI failure?
35. What does a Playwright HTML report contain?

## Phase 13 — TypeScript for QA

36. What is the difference between `const` and `let`?
37. What is an interface (or type) used for in test data?
38. What is the difference between a named export and a default export?
39. Compare enums and string union types for error field names.

## Phase 14 — Code quality

40. What problem does ESLint solve that TypeScript does not?
41. How do Prettier and ESLint differ?
42. Why run `tsc --noEmit` (`npm run typecheck`) in CI separately from Playwright?

## Phase 15–16 — Git

43. Explain working directory, staging, commit, and GitHub.
44. Describe a simple branching strategy for a test-automation repo.
45. What should a Playwright `.gitignore` exclude?

## Phase 17–19 — Pull requests and ownership

46. What happens during a pull request?
47. Why do teams use pull request templates?
48. How do CODEOWNERS work?

## Phase 20–21 — CI/CD and governance

49. What is CI?
50. What tests should execute during a PR?
51. Walk through a Playwright GitHub Actions workflow.
52. How would you protect `main`?

## Phase 22 — Enterprise architecture

53. How would you design a framework for 5,000 tests?
54. What layer owns locators vs data vs when tests run?
55. How do you decide a new abstraction is justified?
