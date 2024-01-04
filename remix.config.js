/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: ["@glideapps/glide-data-grid", "remix-utils"],
  postcss: true,
  serverBuildPath: "./build/index.js",
  tailwind: true,
  publicPath: "/build/", // default value, can be removed
  serverMainFields: ["main", "module"], // default value, can be removed
  serverMinify: false, // default value, can be removed
  serverModuleFormat: "cjs", // default value in 1.x, add before upgrading
  serverPlatform: "node", // default value, can be removed
  
};
