const djb2Hash = (str:string) => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  return hash;
}
const createHash = (str:string) => {
  const hash = djb2Hash(str);
  const fullStr = ('0000000' + (hash & 0xFFFFFF).toString(16));
  return fullStr.substring(fullStr.length - 8, fullStr.length)
}

export default createHash;