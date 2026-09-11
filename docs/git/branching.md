# Branching (simple)

This course uses **`main` + short feature branches + pull requests**. It is not GitFlow. There is no required `develop`, `release/*`, or `hotfix/*` branch.

Deep teaching: [Lesson 46](../lessons/46-git-fundamentals.md), [Lesson 47](../lessons/47-branching-strategy.md), [Lesson 49](../lessons/49-pull-request-process.md).

## Picture

```text
main
  └── feature/registration-pom     → pull request → review → merge → delete branch
```

`main` is the default, CI-trusted line. You do not commit classroom experiments onto it directly (and Lesson 55 asks GitHub to refuse those pushes).

## Everyday commands

```bash
git checkout main
git pull
git checkout -b feature/registration-empty-form
# ... edit, run tests ...
git add -p
git commit -m "Assert empty registration form shows observed required messages."
git push -u origin HEAD
```

Then open a pull request into `main`. Wait for GitHub Actions. Address review. Merge. Delete the feature branch.

## Naming

- `feature/...` — new coverage or framework seams
- `fix/...` — a broken locator or CI step
- `docs/...` — lessons only

Name the **job**, not the person (`feature/ada` is not useful in a month).

## Why not GitFlow here

GitFlow earns its keep when you ship numbered releases from a repo with many concurrent streams. A training framework and most product QA repos move faster with one durable branch and reviewed merges. Add extra long-lived branches when you have an actual release process — not before.

## Conflict habit

Pull or merge `main` into your feature branch before you ask for review, so the PR is not secretly unmergeable. See [troubleshooting](../troubleshooting/README.md) for merge conflicts.
