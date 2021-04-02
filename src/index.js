import './style.scss';
import _ from './util.js';
import Tokenizer from './tokenizer.js';
import Lexer from './lexer.js';
import Parser from './parser.js';

const input = '[["str", {"a":2}], {"b": [1,2], "a": 123}]';
// const input = '["1a3",[null,false,["11",[112233],{"easy" : ["hello", {"a":"a"}, "world"]},112],55, "99"],{"a":"str", "b":[912,[5656,33],{"key" : "innervalue", "newkeys": [1,2,3,4,5]}]}, true]'

const tokenizer = new Tokenizer();
const lexer = new Lexer();
const parser = new Parser();

const main = _.pipe(
    tokenizer.getTokens.bind(tokenizer), 
    lexer.getLexerResult.bind(lexer),
    parser.parse.bind(parser)
)

main(input)

const View = document.querySelector("pre");

const tokens = tokenizer.getTokens(input)
const lexRes = lexer.getLexerResult(tokens)
View.innerHTML = JSON.stringify(parser.parse(lexRes), null, 2)