 
module.exports = {
  testDir: './',
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...require('playwright').devices['Desktop Chrome'] },
    },
  ],
};
