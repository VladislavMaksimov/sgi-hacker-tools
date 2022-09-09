const { src, dest, series, parallel } = require("gulp");
const clean = require("gulp-clean");
const autoprefixer = require("gulp-autoprefixer");
const concatCss = require("gulp-concat-css");
const esBuild = require("gulp-esbuild");
const replace = require("gulp-replace");
require("dotenv").config();

const constants = require("../constants");
const paths = constants.paths;
const filenames = constants.filenames;

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
        target: "es6",
        bundle: true,
        tsconfig: paths.ts.config,
      })
    )
    .pipe(replace("process.env.BASE", `"${process.env.BASE}"`))
    .pipe(replace("process.env.SUPPORT", `"${process.env.SUPPORT}"`))
    .pipe(replace("process.env.VK", `"${process.env.VK}"`))
    .pipe(replace("process.env.TELEGRAM", `"${process.env.TELEGRAM}"`))
    .pipe(replace("process.env.GITHUB", `"${process.env.GITHUB}"`))
    .pipe(dest(paths.build));

const copyManifest = () => src(paths.manifest).pipe(dest(paths.build));

const copyAssets = () => src(paths.assets).pipe(dest(paths.build));

const build = series(
  clearDest,
  parallel(buildStyles, buildScripts, copyManifest, copyAssets)
);

exports.default = build;
