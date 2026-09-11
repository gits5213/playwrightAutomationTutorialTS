# Lesson 46 — Git Fundamentals

## 1. What You Will Learn
- Working directory, staging, commit, and GitHub
- Everyday commands: `status`, `add`, `commit`, `push`, `pull`
- Why tests belong in Git with the framework, not only on one laptop

## 2. Why This Matters in Real Projects
If the registration page object lives only on your Desktop, the team cannot review it and CI cannot run it. Git is the shared memory of the suite. GitHub is the copy in the cloud plus pull requests.

## 3. Concept in Plain English
Git takes **snapshots** of files. You choose which changes go into a snapshot (**stage**), you label the snapshot (**commit**), then you send commits to GitHub (**push**). **Pull** brings other people’s commits to your machine.

## 4. Real-Life Analogy

```text
Working Directory     (your messy desk)
      ↓ git add
Staging               (the box going to the archive)
      ↓ git commit
Commit                (a labeled photo of the box)
      ↓ git push
GitHub                (the shared library)
```

## 5. Prerequisites
- Git installed (`git --version`)
- [Lesson 03](03-install-development-tools.md)

## 6. Files We Will Create or Modify
- No new framework files
- Git itself records changes to any file you stage (never `.env`)

## 7. Step-by-Step Instructions
1. `git status` — what changed?
2. `git add src/pages/registration.page.ts` — put that file in the box (or `git add .` for all tracked-folder changes).
3. `git commit -m "Explain why, not a file dump."`
4. `git push` — library copy.
5. `git pull` — get teammates’ snapshots before you keep working.

## 8. Complete Code Example

```bash
git status
git add src/data/registration.data.ts
git commit -m "Add unique registrant helper so emails do not collide."
git pull
git push
```

## 9. Line-by-Line Explanation
- `status` never changes files; it reports.
- `add` stages. Unstaged edits are not in the next commit.
- `commit -m` writes a snapshot with a message. Use **why**.
- `pull` fetches and merges remote commits.
- `push` sends your commits. It does not run Playwright unless a GitHub Action is set up (Lesson 53).

## 10. How to Run It

```bash
git status
```

## 11. Expected Result
You see `main` (or your branch), staged vs unstaged files, and untracked files. `.env` should stay untracked because `.gitignore` lists it.

## 12. Common Beginner Mistakes
- Committing `node_modules/` or `playwright-report/`
- Vague messages (`update`, `fix`)
- `git add .` then accidentally staging a secret file that was not ignored

## 13. How to Debug It
`git status` after every command. If you staged the wrong file, `git restore --staged path` (before commit). If you already committed locally and have **not** pushed, talk to a mentor before rewriting history. Never `push --force` to `main`.

## 14. Best Practices
- Small commits that match one idea (one locator change, one data row)
- Pull before you push
- Never commit passwords, tokens, or `.env`

## 15. What NOT to Do
- Do not email zip files of the repo instead of Git
- Do not store registration success cookies in Git (`playwright/.auth/` is ignored)

## 16. Hands-On Exercise
Change a comment in a lesson file, `git status`, stage it, then unstage it. Do not commit unless you mean to.

## 17. Challenge Exercise
Write three good commit messages for: a new negative phone test, a `.gitignore` fix, and a README typo.

## 18. Knowledge Check / Quiz
1. Order: working directory, staging, commit, GitHub — what command moves each step?
2. Does `git commit` run the registration tests?
3. Why is `git pull` important on a team?

**Answers:** 1) `add`, `commit`, `push` 2) No 3) You need others’ commits before you add yours.

## 19. Interview Questions
1. Explain working directory vs staging vs commit.
2. What belongs in a commit message?
3. How does Git support a maintainable test framework?

## 20. Architect's Notes
Git is not a backup drive. It is a reviewable history. Architecture decisions (why Confirm Password is not asserted as required on empty submit) belong in commits and docs, not in someone’s memory.

## 21. Next Lesson
[Lesson 47 — Branching Strategy](47-branching-strategy.md)
