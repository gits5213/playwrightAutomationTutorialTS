# Lesson 47 — Branching Strategy

## 1. What You Will Learn
- What a **branch** is
- A simple team flow: `main` → feature branch → pull request → review → merge
- Why this course does **not** teach full GitFlow

## 2. Why This Matters in Real Projects
`main` should always be the version CI trusts. Experiments (a new keyword, a factory change) happen on a **feature branch**. If the experiment fails, `main` is still green. That is how 5 tests become 5,000 without chaos.

## 3. Concept in Plain English
A branch is a named line of commits. `main` is the shared line. `feature/registration-pom` is your private line that starts from `main`. A **pull request** asks to copy your line back onto `main` after review.

## 4. Real-Life Analogy
`main` is the published textbook. Your branch is a draft chapter. Editors (reviewers) mark it up. Only then does it join the book. You do not scribble in the library copy.

## 5. Prerequisites
- [Lesson 46](46-git-fundamentals.md)

## 6. Files We Will Create or Modify
- None in the framework
- Git creates branch pointers; see also [docs/git/branching.md](../git/branching.md)

## 7. Step-by-Step Instructions
1. `git checkout main` and `git pull`.
2. `git checkout -b feature/registration-empty-form`.
3. Change tests or page objects. Commit.
4. `git push -u origin HEAD`.
5. Open a pull request. Wait for CI and review. Merge. Delete the branch.

## 8. Complete Code Example

```text
main
 ↓
feature/registration-pom
 ↓
Pull Request
 ↓
Review
 ↓
Merge
```

```bash
git checkout main
git pull
git checkout -b feature/registration-pom
git add src/pages/registration.page.ts
git commit -m "Move registration locators into a page object."
git push -u origin HEAD
```

## 9. Line-by-Line Explanation
- `-b` creates and switches to the new branch.
- Name the branch after the **job**, not after yourself.
- `-u origin HEAD` publishes the branch and sets tracking.
- Merge happens on GitHub after the PR (Lesson 49), not by force-pushing to `main`.

## 10. How to Run It

```bash
git branch --show-current
```

## 11. Expected Result
You see `feature/...`, not `main`, while you work. After merge, GitHub shows the PR as merged and CI green.

## 12. Common Beginner Mistakes
- Committing straight to `main`
- Long-lived branches that never pull `main`
- GitFlow extras (`develop`, `release/`, `hotfix/`) on a training repo with two contributors

## 13. How to Debug It
`git status` shows the branch name. If you committed on `main` by accident, talk to a mentor before moving commits. If GitHub rejects a push, `main` may be protected (Lesson 55).

## 14. Best Practices
- One pull request, one purpose
- Rebase or merge `main` into your branch when it moves
- Delete the feature branch after merge

## 15. What NOT to Do
- Do not invent GitFlow “because enterprise”
- Do not share one feature branch for unrelated chores (lint + new keyword + README novel)

## 16. Hands-On Exercise
Create `feature/practice-branch`, print `git branch --show-current`, switch back to `main`, delete the local practice branch if you did not push it.

## 17. Challenge Exercise
Sketch a PR title and body for adding the short-username negative case (`>= 5` characters).

## 18. Knowledge Check / Quiz
1. What is `main` for in this strategy?
2. What three steps sit between a feature branch and merge?
3. Why skip full GitFlow here?

**Answers:** 1) The always-releasable default 2) PR, review, merge 3) Extra branches without extra people add ceremony, not safety.

## 19. Interview Questions
1. Describe a simple branching strategy for a test-automation repo.
2. Why should `main` be protected?
3. When is GitFlow worth the cost?

## 20. Architect's Notes
Branching is a communication protocol. Keep it as small as the team. Add `release/` branches when you actually ship versions. Until then, `main` + short feature branches + required CI is enough.

## 21. Next Lesson
[Lesson 48 — Professional `.gitignore`](48-gitignore.md)
