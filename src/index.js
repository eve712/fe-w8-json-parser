// import './style.scss';
import _ from './util.js';
import Tokenizer from './tokenizer.js';
import Lexer from './lexer.js';
import Parser from './parser.js';

const input = '[{"b": [1,2], "a": 123}]'

const tokenizer = new Tokenizer();
const lexer = new Lexer();
const parser = new Parser();

const main = _.pipe(
    tokenizer.getTokens.bind(tokenizer), 
    lexer.getLexerResult.bind(lexer),
    parser.parse.bind(parser)
    )
main(input);