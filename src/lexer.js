export default class Lexer {
    constructor() {
        this.type = {
            '[': 'array',
            ']': 'array',
            '{': 'object',
            '}': 'object',
            'true': 'boolean',
            'false': 'boolean',
            'null': 'null',
            ':': 'colon',
        }
    }
    getLexerResult (tokens) {
        const result = tokens.map(token => {
            const type = this.getTokenType(token);
            const value = this.setValue(token, type);
            return value;
        });
        return result
    }
    getTokenType (tokens) {
        const openQuotes = tokens[0] === '\'' || tokens[0] === '\"'
        const closeQuotes = tokens[tokens.length - 1] === '\'' || tokens[tokens.length - 1] ==='\"'
        if ( openQuotes && closeQuotes ) return 'string';
        else if (!isNaN(Number(tokens))) return 'number';
        else return this.type[tokens];
    }
    setValue (token, type) {
        if(type === 'boolean') return { type: type, value: Boolean(token) };
        else if(type === 'null') return { type: type, value: null };
        else if(type === 'string') return { type: type, value: token.substring(1, token.length-1) };
        else if(type === 'number') return { type: type, value: parseInt(token) };
        else if(token === '[' || token === '{' ) return {type: type, subType: 'open' , child: []};
        else if(token === ']' || token === '}' ) return {type: type, subType: 'close' };
        return { type: type, value: token};
    };
}