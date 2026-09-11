import { test, expect } from '@playwright/test';

test('filled fields keep the values a person typed @registration', async ({ page }) => {
  await page.goto('/practice/registration-form/');

  const firstName = page.getByRole('textbox', { name: 'First Name *' });
  await firstName.fill('Ada');

  await expect(firstName).toHaveValue('Ada');
  await expect(page.getByRole('heading', { name: 'Registration Form' })).toBeVisible();
  await expect(page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions *' })).not.toBeChecked();
});
