import { test, expect } from '@playwright/test';

test('every required control is findable by role and accessible name @registration', async ({ page }) => {
  await page.goto('/practice/registration-form/');

  await expect(page.getByRole('textbox', { name: 'First Name *' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Last Name *' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Email *' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Phone Number *' })).toBeVisible();
  await expect(page.getByPlaceholder('1234567890')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Username *' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password *', exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Confirm Password *' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Gender *' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Date of Birth *' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Country *' })).toBeVisible();
  await expect(page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions *' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Terms and Conditions' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});
