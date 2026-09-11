import { test, expect } from '../../src/fixtures';
import { createRegistrationUser } from '../../src/factories/registrationDataFactory';
import { env } from '../../src/utils/env';

test('registration heading, fields, and Register are visible @smoke @registration', async ({ registrationPage }) => {
  await expect(registrationPage.heading).toBeVisible();
  await expect(registrationPage.firstName).toBeVisible();
  await expect(registrationPage.registerButton).toBeVisible();
  await expect(registrationPage.termsLink).toBeVisible();
});

test('should register a valid user @smoke @registration', async ({ registrationPage }) => {
  // eslint-disable-next-line playwright/no-skipped-test -- gated by RUN_REGISTRATION_SUBMISSION
  test.skip(!env.runRegistrationSubmission, 'Set RUN_REGISTRATION_SUBMISSION=true to submit the live form');

  const user = createRegistrationUser();

  await registrationPage.fillRegistrationForm(user);
  await registrationPage.acceptTerms();
  await registrationPage.submit();

  await expect(registrationPage.successTitle).toContainText('Registration Successful');
  await expect(registrationPage.successEmail).toContainText(user.email);
});
