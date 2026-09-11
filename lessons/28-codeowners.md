# Lesson 28 — CODEOWNERS

**Time:** about 15 minutes  
**You will:** auto-request the right reviewers when a folder changes  
**You need:** a GitHub repo (this one is `gits5213/playwrightAutomationTutorialTS`)

---

## The idea

**CODEOWNERS** is a guest list per room of the house.

When a pull request touches `src/pages/`, GitHub **requests a review** from the people listed for that folder. You do not rely on memory.

Kitchen picture: if someone changes the oven settings, the head chef is pinged. If someone only edits a menu card, a different person can review.

The live file is [.github/CODEOWNERS](../.github/CODEOWNERS).

---

## How to read a line

```text
/src/pages/ @gits5213
```

Means: “files under `src/pages/` → ask `@gits5213` to review.”

```text
* @gits5213
```

Means: “everything else still has a default owner.”

More specific paths win over `*`. Teams often use a GitHub **team** (`@your-org/qa-leads`) instead of one person so vacation does not block merges.

Replace `@gits5213` with your username or team when you fork this tutorial.

---

## Why this helps the three ideas

| Idea | What CODEOWNERS does |
| --- | --- |
| **Maintainability** | Page objects and fixtures are not merged unreviewed |
| **Reusability** | The people who own shared keywords see every change |
| **Scalability** | A 20-person team does not @-mention randomly |

It is a quality gate, like CI, but for **humans**.

---

## Try it

1. Open [.github/CODEOWNERS](../.github/CODEOWNERS).
2. Confirm your GitHub username is listed (or add a teammate).
3. On GitHub, a PR that changes `src/pages/todo.page.ts` should show that person under **Reviewers**.

The file must live at `.github/CODEOWNERS` (or `docs/CODEOWNERS`, or the repo root). This project uses `.github/` next to the workflow and the PR template.

---

## Industry habits

- Keep the list **short**. If everyone owns everything, nobody owns anything.
- Protect **framework** folders (`pages`, `fixtures`, `keywords`, `.github`) more tightly than a single spec.
- Optional: in the GitHub repo, require reviews from code owners (Settings → Rules). That is a team choice.

---

## Check that you got it

You can say:

> CODEOWNERS maps folders to reviewers. GitHub asks those people automatically on a pull request.

**Next:** [Lesson 29 — Pull request template](29-pull-request-template.md)
