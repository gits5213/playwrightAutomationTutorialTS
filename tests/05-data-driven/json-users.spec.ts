import users from '../../src/data/registration-users.json';
import { test, expect } from '../../src/fixtures';

test('JSON data can fill the form without submitting @data @registration', async ({
  registrationPage,
}) => {
  const row = users[0];

  await registrationPage.fillRegistrationForm(row);
  await registrationPage.acceptTerms();

  await expect(registrationPage.firstName).toHaveValue(row.firstName);
  await expect(registrationPage.email).toHaveValue(row.email);
});
