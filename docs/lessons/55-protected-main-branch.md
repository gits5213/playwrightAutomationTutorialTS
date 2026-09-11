# Lesson 55 — Protected Main Branch

## 1. What You Will Learn
- What **branch protection** is on GitHub
- Recommended rules for `main` in a training or team repo
- Why this lesson documents settings and does **not** click them for you

## 2. Why This Matters in Real Projects
A perfect workflow is useless if anyone can push broken locators to `main`. Protection turns lessons 49–54 into rules: PRs, checks, reviews, owners. Accidental `git push origin main` should fail.

## 3. Concept in Plain English
GitHub can refuse updates to `main` unless conditions are true. Those conditions are configured in the repository **Settings**, not in Playwright. YAML cannot fully protect `main` by itself.

## 4. Real-Life Analogy
The published textbook is in a locked case. You submit a draft (PR). Editors sign (approval). The printer verifies the pages (CI). Then a librarian copies it into the case (merge). Students do not write in the display copy.

## 5. Prerequisites
- [Lesson 49](49-pull-request-process.md) through [Lesson 54](54-ci-optimization.md)
- Permission to view repo settings (or a mentor who does)

## 6. Files We Will Create or Modify
- No repo files required
- Remote GitHub settings only (human, in the browser)

## 7. Step-by-Step Instructions
1. GitHub → repository → **Settings** → **Branches** (or Rulesets).
2. Add a rule for `main`.
3. Enable the boxes in section 8.
4. Replace CODEOWNERS placeholders **before** requiring code-owner review.
5. Try pushing directly to `main` from a test account — it should be rejected.

## 8. Complete Code Example

Recommended rules (document, do not script):

- Require a pull request before merging
- Require at least one approval
- Require status checks to pass (Playwright workflow, lint, typecheck)
- Dismiss stale approvals when new commits land (optional but useful)
- Require conversation resolution
- Require review from Code Owners (after real usernames exist)
- Block force pushes
- Block deletions of `main`
- Restrict who can push (nobody, or admins only)

## 9. Line-by-Line Explanation
- **Require PRs** — no drive-by commits on the textbook.
- **Approvals** — a second human.
- **Status checks** — the robot from Lesson 53 must be green.
- **Conversation resolution** — “fixed in a follow-up” cannot hide an unresolved locator debate.
- **Code owners** — pages and workflows get the right reviewers.
- **No direct push** — even repo admins should prefer PRs in a class setting.

## 10. How to Run It
There is no npm command. After settings are saved, open a PR and confirm the merge box lists required checks.

## 11. Expected Result
The merge button stays disabled until review + CI pass. Direct pushes to `main` fail. Students learn the real team constraint.

## 12. Common Beginner Mistakes
- Requiring CODEOWNERS while `@YOUR_GITHUB_USERNAME` is still a placeholder (every PR stuck)
- Requiring a check name that does not match the workflow job
- Admins bypassing protection “just this once”

## 13. How to Debug It
Read the PR’s **Checks** and **Reviews** panels. If merge is blocked, GitHub lists the missing rule. If you are an admin and it still merged, look for “Allow bypass.” Turn that off for training.

## 14. Best Practices
- Protect `main` (and `master` if it exists)
- Name checks after stable workflow job names
- Document who may bypass, if anyone

## 15. What NOT to Do
- Do not change another person’s org settings unless they asked
- Do not protect a branch that has no CI yet (you will freeze the class)
- Do not use protection as a substitute for teaching

## 16. Hands-On Exercise
Write down which required check names you see on a PR. Match them to steps in `playwright.yml`.

## 17. Challenge Exercise
Propose a ruleset for a company with 20 SDETs: PR + 1 owner + CI, plus nightly cross-browser without blocking merge.

## 18. Knowledge Check / Quiz
1. Can `playwright.yml` alone stop a push to `main`?
2. Why replace CODEOWNERS placeholders first?
3. Name three protection rules from this lesson.

**Answers:** 1) No 2) Fake owners block all PRs 3) e.g. require PR, require checks, require approval.

## 19. Interview Questions
1. How would you protect `main` for a test-automation repository?
2. Which status checks would you require?
3. What is the risk of admin bypass?

## 20. Architect's Notes
Governance is an enterprise layer (Level 5 in the next lesson). It does not make tests faster. It makes architecture durable: the layers you taught cannot be discarded in a Friday hotfix on `main`.

## 21. Next Lesson
[Lesson 56 — Evolution of the Framework](56-evolution-of-the-framework.md)
