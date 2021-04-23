const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
  // next config here
  target: "serverless",
});
