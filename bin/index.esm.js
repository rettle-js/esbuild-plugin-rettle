import * as babel from "@babel/core";
import fs from "fs";
import createHash from "./util/createHash";
const RettlePlugin = (option) => {
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
        const formatCode = code.replace(/rettle-ref/g, `data-ref-${createHash(path)}`);
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
