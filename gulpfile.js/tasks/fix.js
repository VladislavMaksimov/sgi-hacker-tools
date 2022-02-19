const { src, dest, parallel } = require("gulp");
const prettier = require("gulp-prettier");
const paths = require("../constants").paths;

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

exports.default = fix;
