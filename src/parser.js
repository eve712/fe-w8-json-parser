export default class Parser {
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
                if(i !== list.length - 1)return {parentNode, index: i};
                else return {parentNode}
            }
            else if(list[i].type === "string") {
                if(list[i + 1].type === "colon") continue;
                else parentNode.child.push(list[i])
            }
            else parentNode.child.push(list[i])
        }   
        return parentNode
    }

    parseObject(list, parentNode = {type:"object", child:[]}) {
        for(let i = 0; i < list.length; i++) {
            if(list[i].type === "object" && list[i].subType === "close") {
                return {parentNode, index: i}
            }
            else if(list[i].type === "array" && list[i].subType === "close") {
                return {parentNode, index: i - 1}
            }
            else {
                const newNode = this.parseProperty(list.slice(i));
                parentNode.child.push(newNode.propertyNode)
                i = newNode.index;
            }
        }
    }

    parseProperty(list, propertyNode = {type:'objectProperty', value:{}}) {
        const nodeValue = propertyNode.value;
        [nodeValue.propKey, nodeValue.propValue] = [{}, {}]

        for(let i = 0; i < list.length; i++) {
            if(list[i].type === "colon") {
                const [key, value] = [list[i - 1], list[i + 1]];
                nodeValue.propKey.type = 'string';
                nodeValue.propKey.value = key.value;

                if(value.type === "object" && value.subType === "open") {
                    const newNode = this.parseObject(list.slice(i+2))
                    nodeValue.propValue.type = "object"
                    nodeValue.propValue.value = newNode.parentNode;
                    i = newNode.index;
                }
                else if(value.type === "array" && value.subType === "open") {
                    const newNode = this.parse(list.slice(i+2))
                    nodeValue.propValue.type = "array"
                    nodeValue.propValue.child = newNode.parentNode.child;
                    i = newNode.index;
                }
                else {
                    nodeValue.propValue.type = value.type;
                    nodeValue.propValue.value = value.value;   
                }
                return {propertyNode, index: i+1};
            }
            else if(list[i].subType === "close") {
                return {propertyNode, index: i};
            }
        }
    }
}