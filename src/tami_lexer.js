export default class Lexer {
  constructor() {
    this.obj;
  }

  getLexResult(tokens) {
    const result = tokens.map((v, i, arr) => {
      this.obj = {};
      this.setType(v);
      return this.obj;
    });
    return result;
  }

  setType(token) {
    if (token === "{") this.obj.type = "leftObject";
    else if (token === "}") this.obj.type = "rightObject";
    else if (token === "[") this.obj.type = "leftArray";
    else if (token === "]") this.obj.type = "rightArray";
    else if (token === ":") this.obj.type = "objectSeperator";
    else if (token[0] === '"' || token[0] === "'") this.obj.type = "string";
    else if (token === "true" || token === "false") this.obj.type = "boolean";
    else if (/^[0-9]/g.test(token)) this.obj.type = "number";
    else if (token === "nul") this.obj.type = "null";
  }
  setValue(token) {}
}
