module.exports = {
  preset: "jest-puppeteer",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.json" }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/../src/$1",
  },
  testMatch: ["**/src/**/*.ts"],
  testTimeout: 80000,
  globalSetup: "./jest-global-setup.js",
  globalTeardown: "./jest-global-teardown.js",
  globals: {
    FRONT_PORT: process.env.FRONT_PORT || 4444,
    FRONT_URL: `http://localhost:${process.env.FRONT_PORT || 4444}`,
    API_PORT: process.env.API_PORT || 5555,
    API_URL: `http://localhost:${process.env.FRONT_PORT || 5555}`,
  },
  watchman: false,
};

process.env.JEST_PUPPETEER_CONFIG = require.resolve(
  "./jest-puppeteer.config.js"
);
