/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lexer.js":
/*!**********************!*\
  !*** ./src/lexer.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Lexer)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Lexer = /*#__PURE__*/function () {
  function Lexer() {
    _classCallCheck(this, Lexer);

    this.type = {
      '[': 'array',
      ']': 'array',
      '{': 'object',
      '}': 'object',
      'true': 'boolean',
      'false': 'boolean',
      'null': 'null',
      ':': 'colon'
    };
  }

  _createClass(Lexer, [{
    key: "getLexerResult",
    value: function getLexerResult(tokens) {
      var _this = this;

      var result = tokens.map(function (token) {
        var type = _this.getTokenType(token);

        var value = _this.setValue(token, type);

        return value;
      });
      return result;
    }
  }, {
    key: "getTokenType",
    value: function getTokenType(tokens) {
      var openQuotes = tokens[0] === '\'' || tokens[0] === '\"';
      var closeQuotes = tokens[tokens.length - 1] === '\'' || tokens[tokens.length - 1] === '\"';
      if (openQuotes && closeQuotes) return 'string';else if (!isNaN(Number(tokens))) return 'number';else return this.type[tokens];
    }
  }, {
    key: "setValue",
    value: function setValue(token, type) {
      if (type === 'boolean') return {
        type: type,
        value: token === "true" ? true : false
      };else if (type === 'null') return {
        type: type,
        value: null
      };else if (type === 'string') return {
        type: type,
        value: token.substring(1, token.length - 1)
      };else if (type === 'number') return {
        type: type,
        value: parseInt(token)
      };else if (token === '[' || token === '{') return {
        type: type,
        subType: 'open',
        child: []
      };else if (token === ']' || token === '}') return {
        type: type,
        subType: 'close'
      };
      return {
        type: type,
        value: token
      };
    }
  }]);

  return Lexer;
}();



/***/ }),

/***/ "./src/stackParser.js":
/*!****************************!*\
  !*** ./src/stackParser.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Parser)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Parser = /*#__PURE__*/function () {
  function Parser() {
    _classCallCheck(this, Parser);

    this.property = null;
    this.stack = [];
    this.prevData = 0;
  }

  _createClass(Parser, [{
    key: "parse",
    value: function parse(lexResList) {
      var _this = this;

      lexResList.forEach(function (data) {
        //array, object 시작
        if (data.subType === "open") {
          //isProperty:1 (value==object)
          delete data.subType;
          if (_this.prevData.type === "colon") _this.setNode(data, 1);else _this.setNode(data, 0);

          _this.stack.push(data.child);
        } //array, object 종료
        else if (data.subType === "close") _this.stack.pop(); // string, number, colon ...
          else {
              //colon이면 object property 생성
              if (data.type === "colon") {
                _this.property = {
                  type: null,
                  value: {
                    propKey: {
                      type: _this.prevData.type,
                      value: _this.prevData.value
                    },
                    propValue: {
                      type: null,
                      value: null
                    }
                  }
                };

                _this.stack[_this.stack.length - 1].pop();
              } else _this.setNode(data, 0);
            }

        _this.prevData = data;
      }); // 결과값 리턴

      return this.stack.pop();
    } //object의 property 생성 
    //isProperty:0 (value!=object) isProperty:1 (value==object)

  }, {
    key: "setNode",
    value: function setNode(data, isProperty) {
      if (this.property) {
        this.property.type = "objectProperty";
        this.property.value.propValue.type = data.type;
        if (isProperty === 0) this.property.value.propValue.value = data.value;else this.property.value.propValue.value = data.child;
        this.stack[this.stack.length - 1].push(this.property);
        this.property = null;
      } else {
        if (this.stack.length === 0) this.stack.push(data);else this.stack[this.stack.length - 1].push(data);
      }
    }
  }]);

  return Parser;
}();



/***/ }),

/***/ "./src/tokenizer.js":
/*!**************************!*\
  !*** ./src/tokenizer.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tokenizer)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tokenizer = /*#__PURE__*/function () {
  function Tokenizer() {
    _classCallCheck(this, Tokenizer);

    this.result = [];
    this.strStarted = false;
    this.acc = '';
    this.separatorArr = ["{", "}", "[", "]", ":", ","];
  }

  _createClass(Tokenizer, [{
    key: "getTokens",
    value: function getTokens(input) {
      var _this = this;

      var strArr = input.split("");
      strArr.forEach(function (str) {
        return _this.tokenize(str);
      });
      this.result = this.result.filter(function (v) {
        return v !== ',';
      }).filter(function (v) {
        return v !== ' ';
      }).map(function (str) {
        return str.trim();
      });
      return this.result;
    }
  }, {
    key: "tokenize",
    value: function tokenize(str) {
      if (this.isStrSeperator(str) || this.strStarted) this.accumulateStr(str);else {
        var separator = this.separatorArr.find(function (v) {
          return str === v;
        });

        if (separator !== undefined) {
          if (this.acc.length > 0) this.pushNinitAcc();
          this.result.push(separator);
        } else this.acc += str;
      }
    }
  }, {
    key: "isStrSeperator",
    value: function isStrSeperator(str) {
      return str === '\"' || str === '\'';
    }
  }, {
    key: "pushNinitAcc",
    value: function pushNinitAcc() {
      this.result.push(this.acc);
      this.acc = '';
    }
  }, {
    key: "accumulateStr",
    value: function accumulateStr(str) {
      this.acc += str;
      if (!this.strStarted && this.isStrSeperator(str)) this.strStarted = true;else if (this.strStarted && this.isStrSeperator(str)) {
        this.strStarted = false;
        this.pushNinitAcc();
      }
    }
  }]);

  return Tokenizer;
}();



/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var _ = {
  $: function $(selector) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return base.querySelector(selector);
  },
  pipe: function pipe() {
    for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }

    return function (arg) {
      return fns.reduce(function (arg, fn) {
        return fn(arg);
      }, arg);
    };
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_);

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./src/util.js");
/* harmony import */ var _tokenizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokenizer.js */ "./src/tokenizer.js");
/* harmony import */ var _lexer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lexer.js */ "./src/lexer.js");
/* harmony import */ var _stackParser_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stackParser.js */ "./src/stackParser.js");




 // import Parser from './parser.js';
// input 2:  = '[{"eve" : 27, "tami": [{"age":26},28]}]'
// input 1 : [["str", {"a":2}], {"b": [1,2], "2": 123}]

var resultbox = document.querySelector(".output__box__result");
var transBtn = document.querySelector(".input__btn__name"); // =====test=====
// const tokens = tokenizer.getTokens(input);
// const lexRes = lexer.getLexerResult(tokens);
// const parRes = parser.parse(lexRes);
// const parResJson = JSON.stringify(parRes, null, 2);
// resultbox.innerHTML = parResJson;

transBtn.addEventListener('click', function () {
  var tokenizer = new _tokenizer_js__WEBPACK_IMPORTED_MODULE_2__.default();
  var lexer = new _lexer_js__WEBPACK_IMPORTED_MODULE_3__.default();
  var parser = new _stackParser_js__WEBPACK_IMPORTED_MODULE_4__.default();

  var main = _util_js__WEBPACK_IMPORTED_MODULE_1__.default.pipe(tokenizer.getTokens.bind(tokenizer), lexer.getLexerResult.bind(lexer), parser.parse.bind(parser));

  var userInp = document.getElementById("userInput").value;
  var parResJson = JSON.stringify(main(userInp), null, 2);
  resultbox.innerHTML = parResJson;
});
})();

/******/ })()
;
//# sourceMappingURL=index.bundle.js.map