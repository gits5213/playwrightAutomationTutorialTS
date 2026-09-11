import { test, expect } from '@playwright/test';

test('a person can add one to-do item', async ({ page }) => {
  // Arrange
  await page.goto('/todomvc');

  // Act
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  // Assert
  await expect(page.getByTestId('todo-title')).toHaveText('Buy milk');
});
