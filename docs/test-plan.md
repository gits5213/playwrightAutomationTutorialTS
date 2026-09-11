# Registration form test plan

Application: [GITS practice registration form](https://gitsuniversity.org/practice/registration-form/).

This plan lists scenarios **observed on the live page** (and encoded in `src/data/` and the e2e specs). Do not treat a generic “all fields required” checklist as truth.

**Safety:** tests that complete a successful Register and create an account must be gated with `RUN_REGISTRATION_SUBMISSION=true` (or equivalent). Default CI should fill and validate without flooding the practice database.

| ID | Scenario | Data / notes | Steps | Expected (observed) | Automate? |
| --- | --- | --- | --- | --- | --- |
| TP-01 | Page load | None | Open form URL | Heading **Registration Form** visible; text **All fields are required.** visible; First Name and **Register** visible | Yes (`@smoke`) |
| TP-02 | Required controls present | None | Load page | First Name, Last Name, Email, Phone Number, Username, Password, Confirm Password, Gender, Date of Birth, Country, Terms checkbox, Register | Yes |
| TP-03 | Empty submit — required fields | All empty, click Register | Click Register with no fills | Errors: First name is required; Last name is required; Email is required; Phone number is required; Username is required; Password is required; Gender is required; Date of birth is required; Country is required; You must accept the terms and conditions. No success title | Yes |
| TP-04 | Empty submit — Confirm Password | Same as TP-03 | Observe Confirm Password error slot | **Confirm Password is NOT required when the form is empty** (no required message observed). Do not assert it as required in this case | Yes — assert absence / do not require that error |
| TP-05 | Invalid email | Valid form, email `invalid-email` | Fill, Register | `Invalid email format`; no success | Yes |
| TP-06 | Short username | Username length &lt; 5 (e.g. `ab`) | Fill, Register | `Username must be at least 5 characters` | Yes |
| TP-07 | Short password | Password length &lt; 8 (e.g. `123` with matching confirm) | Fill, Register | `Password must be at least 8 characters` | Yes |
| TP-08 | Password mismatch | `Practice1` vs `Practice2` | Fill, Register | `Passwords do not match` | Yes |
| TP-09 | Invalid phone | Not 10 digits (e.g. `123`) | Fill, Register | `Invalid phone number` | Yes |
| TP-10 | Terms required | Otherwise valid, terms unchecked | Fill without terms, Register | `You must accept the terms and conditions` | Yes |
| TP-11 | Successful registration | Unique email and username (`uniqueRegistrant()`), all valid fields, terms on | Fill, Register | Title **Registration Successful**; success email and name/username visible; Register another available | Yes **only** when `RUN_REGISTRATION_SUBMISSION` is true |
| TP-12 | Register another | After a success (gated) | Click Register another | Form and Register button visible again | Yes, same gate as TP-11 |
| TP-13 | Duplicate username / email | Unknown | — | **Not verified / do not automate until observed** | No |
| TP-14 | Future DOB / invalid date extras | Not fully characterized here | — | Only automate after you record the actual message | Not until observed |
| TP-15 | Terms and Conditions link | Link present in DOM | Load page | Link **Terms and Conditions** visible | Optional |

## Boundary reminders (observed)

- Username minimum **5** characters.
- Password minimum **8** characters.
- Phone: invalid when not accepted as a 10-digit number (message `Invalid phone number`).
- Email must look like an email (`Invalid email format`).

## Out of scope until proven

Whitespace-only names, unsupported characters, max lengths, and **duplicate username** are easy to invent and wrong. Mark them “not verified” in any student plan until the student watches the UI.

## Mapping to code

| Area | File |
| --- | --- |
| Load + empty + success | `tests/e2e/registration.spec.ts` |
| TP-05–TP-09 table | `src/data/registration-error-cases.ts`, `tests/e2e/registration.data-driven.spec.ts` |
| Required strings | `requiredFieldErrors` in `src/data/registration.data.ts` |
| Locators | `src/pages/registration.page.ts` |
