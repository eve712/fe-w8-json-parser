export default class Tokenizer {
  constructor() {
    this.separatorArr = ["{", "}", "[", "]", ":", ","];
    this.result = [];
    this.acc = "";
  }

  getTokens(input) {
    const strArr = input.split("").filter((v) => v !== " ");
    strArr.forEach((str) => this.tokenize(str));
    this.result = this.result.filter((v) => v !== ",");
    console.log(this.result);
    return this.result;
  }

  tokenize(str) {
    const seperator = this.separatorArr.find((v) => str === v);
    if (seperator !== undefined) {
      if (this.acc.length > 0) {
        this.result.push(this.acc);
        this.acc = "";
      }
      this.result.push(seperator);
    } else this.acc += str;
  }
}
