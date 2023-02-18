import * as babel from "@babel/core";
import { Plugin } from "esbuild";
interface PluginOptions {
    filter?: RegExp;
    babel?: babel.TransformOptions;
}
declare const RettlePlugin: (option: PluginOptions) => Plugin;
export default RettlePlugin;
