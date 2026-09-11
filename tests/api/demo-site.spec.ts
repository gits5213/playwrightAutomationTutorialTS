import { test, expect } from '@playwright/test';

test('the demo site responds', async ({ request }) => {
  const response = await request.get('/todomvc');

  expect(response.ok()).toBeTruthy();
});
