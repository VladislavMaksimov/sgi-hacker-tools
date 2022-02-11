const { series, parallel, src, dest, watch } = require("gulp");
const clean = require("gulp-clean");
const concatCss = require("gulp-concat-css");
const autoprefixer = require("gulp-autoprefixer");
const esBuild = require("gulp-esbuild");
const prettier = require("gulp-prettier");

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

const clearDest = () => src(paths.build, { allowEmpty: true }).pipe(clean());

const buildStyles = () =>
  src(paths.css)
    .pipe(autoprefixer())
    .pipe(concatCss(filenames.css))
    .pipe(dest(paths.build));

const buildScripts = () =>
  src(paths.ts.source)
    .pipe(
      esBuild({
        outfile: filenames.js,
        bundle: true,
        tsconfig: paths.ts.config,
      })
    )
    .pipe(dest(paths.build));

const copyManifest = () => src(paths.manifest).pipe(dest(paths.build));

const copyAssets = () => src(paths.assets).pipe(dest(paths.build));

const build = series(
  clearDest,
  parallel(buildStyles, buildScripts, copyManifest, copyAssets)
);

const fixGulpfile = () =>
  src(paths.js.gulpfile)
    .pipe(prettier())
    .pipe(dest((file) => file.base));

const fixTs = () =>
  src(paths.ts.allFiles)
    .pipe(prettier())
    .pipe(dest((file) => file.base));

const fixCss = () =>
  src(paths.css)
    .pipe(prettier())
    .pipe(dest((file) => file.base));

const fix = parallel(fixGulpfile, fixTs, fixCss);

const watchBuild = () =>
  watch(
    ["src/**/*.ts", "src/**/*.css"],
    { events: ["add", "change", "unlink"] },
    build
  );

exports.fix = fix;
exports.build = build;
exports.default = watchBuild;
