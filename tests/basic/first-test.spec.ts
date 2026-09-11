import { test, expect } from '@playwright/test';

test('the to-do page shows a heading', async ({ page }) => {
  await page.goto('/todomvc');

  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
});
