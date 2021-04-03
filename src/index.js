import './style.scss';
import _ from './util.js';
import Tokenizer from './tokenizer.js';
import Lexer from './lexer.js';
import Parser from './stackParser.js';
// import Parser from './parser.js';

// input 2:  = '[{"eve" : 27, "tami": [{"age":26},28]}]'
// input 1 : [["str", {"a":2}], {"b": [1,2], "2": 123}]
const resultbox = document.querySelector(".output__box__result");
const transBtn = document.querySelector(".input__btn__name");

// =====test=====
// const tokens = tokenizer.getTokens(input);
// const lexRes = lexer.getLexerResult(tokens);
// const parRes = parser.parse(lexRes);
// const parResJson = JSON.stringify(parRes, null, 2);
// resultbox.innerHTML = parResJson;


transBtn.addEventListener('click', () => {
    const tokenizer = new Tokenizer();
    const lexer = new Lexer();
    const parser = new Parser();

    const main = _.pipe(
    tokenizer.getTokens.bind(tokenizer), 
    lexer.getLexerResult.bind(lexer),
    parser.parse.bind(parser)
    )
    let userInp = document.getElementById("userInput").value;
    let parResJson = JSON.stringify(main(userInp), null, 2);
    resultbox.innerHTML = parResJson;
    
})