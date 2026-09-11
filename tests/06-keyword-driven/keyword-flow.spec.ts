import { test, expect } from '../../src/fixtures';
import { createRegistrationUser } from '../../src/factories/registrationDataFactory';
import { env } from '../../src/utils/env';

test('keyword runner fills a typed list of business steps @keywords @registration', async ({ keywordRunner, registrationPage }) => {
  const user = createRegistrationUser();

  await keywordRunner.execute([
    { keyword: 'ENTER_FIRST_NAME', value: user.firstName },
    { keyword: 'ENTER_LAST_NAME', value: user.lastName },
    { keyword: 'ENTER_EMAIL', value: user.email },
    { keyword: 'ENTER_PHONE', value: user.phone },
    { keyword: 'ENTER_USERNAME', value: user.username },
    { keyword: 'ENTER_PASSWORD', value: user.password },
    { keyword: 'CONFIRM_PASSWORD', value: user.confirmPassword },
    { keyword: 'SELECT_GENDER', value: user.gender },
    { keyword: 'ENTER_DATE_OF_BIRTH', value: user.dateOfBirth },
    { keyword: 'SELECT_COUNTRY', value: user.country },
    { keyword: 'ACCEPT_TERMS' },
  ]);

  await expect(registrationPage.firstName).toHaveValue(user.firstName);
  await expect(registrationPage.email).toHaveValue(user.email);
  await expect(registrationPage.terms).toBeChecked();
});

// Assertions for this test live inside RegistrationKeywords.expectSuccess.
// eslint-disable-next-line playwright/expect-expect
test('valid user can register through named keywords @keywords @registration', async ({ registrationKeywords }) => {
  // Opt-in only: submitting valid data can create a practice account.
  // eslint-disable-next-line playwright/no-skipped-test -- gated by RUN_REGISTRATION_SUBMISSION
  test.skip(!env.runRegistrationSubmission, 'Set RUN_REGISTRATION_SUBMISSION=true to submit the live form');

  const user = await registrationKeywords.fillValidForm();
  await registrationKeywords.submitRegistration();
  await registrationKeywords.expectSuccess(user);
});
