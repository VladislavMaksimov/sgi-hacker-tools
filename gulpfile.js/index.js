const build = require("./tasks/build").default;
const fix = require("./tasks/fix").default;
const watchBuild = require("./watchers/build").default;

exports.fix = fix;
exports.build = build;
exports.default = watchBuild;
