# Lesson 21 — Test Data Factory

## 1. What You Will Learn
- Build a **factory** that returns a valid registrant every time.
- Generate unique `email` and `username` **without** the Faker library.
- Gate real Register clicks behind `RUN_REGISTRATION_SUBMISSION=true`.

## 2. Why This Matters in Real Projects
Hard-coded `john.doe@example.com` fails when two tests run at once, or when the site remembers that email. A factory builds a fresh person in one place. You also must not spam the practice site with endless success accounts.

## 3. Concept in Plain English
A **factory** is a function that **makes** test data. You call `createRegistrant()`, get a complete person, and optionally override one field (`lastName: 'Lee'`). Emails include a timestamp so they never clash.

## 4. Real-Life Analogy
A school office has a form stamp: every new student gets a unique ID. Staff do not photocopy yesterday’s form. The factory is that stamp.

## 5. Prerequisites
- [Lesson 19](19-multiple-data-sets.md) and [Lesson 20](20-json-based-test-data.md).
- You know the registrant fields: `firstName`, `email`, `username`, `password`.

## 6. Files We Will Create or Modify
| File | Role |
| --- | --- |
| `src/factories/registrationDataFactory.ts` | Builds unique people |
| `src/data/registration.data.ts` | Shared `RegistrationPerson` type |
| `tests/e2e/registration.spec.ts` | Uses the factory; submits only when allowed |

## 7. Step-by-Step Instructions
1. Create `src/factories/registrationDataFactory.ts`.
2. Return a full `RegistrationPerson` with defaults (John Doe, United States).
3. Build `email` and `username` from `Date.now()` (no Faker).
4. Accept `overrides` so one test can change only country or password.
5. In success tests, click Register only if `process.env.RUN_REGISTRATION_SUBMISSION === 'true'`.

## 8. Complete Code Example

```typescript
import { type RegistrationPerson, validRegistrant } from '../data/registration.data';

export function createRegistrant(
  overrides: Partial<RegistrationPerson> = {},
): RegistrationPerson {
  const stamp = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    ...validRegistrant,
    email: `student.${stamp}@example.com`,
    username: `user${stamp}`.slice(0, 16),
    ...overrides,
  };
}

export function canSubmitRegistration(): boolean {
  return process.env.RUN_REGISTRATION_SUBMISSION === 'true';
}
```

## 9. Line-by-Line Explanation
- `Partial<RegistrationPerson>` — override any field, not all of them.
- `stamp` — time plus a small random number; unique enough for local and CI runs.
- `email: student.${stamp}@example.com` — never reuse `john.doe@example.com` for submit tests.
- `username` sliced to 16 — stays within typical username limits.
- `canSubmitRegistration()` — success submit is **opt-in**, to prevent account spam.

## 10. How to Run It

```bash
npx playwright test tests/e2e/registration.spec.ts --project=chromium
RUN_REGISTRATION_SUBMISSION=true npx playwright test tests/e2e/registration.spec.ts -g "successful registration"
```

## 11. Expected Result
Without the flag, fill-and-assert tests pass and success **submit** tests skip or stop before Register. With the flag, you see **Registration Successful** and the unique email on the page.

## 12. Common Beginner Mistakes
- Installing Faker “because tutorials do.” You do not need it here.
- Spreading `overrides` **before** unique email, which can accidentally reuse a fixed email.
- Always clicking Register in CI and creating hundreds of practice accounts.

## 13. How to Debug It
`console.log(createRegistrant().email)` — you should see a changing number. If submit is skipped, print `process.env.RUN_REGISTRATION_SUBMISSION`. If username fails validation, check the 5-character minimum and 16-character slice.

## 14. Best Practices
- One factory per domain object (`createRegistrant`).
- Unique only the fields that must be unique (`email`, `username`).
- Default to **not** submitting success registrations.

## 15. What NOT to Do
Do not call Faker for a timestamp. Do not commit real student emails. Do not skip uniqueness because “I run tests one at a time.” Parallel runs will break that habit.

## 16. Hands-On Exercise
Call `createRegistrant({ country: 'Canada' })` and assert `country` is Canada while `email` still contains a stamp.

## 17. Challenge Exercise
Add `createInvalidRegistrant('email')` that returns a valid person with `email: 'invalid-email'`, then use it in a `@negative` test.

## 18. Knowledge Check / Quiz
1. Why not use `john.doe@example.com` for every success test?
2. Why avoid Faker in this lesson?
3. What does `RUN_REGISTRATION_SUBMISSION=true` protect against?

### Answers
1. Collisions in parallel runs and on a site that remembers emails.
2. `Date.now()` is enough for unique email/username; fewer dependencies.
3. Accidental spam of success registrations on the practice form.

## 19. Interview Questions
1. What is a test-data factory, and how is it different from a static JSON file?
2. How do you generate unique users without third-party libraries?
3. How should destructive or “create account” tests be gated in shared environments?

## 20. Architect's Notes
Factories belong next to data, not inside specs. JSON lists (Lesson 20) are for **known** examples. Factories are for **fresh** identities. Keep `RUN_REGISTRATION_SUBMISSION` off by default in `playwright.config` and CI unless a job is meant to submit.

## 21. Next Lesson
[Lesson 22 — What Is Keyword-Driven Automation?](22-what-is-keyword-driven-automation.md)
