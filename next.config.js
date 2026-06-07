const path = require("path");

module.exports = {
  // Explicitly set the turbopack root to the current project directory to prevent Next.js
  // from inferring the workspace root to be the parent directory containing multiple lockfiles.
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/about/about.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/blog/blog.html",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};
