/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildPath: ".netlify/functions-internal/server.js",
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.js"
      : undefined,
  ignoredRouteFiles: ["**/.*"],
  future: {
    unstable_tailwind: true,
    v2_normalizeFormMethod: true,
    v2_errorBoundary: true,
    v2_meta: true,
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: ".netlify/functions-internal/server.js",
  // publicPath: "/build/",
};
