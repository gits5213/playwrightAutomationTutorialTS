import { test, expect } from '../../src/fixtures';
import { requiredFieldErrors } from '../../src/data/registration.data';
import { registrationErrorCases } from '../../src/data/registration-error-cases';

test('empty form shows required field errors @negative @registration', async ({ registrationPage }) => {
  await registrationPage.submit();

  await expect(registrationPage.error('firstName')).toContainText(requiredFieldErrors.firstName);
  await expect(registrationPage.error('lastName')).toContainText(requiredFieldErrors.lastName);
  await expect(registrationPage.error('email')).toContainText(requiredFieldErrors.email);
  await expect(registrationPage.error('phone')).toContainText(requiredFieldErrors.phone);
  await expect(registrationPage.error('username')).toContainText(requiredFieldErrors.username);
  await expect(registrationPage.error('password')).toContainText(requiredFieldErrors.password);
  await expect(registrationPage.error('gender')).toContainText(requiredFieldErrors.gender);
  await expect(registrationPage.error('dateOfBirth')).toContainText(requiredFieldErrors.dateOfBirth);
  await expect(registrationPage.error('country')).toContainText(requiredFieldErrors.country);
  await expect(registrationPage.error('terms')).toContainText(requiredFieldErrors.terms);
  await expect(registrationPage.successTitle).toHaveCount(0);
});

for (const row of registrationErrorCases) {
  test(`registration rejects ${row.name} @negative @data @registration`, async ({ registrationPage }) => {
    await registrationPage.fillValid(row.override);
    await registrationPage.submit();

    await expect(registrationPage.error(row.errorField)).toContainText(row.errorText);
    await expect(registrationPage.successTitle).toHaveCount(0);
  });
}
