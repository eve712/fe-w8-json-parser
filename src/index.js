import './style.scss';
import _ from './util.js';
import Tokenizer from './tokenizer.js';
import Lexer from './lexer.js';
import Parser from './stackParser.js';
// import Parser from './parser.js';

const resultbox = document.querySelector(".output__box__result");
const transBtn = document.querySelector(".input__btn__name");

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