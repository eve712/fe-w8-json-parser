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
                if(list[i].type === "array") {
                    const newNode = this.parse(list.slice(i+1))
                    parentNode.child.push(newNode.parentNode)
                    i += newNode.index + 1;
                }
            }

            else if(list[i].subType === "close") {
                parentNode.type = list[i].type;
                return {parentNode, index: i};
            }

            else if(list[i].type === "string") {
                if(list[i + 1].type === "colon") continue;
            }

            // number, string, boolean, null 일 때는 바로 푸쉬
            else parentNode.child.push(list[i])
        }   
        return parentNode.child[0];
    }
    parseObject(list, parentNode = {type:"object", child:[]}) {
        for(let i = 0; i < list.length; i++) {
            if(list[i].type === "colon") {
                const propertyNode = this.parseProperty(list.slice(i-1))
                parentNode.child.push(propertyNode)
                i++;
            }
            // 객체가 끝났을 때
            else if(list[i].type === 'object' && list[i].subType === 'close') {
                return {parentNode, index: i}
            }
        }
    }

    parseProperty(list, propertyNode = {type:'objectProperty', value:{}}) {
        const [key, value] = [list[0], list[2]]
        const nodeValue = propertyNode.value;
        [nodeValue.propKey, nodeValue.propValue] = [{}, {}]
        nodeValue.propKey.type = 'string';
        nodeValue.propKey.value = key.value;

        // if(list[i + 1].type === "array") this.parse(list.slice(i+1))
        // else if(list[i + 1].type === "object") this.parseProperty(list.slice(i + 1))
        // else {
            nodeValue.propValue.type = value.type;
            nodeValue.propValue.value = value.value;
        // }
        return propertyNode;
    }

}