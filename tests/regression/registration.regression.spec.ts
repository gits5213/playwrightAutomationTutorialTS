import { test, expect } from '../../src/fixtures';
import { requiredFieldErrors } from '../../src/data/registration.data';
import { env } from '../../src/utils/env';
import { createRegistrationUser } from '../../src/factories/registrationDataFactory';

test.describe('registration regression @regression @registration', () => {
  test.describe.configure({ timeout: 45_000 });

  test('empty submit does not create success', async ({ registrationPage }) => {
    await registrationPage.submit();
    await expect(registrationPage.error('firstName')).toContainText(requiredFieldErrors.firstName);
    await expect(registrationPage.successTitle).toHaveCount(0);
  });

  test('register another account returns to the form', async ({ registrationPage }) => {
    // eslint-disable-next-line playwright/no-skipped-test -- gated by RUN_REGISTRATION_SUBMISSION
    test.skip(!env.runRegistrationSubmission, 'Set RUN_REGISTRATION_SUBMISSION=true to submit the live form');

    await registrationPage.fillRegistrationForm(createRegistrationUser());
    await registrationPage.acceptTerms();
    await registrationPage.submit();
    await expect(registrationPage.registerAnotherButton).toBeVisible();

    await registrationPage.startAnotherRegistration();

    await expect(registrationPage.registerButton).toBeVisible();
    await expect(registrationPage.heading).toBeVisible();
  });
});
