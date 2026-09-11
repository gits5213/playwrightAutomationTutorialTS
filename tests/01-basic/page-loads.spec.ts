import { test, expect } from '@playwright/test';

test('the registration form page loads', async ({ page }) => {
  await page.goto('/practice/registration-form/');

  await expect(page.getByRole('heading', { name: 'Registration Form' })).toBeVisible();
  await expect(page.getByText('All fields are required.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});
