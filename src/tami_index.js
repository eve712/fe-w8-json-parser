import Lexer from "./tami_lexer.js";
import Tokenizer from "./tami_token.js";

const input = '[1,2,[3, [null]],{"hi": 1123},[],{}]';

const tokenizer = new Tokenizer();
const tokens = tokenizer.getTokens(input);

const lexer = new Lexer(tokens);
const lexResult = lexer.getLexResult(tokens);
console.log(lexResult);
