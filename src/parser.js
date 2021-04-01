export default class Parser {
    constructor() {

    }
    parse(list, parentNode = ({type:'array', child:[]})) {
        for(let i = 0; i < list.length; i++) {
            if(list[i].subType === "open") {
                const newNode = this.parse(list.slice(i+1))
                parentNode.child.push(newNode.parentNode)
                i += newNode.index + 1;
            }
            else if(list[i].subType === "close") return {parentNode, index: i};
            // else if(list[i].type === "")
            else parentNode.child.push(list[i])
        }   
        return parentNode;
    }
}