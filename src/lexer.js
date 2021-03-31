export default class Lexer {
    constructor() {
        this.obj;
    }

    getLexResult(tokens) {
        const result = tokens.map((v, i, arr) => {
            this.obj = {};
            this.setType(v)
            this.setSubtype(v)
            this.setValue(v)
            if(v === '[' || v === '{') this.checkChild(v, i, arr)
            return this.obj;
        });
        return result
    }
    setType(token) {
        if (token === '{' || token === '}') this.obj.type = "object";
        else if (token === '[' || token === ']') this.obj.type = "array";
        else if (token === ':') this.obj.type = "objectSeperator";
        else if (token[0] === '\"' || token === '\'') this.obj.type = "string";
        else if (token === 'true' || token === 'false') this.obj.type = "boolean";
        else if (/^[0-9]/g.test(token)) this.obj.type = "number";
        else if (token === 'null') this.obj.type = "null";
    }
    setSubtype(token) {
        if(token === '[' || token === '{') this.obj.subtype = "open"
        else if(token === ']' || token === '}') this.obj.subtype = "close"
    }
    setValue(token) {
        if(token === '{' || token === '}' || token === ':') return;
        else if (token === '[' || token === ']') this.obj.value ="arrayObject";
        else if (token[0] === '\"' || token === '\'') this.obj.value = token.substring(1, token.length-1);
        else if (/^[0-9]/g.test(token)) this.obj.value = parseInt(token);
        else if (token === 'true') this.obj.value = true;
        else if (token === 'false') this.obj.value = false;
        else if (token === 'null') this.obj.value = null;
    }
    checkChild(token, i , tokens) {
        const arrayHasChild = token === '[' && tokens[i+1] !== ']' 
        const objectHasChild = token === '{' && tokens[i+1] !== '}'
        if(arrayHasChild || objectHasChild) this.obj.child = [];
    }
}