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
  [/rettle-ref/g, `data-ref-${hash}`],
  [/\[fr\]/g, hash],
  // Other Events
  [/rettle-scroll/g, `data-scroll-${hash}`],
  [/rettle-resize/g, `data-resize-${hash}`],
  [/rettle-load/g, `data-load-${hash}`],
  // Mouse Events
  [/rettle-click/g, `data-click-${hash}`],
  [/rettle-mouseenter/g, `data-mouseenter-${hash}`],
  [/rettle-mouseleave/g, `data-mouseleave-${hash}`],
  [/rettle-mouseover/g, `data-mouseover-${hash}`],
  [/rettle-mousedown/g, `data-mousedown-${hash}`],
  [/rettle-mouseup/g, `data-mouseup-${hash}`],
  [/rettle-mouseout/g, `data-mouseout-${hash}`],
  [/rettle-mousemove/g, `data-mousemove-${hash}`],
  [/rettle-dblclick/g, `data-dblclick-${hash}`],
  // Dom Events
  [/rettle-DOMFocusIn/g, `data-DOMFocusIn-${hash}`],
  [/rettle-DOMFocusOut/g, `data-DOMFocusOut-${hash}`],
  [/rettle-DOMActivate/g, `data-DOMActivate-${hash}`],
  // Inputs Events
  [/rettle-change/g, `data-change-${hash}`],
  [/rettle-select/g, `data-select-${hash}`],
  [/rettle-submit/g, `data-submit-${hash}`],
  [/rettle-reset/g, `data-reset-${hash}`],
  [/rettle-focus/g, `data-focus-${hash}`],
  [/rettle-blur/g, `data-blur-${hash}`],
  // Keyboard Events
  [/rettle-keypress/g, `data-keypress-${hash}`],
  [/rettle-keydown/g, `data-keydown-${hash}`],
  [/rettle-keyup/g, `data-keyup-${hash}`]
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
        formatCode = formatCode.replace(/__filename/g, `"${tsxFilePath}"`);
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
