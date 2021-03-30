class Tokenizer {
  constructor(input) {
    this.result = [];
    this.acc = '';
    this.separator = ["{", "}", "[", "]", ":", ","];
    this.init(input);
  }

  init(input) {
    const strArr = input.split("").filter(v => v !== " ")
    strArr.forEach(str => this.tokenize(str));
    this.result = this.result.filter(v => v !== ',');
    console.log(this.result);
  }

  tokenize(str) {
    const separator = this.separator.find(v => str === v);
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