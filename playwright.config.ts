import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

const viewSizes = [
  { width: 768, height: 730 },
  { width: 1024, height: 730 },
  { width: 1280, height: 730 },
];
const firefox = "Desktop Firefox";
const safari = "Desktop Safari";
const chrome = "Desktop Chrome";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { open: "never", outputFolder: "tests/reports" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "firefox",
      use: { ...devices[firefox] },
    },
    {
      name: "safari",
      use: { ...devices[safari] },
    },
    ...viewSizes.map((viewSize) => ({
      name: `chrome-${viewSize.width}-${viewSize.height}`,
      use: {
        ...devices[chrome],
        viewport: { width: viewSize.width, height: viewSize.height },
      },
    })),
  ],
});
