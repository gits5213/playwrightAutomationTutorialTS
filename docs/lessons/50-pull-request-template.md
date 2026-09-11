# Lesson 50 — Pull Request Template

## 1. What You Will Learn
- Why teams put a checklist on every PR
- Where GitHub reads `.github/pull_request_template.md`
- What to tick before you ask for review

## 2. Why This Matters in Real Projects
Reviewers should not invent a new standard every Monday. A template asks the same questions: did lint pass, did you typecheck, did you avoid secrets, did you update docs? That is maintainability of the **team**, not only of `RegistrationPage`.

## 3. Concept in Plain English
When you open a pull request, GitHub copies the template into the description box. You fill blanks and check boxes. The template is a reminder, not a robot. You can still write a bad summary — but you have fewer excuses.

## 4. Real-Life Analogy
Airport departure cards ask the same safety questions every flight. Pilots do not invent a new card. The PR template is that card for code.

## 5. Prerequisites
- [Lesson 49](49-pull-request-process.md)

## 6. Files We Will Create or Modify
- `.github/pull_request_template.md`

## 7. Step-by-Step Instructions
1. Create the folder `.github/` if needed.
2. Add `pull_request_template.md` with the sections below.
3. Commit it on a feature branch and open a **new** PR (existing PRs keep their old description).
4. Fill every section honestly. Uncheck boxes you did not do.

## 8. Complete Code Example

```markdown
## Description

## Related Ticket

## Type of Change

- [ ] New Test
- [ ] Bug Fix
- [ ] Framework Enhancement
- [ ] Documentation
- [ ] Refactoring

## Testing Performed

- [ ] Tests pass locally
- [ ] Type checking passes (`npm run typecheck` → `tsc --noEmit`)
- [ ] Lint passes (`npm run lint` → `eslint .`)
- [ ] Smoke tests pass where applicable
- [ ] No secrets committed
- [ ] Documentation updated

## Screenshots / Reports

## Reviewer Notes
```

## 9. Line-by-Line Explanation
- **Description** — why, in sentences, not a file list.
- **Related Ticket** — traceability when the class or company uses tickets.
- **Type of Change** — helps CODEOWNERS and reviewers set expectations.
- **Testing Performed** — you ran the gates CI will run.
- **Screenshots / Reports** — traces for UI failures, not a dump of HTML.
- **Reviewer Notes** — surprises: “Confirm Password is still not required on empty submit.”

## 10. How to Run It
Open a new PR on GitHub. The description should already contain the headings. Tick boxes with `- [x]`.

## 11. Expected Result
Every new PR starts from the same skeleton. Reviewers scan the test plan first, then the diff.

## 12. Common Beginner Mistakes
- Leaving every box unchecked and writing “lgtm”
- Ticking typecheck without running `npm run typecheck`
- Putting secrets in Screenshots

## 13. How to Debug It
If GitHub does not pick up the template, check the **exact** path `.github/pull_request_template.md` on `main` (or the PR’s default branch). Filenames are case-sensitive.

## 14. Best Practices
- Keep the template short enough that people fill it
- Match boxes to real scripts: lint, typecheck, smoke
- Mention `RUN_REGISTRATION_SUBMISSION` when the PR touches success tests

## 15. What NOT to Do
- Do not make a 90-box novel nobody reads
- Do not auto-check every box in a bot

## 16. Hands-On Exercise
Open `.github/pull_request_template.md` and compare it with this lesson. Note any extra boxes this repo already uses.

## 17. Challenge Exercise
Add one checkbox: “I did not add `waitForTimeout`.” Explain why in Reviewer Notes of a practice PR.

## 18. Knowledge Check / Quiz
1. Where must the template file live?
2. Does the template run tests by itself?
3. Name two boxes that match CI gates.

**Answers:** 1) `.github/pull_request_template.md` 2) No 3) Lint and typecheck (and tests).

## 19. Interview Questions
1. Why do teams use pull request templates?
2. What belongs in a Playwright PR test plan?
3. How does a template improve review quality?

## 20. Architect's Notes
Templates encode culture. If the box says “page objects, not copied locators,” you are teaching architecture on every PR. Align the template with [docs/architecture/code-review.md](../architecture/code-review.md).

## 21. Next Lesson
[Lesson 51 — CODEOWNERS](51-codeowners.md)
