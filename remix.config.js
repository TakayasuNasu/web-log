/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildPath: ".netlify/functions-internal/server.js",
  tailwind: true,
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.js"
      : undefined,
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: ["remix-utils/client-only"],
  serverModuleFormat: "cjs",
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: ".netlify/functions-internal/server.js",
  // publicPath: "/build/",
}
