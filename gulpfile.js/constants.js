const paths = {
  src: "src/",
  css: "src/styles/*.css",
  ts: {
    source: "src/scripts/app.ts",
    allFiles: "src/scripts/**/*.ts",
    config: "./tsconfig.json",
  },
  js: {
    gulpfile: "gulpfile.js",
  },
  assets: "src/assets/*",
  manifest: "src/manifest.json",
  build: "build/",
};

const filenames = {
  css: "styles.css",
  js: "scripts.js",
};

exports.paths = paths;
exports.filenames = filenames;
