const fs = require("node:fs");
const path = require("node:path");
require("./file.js");

console.log(__dirname);
console.log(process.cwd());
const content = fs.readFileSync(path.join(__dirname, "./text.txt"), "utf8");
console.log(content);

// Absolute Path start with / and can run any other path
// Relative Path don't start with / and only can run in the current working directory
