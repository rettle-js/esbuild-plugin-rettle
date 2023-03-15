const checkClientSide = (code: string) => {
  const target = "@use-client";
  const lines = code.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(target)) {
        lines[i + 1] = '// ' + lines[i + 1];
    }
  }
  return lines.join("\n");
}

export default checkClientSide;