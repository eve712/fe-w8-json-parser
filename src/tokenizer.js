export default class Tokenizer {
  constructor() {
    this.result = [];
    this.strStarted = false;
    this.acc = '';
    this.separatorArr = ["{", "}", "[", "]", ":", ","];
  }
  getTokens(input) {
    const strArr = input.split("");
    strArr.forEach(str => this.tokenize(str));
    this.result = this.result
      .filter(v => v !== ',')
      .filter(v => v !== ' ')
      .map(str => str.trim());
    return this.result;
  } 
  tokenize(str) { 
    if(this.isStrSeperator(str) || this.strStarted) this.accumulateStr(str);
    else {
      const separator = this.separatorArr.find(v => str === v);
      if(separator !== undefined) {
        if(this.acc.length > 0) this.pushNinitAcc();
        this.result.push(separator);
      }
      else this.acc += str;
    }
  }
  isStrSeperator(str) {
    return str === '\"' || str === '\'';
  }
  pushNinitAcc() {
    this.result.push(this.acc)
    this.acc = '';
  }
  accumulateStr(str) {
    this.acc += str;
    if(!this.strStarted && this.isStrSeperator(str)) this.strStarted = true;
    else if(this.strStarted && this.isStrSeperator(str)) {
      this.strStarted = false;
      this.result.push(this.acc)
      this.acc = '';
    }
  }
}