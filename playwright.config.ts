import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  expect: {
    timeout: 50000,
  },
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5047',
    headless: true,
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
