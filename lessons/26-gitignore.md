# Lesson 26 — `.gitignore`

**Time:** about 15 minutes  
**You will:** keep junk, secrets, and generated reports out of GitHub  
**You need:** Lesson 2 (you have run tests at least once)

---

## The idea

**Git** remembers files you commit. **GitHub** is the shared copy.

Not everything on your laptop belongs in that shared copy.

Kitchen picture: you share the **recipe**, not the dirty dishes, not the spare house key.

`.gitignore` is a list of “do not pack this.” Git skips matching files when you commit.

The live list is [.gitignore](../.gitignore).

---

## What this project ignores (and why)

| Pattern | Why |
| --- | --- |
| `.env` | Passwords and local URLs. Use [.env.example](../.env.example) as a blank template. |
| `node_modules/` | Thousands of installed packages. Anyone can run `npm install`. |
| `test-results/` | Screenshots, videos, traces from **your** last run. |
| `playwright-report/` | HTML report generated every run. CI can upload it as an artifact. |
| `playwright/.auth/` | Saved login cookies. Treat them like passwords. |
| `.DS_Store` | A Mac folder file. Noise. |

The line `!.env.example` means “ignore `.env` files, **except** the example.” That is how teammates learn which names to set without seeing real secrets.

---

## Try it

After a test run, in Terminal:

```bash
git status
```

You should **not** see `node_modules/`, `test-results/`, or `playwright-report/` as new files to commit.

If you *do* see them, the ignore file is missing or those folders were committed earlier. Fix `.gitignore`, then leave those folders unstaged.

Never “just this once” commit `.env`. Once a secret is on GitHub, you rotate the password. Deleting the file later is not enough.

---

## Industry habits

- Ignore **generated** output and **secrets**.
- **Do** commit source, tests, `package-lock.json`, workflow files, and `.env.example`.
- If a file was committed before you ignored it, ignoring it later will not un-track it. Ask someone who knows Git to remove it from the index (`git rm --cached`), then commit. Do not guess with force-push.

---

## Check that you got it

You can say:

> `.gitignore` keeps secrets, installed packages, and test reports off GitHub. The recipe stays. The mess stays on my machine.

**Next:** [Lesson 27 — GitHub Actions](27-github-actions.md)
