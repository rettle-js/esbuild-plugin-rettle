// src/index.ts
import * as babel from "@babel/core";
import fs from "fs";

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

// src/index.ts
var RettlePlugin = (option) => {
  return {
    name: "esbuild-plugin-rettle",
    setup(build) {
      const filter = option.filter || /\./;
      const transformBabel = (code, path) => {
        const translate = babel.transformSync(code, {
          filename: path,
          ...option.babel
        });
        if (translate == null ? void 0 : translate.code) {
          return Promise.resolve(translate.code);
        } else {
          return Promise.reject(`BabelCannot Compile ${path}`);
        }
      };
      build.onLoad({ filter }, ({ path }) => {
        const code = fs.readFileSync(path, "utf-8");
        const formatCode = code.replace(/rettle-ref/g, `data-ref-${createHash_default(path)}`);
        return new Promise(async (resolve, reject) => {
          try {
            const result = await transformBabel(formatCode, path);
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
