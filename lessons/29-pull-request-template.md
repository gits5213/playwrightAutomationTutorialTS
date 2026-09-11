# Lesson 29 — Pull request template

**Time:** about 15 minutes  
**You will:** give every PR the same checklist so reviews stay fair and fast  
**You need:** Lesson 27 and Lesson 28

---

## The idea

A **pull request (PR)** is a proposed change plus a conversation.

Without a template, every PR looks different. Some have no test plan. Some dump a novel. Reviewers guess.

A **PR template** is a form GitHub fills in when you click “New pull request.”

Kitchen picture: every dish leaves the kitchen with the same ticket: what it is, who cooked it, what to taste. That ticket is the template.

The live file is [.github/pull_request_template.md](../.github/pull_request_template.md).

---

## What this template asks

| Section | Why it is there |
| --- | --- |
| **Summary** | The “why” in a few sentences |
| **Type of change** | Tests vs framework vs CI vs docs |
| **Test plan** | Did they run Playwright? Are locators in a page object? |
| **Notes for reviewers** | Traces, surprises, screenshots |

The test plan matches the review checklist from Lesson 21. Reviewers should not have to invent a new standard every Monday. That is **maintainability** of the *team*, not only of the code.

---

## How it works with Actions and CODEOWNERS

On one PR, three robots (and humans) work together:

1. **Template** — the author fills in the story and checklist.
2. **CODEOWNERS** — GitHub requests the right reviewers.
3. **GitHub Actions** — Playwright runs in the cloud.

None of these replaces the others.

---

## Try it

You do not need to open a real PR to learn the file. Open the template and read it.

When you *do* open a PR on GitHub against this repo, the description box should already contain those headings. Tick the boxes that are true. Unticked boxes are useful: they tell the reviewer what is still missing.

Never tick “tests pass” if you did not run them.

---

## Industry habits

- Keep the template **one screen** long. People skip a five-page form.
- Ask for proof that matters (commands run, locators not duplicated).
- Do not demand screenshots for a docs-only typo.
- Combine with branch protection: CI green + required reviewers, then merge.

---

## Check that you got it

You can say:

> A PR template is a shared form. It plus CODEOWNERS plus GitHub Actions is how a team reviews Playwright changes without chaos.

**Next:** back to the [README — What “done well” looks like](../README.md#lesson-22--what-done-well-looks-like)
