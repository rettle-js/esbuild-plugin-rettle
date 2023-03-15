import * as babel from "@babel/core";
import {Plugin} from "esbuild";
import fs from "fs";
import * as path from "path";
import createHash from "./util/createHash";
import {replacer} from "./util/replacers";
import checkClientSide from "./util/clientSideOnly";

interface PluginOptions {
  filter?: RegExp,
  mode?: "server" | "client",
  babel?: babel.TransformOptions
}

const RettlePlugin = (option: PluginOptions):Plugin => {
  return {
    name: "esbuild-plugin-rettle",
    setup(build) {
      const filter = option.filter || /\./;
      const transformBabel = (code: string, path:string) => {
        const translate = babel.transformSync(code, {
          filename: path,
          ...option.babel
        })
        if (translate?.code) {
          return Promise.resolve(translate.code)
        } else {
          return Promise.reject(`BabelCannot Compile ${path}`);
        }
      }
      build.onLoad({filter}, (args) => {
        const code = fs.readFileSync(args.path, "utf-8");
        const tsxFilePath = path.extname(args.path).includes(".js") ? args.path.replace(".cache/", "").replace( path.extname(args.path), ".tsx") : args.path;
        const hash = createHash(tsxFilePath);
        const replaceContents = replacer(hash);
        let formatCode = code;
        if (option.mode === "server") formatCode = checkClientSide(formatCode);
        for (const replace of replaceContents) {
          formatCode = formatCode.replace(...replace);
        }
        formatCode = formatCode.replace(/__filename/g, `"${tsxFilePath}"`);
        return new Promise(async(resolve, reject) => {
          try {
            const result = await transformBabel(formatCode, args.path);
            resolve({
              contents: result
            });
          } catch (e) {
            reject(e);
          }
        })
      } )
    }
  }
}

export default RettlePlugin;