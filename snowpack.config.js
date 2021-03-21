// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
  },
  plugins: [
    ['@snowpack/plugin-typescript', { tsc: "tsc" }], 
    ['@snowpack/plugin-run-script', { cmd: "npx tsc", watch: "$1 --watch", output: "stream" }],
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
