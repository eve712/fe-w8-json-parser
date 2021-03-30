export default class Tokenizer {
  constructor() {
    this.result = [];
    this.acc = '';
    this.separatorArr = ["{", "}", "[", "]", ":", ","];
  }

  getTokens(input) {
    const strArr = input.split("").filter(v => v !== " ")
    strArr.forEach(str => this.tokenize(str));
    this.result = this.result.filter(v => v !== ',');
    return this.result;
  }

  tokenize(str) {
    const separator = this.separatorArr.find(v => str === v);
    if(separator !== undefined) {
        if(this.acc.length > 0) {
            this.result.push(this.acc)
            this.acc = '';
        }
        this.result.push(separator);
    }
    else this.acc += str;
  }
}