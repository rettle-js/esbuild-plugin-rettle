// src/index.ts
import * as babel from "@babel/core";
import fs from "fs";
import * as path from "path";

// src/util/createHash.ts
var djb2Hash = (str) => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  return hash;
};
var createHash = (str) => {
  const hash = djb2Hash(str);
  const fullStr = "0000000" + (hash & 16777215).toString(16);
  return fullStr.substring(fullStr.length - 8, fullStr.length);
};
var createHash_default = createHash;

// src/util/replacers.ts
var replacer = (hash) => [
  // Rettle Original
  ["rettle-ref", `data-ref-${hash}`],
  // Other Events
  ["rettle-scroll", `data-scroll-${hash}`],
  ["rettle-resize", `data-resize-${hash}`],
  ["rettle-load", `data-load-${hash}`],
  // Mouse Events
  ["rettle-click", `data-click-${hash}`],
  ["rettle-mouseenter", `data-mouseenter-${hash}`],
  ["rettle-mouseleave", `data-mouseleave-${hash}`],
  ["rettle-mouseover", `data-mouseover-${hash}`],
  ["rettle-mousedown", `data-mousedown-${hash}`],
  ["rettle-mouseup", `data-mouseup-${hash}`],
  ["rettle-mouseout", `data-mouseout-${hash}`],
  ["rettle-mousemove", `data-mousemove-${hash}`],
  ["rettle-dblclick", `data-dblclick-${hash}`],
  // Dom Events
  ["rettle-DOMFocusIn", `data-DOMFocusIn-${hash}`],
  ["rettle-DOMFocusOut", `data-DOMFocusOut-${hash}`],
  ["rettle-DOMActivate", `data-DOMActivate-${hash}`],
  // Inputs Events
  ["rettle-change", `data-change-${hash}`],
  ["rettle-select", `data-select-${hash}`],
  ["rettle-submit", `data-submit-${hash}`],
  ["rettle-reset", `data-reset-${hash}`],
  ["rettle-focus", `data-focus-${hash}`],
  ["rettle-blur", `data-blur-${hash}`],
  // Keyboard Events
  ["rettle-keypress", `data-keypress-${hash}`],
  ["rettle-keydown", `data-keydown-${hash}`],
  ["rettle-keyup", `data-keyup-${hash}`]
];

// src/index.ts
var RettlePlugin = (option) => {
  return {
    name: "esbuild-plugin-rettle",
    setup(build) {
      const filter = option.filter || /\./;
      const transformBabel = (code, path2) => {
        const translate = babel.transformSync(code, {
          filename: path2,
          ...option.babel
        });
        if (translate == null ? void 0 : translate.code) {
          return Promise.resolve(translate.code);
        } else {
          return Promise.reject(`BabelCannot Compile ${path2}`);
        }
      };
      build.onLoad({ filter }, (args) => {
        const code = fs.readFileSync(args.path, "utf-8");
        const tsxFilePath = path.extname(args.path).includes(".js") ? args.path.replace(".cache/", "").replace(path.extname(args.path), ".tsx") : args.path;
        const hash = createHash_default(tsxFilePath);
        const replaceContents = replacer(hash);
        let formatCode = code;
        for (const replace of replaceContents) {
          formatCode = formatCode.replace(...replace);
        }
        return new Promise(async (resolve, reject) => {
          try {
            const result = await transformBabel(formatCode, args.path);
            resolve({
              contents: result
            });
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  };
};
var src_default = RettlePlugin;
export {
  src_default as default
};
