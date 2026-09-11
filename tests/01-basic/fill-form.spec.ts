import { test, expect } from '@playwright/test';

test('a learner can fill every registration field in one test', async ({ page }) => {
  await page.goto('/practice/registration-form/');

  await page.getByRole('textbox', { name: 'First Name *' }).fill('John');
  await page.getByRole('textbox', { name: 'Last Name *' }).fill('Doe');
  await page.getByRole('textbox', { name: 'Email *' }).fill('john.doe@example.com');
  await page.getByRole('textbox', { name: 'Phone Number *' }).fill('1234567890');
  await page.getByRole('textbox', { name: 'Username *' }).fill('johndoe');
  await page.getByRole('textbox', { name: 'Password *', exact: true }).fill('Practice1');
  await page.getByRole('textbox', { name: 'Confirm Password *' }).fill('Practice1');
  await page.getByRole('combobox', { name: 'Gender *' }).selectOption({ label: 'Male' });
  await page.getByRole('textbox', { name: 'Date of Birth *' }).fill('1990-01-15');
  await page.getByRole('combobox', { name: 'Country *' }).selectOption({ label: 'United States' });
  await page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions *' }).check();

  await expect(page.getByRole('textbox', { name: 'First Name *' })).toHaveValue('John');
  await expect(page.getByRole('textbox', { name: 'Email *' })).toHaveValue('john.doe@example.com');
  await expect(page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions *' })).toBeChecked();
});
