import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  reporter: isCI ? [['html', { open: 'never' }], ['github']] : [['html']],
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: process.env.BASE_URL ?? 'https://demo.playwright.dev',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
  },
  // Start with Chromium while you learn. Uncomment the others when you want
  // the same tests on Firefox and Safari's engine (WebKit).
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
