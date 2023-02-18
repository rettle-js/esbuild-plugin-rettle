type searchValue = string | RegExp;
type replaceValue = string;
type replacesInterface = [searchValue, replaceValue];
export declare const replacer: (hash: string) => Array<replacesInterface>;
export {};
