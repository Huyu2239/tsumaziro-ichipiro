const setupPuppeteer = require("jest-environment-puppeteer/setup");
const {setup: setupDevServer} = require("jest-dev-server");

module.exports = async function globalSetup(globalConfig, projectConfig) {
  await setupPuppeteer(globalConfig);

  globalThis.servers = await setupDevServer([
    {
      command: `npm run generate:test -prefix ../batch && PORT=${projectConfig.globals.API_PORT} npm run start:test -prefix ../api`,
      port: projectConfig.globals.API_PORT,
      launchTimeout: 30000,
    },
    {
      command: `API_PORT=5555 PORT=4444 npm run start:test -prefix ../front`,
      port: projectConfig.globals.FRONT_PORT,
      launchTimeout: 30000,
    },
  ]);
};
