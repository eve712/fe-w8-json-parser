// import './style.scss';
import Tokenizer from './tokenizer.js';
import Lexer from './lexer.js';

const input = '[1,2,[3, [null]],{"hi": 1123},[],{}]'

const tokenizer = new Tokenizer();
const tokens = tokenizer.getTokens(input);

const lexer = new Lexer(tokens);
const lexResult = lexer.getLexResult(tokens);
console.log(lexResult)