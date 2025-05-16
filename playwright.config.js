const { defineConfig } = require("@playwright/test");
require("dotenv").config();

module.exports = defineConfig({
  use: {
    baseURL: process.env.BASE_URL || "https://itsam01.deha.vn",
  },
  projects: [
    {
      name: "Chromium",
      use: {
        browserName: "chromium",
        headless: false,
        token: process.env.PLAYWRIGHT_TOKEN || "default-token",
      },
    },
    {
      name: "Firefox",
      use: {
        browserName: "firefox",
        headless: false,
        token: process.env.PLAYWRIGHT_TOKEN || "default-token",
      },
    },
    {
      name: "WebKit",
      use: {
        browserName: "webkit",
        headless: false,
        token: process.env.PLAYWRIGHT_TOKEN || "default-token",
      },
    },
  ],
  outputDir: "test-results/",
});
