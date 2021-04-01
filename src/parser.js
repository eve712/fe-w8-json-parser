export default class Parser {
    constructor() {

    }
    parse(list, parentNode = {type:'', child:[]}) {
        for(let i = 0; i < list.length; i++) {
            if(list[i].subType === "open") {

                if(list[i].type === "object") {
                    const newNode = this.parseObject(list.slice(i+1))
                    parentNode.child.push(newNode.parentNode)
                    i += newNode.index + 1;
                }
                else if(list[i].type === "array") {
                    const newNode = this.parse(list.slice(i+1))
                    parentNode.child.push(newNode.parentNode)
                    i += newNode.index + 1;
                }
            }

            else if(list[i].subType === "close") {
                parentNode.type = list[i].type;
                return {parentNode, index: i};
            }

            else parentNode.child.push(list[i])
        }   
        return parentNode.child[0];
    }


    parseObject(list, parentNode = {type:'', child:[]}) {
        for(let i = 0; i < list.length; i) {
            
        }
    }

}