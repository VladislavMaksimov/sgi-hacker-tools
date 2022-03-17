const { watch } = require("gulp");
const paths = require("../constants").paths;
const build = require("../tasks/build").default;

const watchBuild = () =>
  watch(
    [paths.ts.allFiles, paths.css, paths.assets],
    { events: ["add", "change", "unlink"] },
    build
  );

exports.default = watchBuild;
