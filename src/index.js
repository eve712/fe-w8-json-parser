// import './style.scss';
import _ from './util.js';
import Tokenizer from './tokenizer.js';
import Lexer from './lexer.js';
import Parser from './parser.js';

const input = '[{"eve" : 27, "tami": true}]'

const tokenizer = new Tokenizer();
const lexer = new Lexer();
const parser = new Parser();

const main = _.pipe(
    tokenizer.getTokens.bind(tokenizer), 
    lexer.getLexerResult.bind(lexer),
    parser.parse.bind(parser)
    )
// main(input)


// =====test=====
const tokens = tokenizer.getTokens(input)
const lexRes = lexer.getLexerResult(tokens)
console.log("lexResult : ", lexRes)
console.log(JSON.stringify(parser.parse(lexRes), null, 2))