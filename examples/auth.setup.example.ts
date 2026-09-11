/**
 * TEMPLATE ONLY — not run as part of this demo.
 *
 * The to-do practice site has no login screen. Copy this pattern when
 * your own app does. Wire it up as a Playwright setup project, then
 * point other projects at the saved storageState file.
 *
 * See README Lesson 18.
 */
import { test as setup, expect } from '@playwright/test';
import path from 'node:path';
import { env } from '../src/utils/env';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  if (!env.userEmail || !env.userPassword) {
    throw new Error('Set TEST_USER_EMAIL and TEST_USER_PASSWORD before running auth setup.');
  }

  await page.goto('/login');
  await page.getByLabel('Email').fill(env.userEmail);
  await page.getByLabel('Password').fill(env.userPassword);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.context().storageState({ path: authFile });
});
