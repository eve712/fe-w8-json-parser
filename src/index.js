// import './style.scss';
import Tokenizer from "./tokenizer.js";
import Lexer from "./lexer.js";
import parse from "./parser.js";

const input = '[1,2,[3, [null, "hi"], 25]]';

const tokenizer = new Tokenizer();
const tokens = tokenizer.getTokens(input);

const lexer = new Lexer(tokens);
const lexResult = lexer.getLexResult(tokens);
console.log(lexResult);
// console.log(JSON.stringify(parse(lexResult), null, '\t'));
console.dir(parse(lexResult), { depth: null });
