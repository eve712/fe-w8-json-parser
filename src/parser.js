export default function parse(list, parentNode = ({type:'array', child:[]})) {
    for(let i = 0; i < list.length; i++) {
        if(list[i].subtype === "open") {
            const newNode = parse(list.slice(i+1))
            parentNode.child.push(newNode.parentNode)
            i += newNode.index + 1;
        }
        else if(list[i].subtype === "close") return {parentNode, index: i};
        else parentNode.child.push(list[i])
    }   
    return parentNode;
}

