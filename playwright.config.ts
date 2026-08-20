import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4326",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm exec vite preview --outDir dist --host 127.0.0.1 --port 4326",
    url: "http://127.0.0.1:4326",
    reuseExistingServer: false,
  },
  projects: [
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "desktop-chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
