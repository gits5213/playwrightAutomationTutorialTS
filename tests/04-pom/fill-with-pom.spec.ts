import { test, expect } from '../../src/fixtures';
import { validRegistrant } from '../../src/data/registration.data';

test('page object fills the form without repeating locators @registration', async ({ registrationPage }) => {
  await registrationPage.fillRegistrationForm(validRegistrant);
  await registrationPage.acceptTerms();

  await expect(registrationPage.firstName).toHaveValue(validRegistrant.firstName);
  await expect(registrationPage.email).toHaveValue(validRegistrant.email);
  await expect(registrationPage.terms).toBeChecked();
  await expect(registrationPage.header.labsLink).toBeVisible();
});
