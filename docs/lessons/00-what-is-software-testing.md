# Lesson 00 — What Is Software Testing?

## 1. What You Will Learn

You will be able to explain software testing in everyday words. You will name the difference between a check that a person does by hand and a check that a computer repeats. You will open the live registration form and list what a tester would verify.

## 2. Why This Matters in Real Projects

**Problem:** websites change every week. A new field, a new button, or a small copy edit can break something that used to work.

**Why it hurts:** customers cannot register, support tickets pile up, and the team loses trust in the release.

**Simple solution:** test on purpose before users do. A tester follows a checklist and records pass or fail.

**Enterprise version:** companies keep a regression suite so old paths still work after every change.

## 3. Concept in Plain English

Software testing is asking, “Does this product still do what we promised?” You pick a goal, do the steps, and check the result. If the result matches the promise, the check **passes**. If it does not, the check **fails**, and that failure is useful: it points to a bug.

On [the GITS registration form](https://gitsuniversity.org/practice/registration-form/) a tester might ask: Can a person fill First Name, Last Name, Email, and the rest, click **Register**, and see **Registration Successful**?

## 4. Real-Life Analogy

Think of a restaurant opening night. The cook does not wait for guests to discover a cold oven. Someone tastes the soup, checks the plates, and writes down what is wrong. Testing is that kitchen check for a website.

## 5. Prerequisites

None. You only need a browser and curiosity.

## 6. Files We Will Create or Modify

None. This lesson is reading and observation only.

## 7. Step-by-Step Instructions

1. Open [https://gitsuniversity.org/practice/registration-form/](https://gitsuniversity.org/practice/registration-form/) in Chrome.
2. Read the heading **Registration Form**.
3. Notice required fields marked with `*`: First Name, Last Name, Email, Phone Number, Username, Password, Confirm Password, Gender, Date of Birth, Country, and Terms.
4. Leave every field empty and click **Register**. Write down the red messages you see.
5. Do **not** invent extra rules. Only record what the page actually shows.

## 8. Complete Code Example

There is no test file yet. This is the idea a later test will capture:

```typescript
// Later, Playwright will do the same checklist:
// 1. Open the registration form
// 2. Click Register with the form empty
// 3. Check that "First name is required" is visible
```

## 9. Line-by-Line Explanation

The comments above are a **test idea**, not a running test. Line 1 is the page. Line 2 is the action. Line 3 is the check. Every real test in this course follows that shape: open, act, check.

## 10. How to Run It

Nothing to run in a terminal. Refresh the live form and click **Register** by hand.

## 11. Expected Result

You should see required messages such as **First name is required**, **Email is required**, and **You must accept the terms and conditions**. Confirm Password does **not** show a required message when the whole form is empty. That is a real fact about this page, not a bug you should “fix” in a test.

## 12. Common Beginner Mistakes

- Guessing rules that the page never shows.
- Treating a fail as a personal mistake. A fail is information.
- Testing only the happy path and ignoring empty or invalid data.

## 13. How to Debug It

If you see no red messages, scroll. If the browser shows its own “Please fill out this field” balloon, that is the browser, not the page’s message. Later lessons show how tests prefer the page’s own text.

## 14. Best Practices

Test what a person can see and do. Write down the exact message text. One checklist item should check one promise.

## 15. What NOT to Do

Do not assume Confirm Password is required just because Password is. Do not skip reading the live page. Do not start with automation before you can describe the check in English.

## 16. Hands-On Exercise

On the live form, write five checks a tester would run. Include at least one successful registration idea and one empty-form idea.

## 17. Challenge Exercise

Fill only Email with `not-an-email` and submit. Record the exact message. Compare it with leaving Email blank. Those are two different checks.

## 18. Knowledge Check / Quiz (3-5 questions, answers at the bottom in a collapsed-style "Answers" section)

1. What does a **fail** tell you?
2. What is the heading on the practice form?
3. Does Confirm Password show a required message when the whole form is empty?
4. Name one required message you saw after an empty submit.

<details>
<summary>Answers</summary>

1. Something did not match the promise. Look there.
2. Registration Form.
3. No.
4. Any of: First name is required, Last name is required, Email is required, Phone number is required, Username is required, Password is required, Gender is required, Date of birth is required, Country is required, You must accept the terms and conditions.

</details>

## 19. Interview Questions

1. What is software testing, in one or two sentences?
2. Why do teams still test features that used to work?
3. What is the difference between a defect and a failed test?

## 20. Architect's Notes

In a company, testing is not “click around until it feels fine.” It is a risk filter. You spend time on paths that lose money or data if they break. Registration is almost always one of those paths.

## 21. Next Lesson

Continue with [Lesson 01](01-what-is-test-automation.md).
