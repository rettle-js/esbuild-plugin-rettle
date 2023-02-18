const esBuild = require("esbuild");
const fs = require("fs");
const path = require("path");
const {dependencies} = JSON.parse(fs.readFileSync(path.resolve("./package.json"), "utf-8"));

esBuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  external: Object.keys(dependencies),
  outfile: "./bin/index.cjs.js",
  target: "node14",
  format: "cjs",
  platform: "node"
})

esBuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  external: Object.keys(dependencies),
  outfile: "./bin/index.esm.js",
  target: "node14",
  format: "esm",
  platform: "node"
})