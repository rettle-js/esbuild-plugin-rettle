const esBuild = require("esbuild");

esBuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: false,
  outfile: "./bin/index.cjs.js",
  target: "node14",
  format: "cjs",
  platform: "node"
})

esBuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: false,
  outfile: "./bin/index.esm.js",
  target: "node14",
  format: "esm",
  platform: "node"
})