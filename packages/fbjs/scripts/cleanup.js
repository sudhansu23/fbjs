const glob = require("glob");
const fs = require("fs");
const del = require("del");
const path = require("path");

let matches = glob.sync("./deps/*");

let modules = new Set();

matches.forEach(file => {
  let content = fs.readFileSync(file, "utf8");
  content
    .split("\n")
    .filter(line => line.length > 0)
    .forEach(line => modules.add(line));
});

let srcFiles = glob.sync("./src/**/*.js");

srcFiles.forEach(file => {
  let name = path.parse(file).name;
  let nameWithoutTest = name.replace("-test", "");
  // TODO: actually look at dependency tree too
  if (!modules.has(name) && !modules.has(nameWithoutTest)) {
    del.sync(file);
  }
});

// console.log(srcFiles);

// console.log(modules.values());
