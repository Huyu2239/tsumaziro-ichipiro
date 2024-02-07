const teardownPuppeteer = require("jest-environment-puppeteer/teardown");
const { teardown: teardownDevServer } = require("jest-dev-server");

module.exports = async function globalTeardown(globalConfig) {
  await teardownDevServer(globalThis.servers);
  await teardownPuppeteer(globalConfig);
};
