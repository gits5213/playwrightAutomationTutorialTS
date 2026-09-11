# Lesson 51 — CODEOWNERS

## 1. What You Will Learn
- What a **CODEOWNERS** file is
- How GitHub requests reviewers from folder rules
- How to use a **placeholder** username until the owner fills it in

## 2. Why This Matters in Real Projects
Page objects and workflows affect everyone. CODEOWNERS makes sure the people who **own** `/src/pages/` see those diffs. It is not a vanity list. It is a routing table for review.

## 3. Concept in Plain English
You list paths and GitHub usernames. When a PR touches a matching path, GitHub **requests a review** from those users (when the branch requires owner review). Last matching rule can win depending on file order — keep the file small and obvious.

## 4. Real-Life Analogy
A school routing slip: homework about the gym goes to the PE teacher. Registration locators go to the page-object owner. CI YAML goes to whoever owns pipelines.

## 5. Prerequisites
- [Lesson 49](49-pull-request-process.md), [Lesson 50](50-pull-request-template.md)

## 6. Files We Will Create or Modify
- `.github/CODEOWNERS`

## 7. Step-by-Step Instructions
1. Create `.github/CODEOWNERS`.
2. Put the placeholder owner on `*` and on critical folders.
3. **TODO:** replace `@YOUR_GITHUB_USERNAME` with the real GitHub handle of the repository owner or team.
4. Enable “Require review from Code Owners” on `main` only after the placeholder is gone (Lesson 55).

## 8. Complete Code Example

```text
# TODO: Replace @YOUR_GITHUB_USERNAME with the real GitHub username
# or team (for example @your-org/qa-architects). Do not invent a name.

* @YOUR_GITHUB_USERNAME

/tests/ @YOUR_GITHUB_USERNAME
/src/pages/ @YOUR_GITHUB_USERNAME
/.github/workflows/ @YOUR_GITHUB_USERNAME
```

## 9. Line-by-Line Explanation
- Comments start with `#`.
- `*` is the default owner for unmatched files.
- `/tests/` owns specs. `/src/pages/` owns locators and actions. `/.github/workflows/` owns CI.
- `@YOUR_GITHUB_USERNAME` is a **placeholder**. It is not a real person. GitHub cannot request a review until you replace it.

## 10. How to Run It
There is no npm script. After you replace the placeholder, open a PR that changes `src/pages/registration.page.ts` and confirm GitHub requests the owner.

## 11. Expected Result
With a real username and protected `main`, a pages-folder PR shows that person as a required reviewer. With the placeholder left as-is, GitHub will not find a valid owner.

## 12. Common Beginner Mistakes
- Inventing a cute username that does not exist
- Owning the entire repo as 20 people (noise)
- Forgetting the leading `/` when you meant a root folder

## 13. How to Debug It
GitHub shows a CODEOWNERS error on the PR if a name is invalid. Open the **CODEOWNERS** file view on GitHub; it highlights bad rules. Do not “fix” it by deleting ownership of `/.github/`.

## 14. Best Practices
- Small list, real people or teams
- Owners for pages, keywords, fixtures, and workflows
- Keep the TODO visible until replacement

## 15. What NOT to Do
- **Do not invent an actual GitHub username** in training materials
- Do not put personal emails in CODEOWNERS
- Do not use CODEOWNERS as a substitute for CI

## 16. Hands-On Exercise
Read `.github/CODEOWNERS`. If you still see `@YOUR_GITHUB_USERNAME`, write a TODO on your checklist to replace it with **your** handle only.

## 17. Challenge Exercise
Add a line for `/src/keywords/` with the same placeholder and a comment explaining why keywords need a careful review.

## 18. Knowledge Check / Quiz
1. Where should CODEOWNERS live in this course?
2. What must you do with `@YOUR_GITHUB_USERNAME`?
3. Does CODEOWNERS run Playwright?

**Answers:** 1) `.github/CODEOWNERS` 2) Replace it with a real user or team 3) No — it only routes reviews.

## 19. Interview Questions
1. How do CODEOWNERS work on a pull request?
2. Which folders would you own in a Playwright framework, and why?
3. What goes wrong if owners are fake or outdated?

## 20. Architect's Notes
Ownership should match blast radius. Locators have high blast radius. A README typo does not. Required owners on CI YAML prevent silent pipeline edits. Replace the placeholder before you enforce owner reviews, or you will block every PR.

## 21. Next Lesson
[Lesson 52 — CI/CD Fundamentals](52-cicd-fundamentals.md)
