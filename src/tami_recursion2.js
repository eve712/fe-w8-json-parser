const list = [
  "myfile.txt",
  "dirstart",
  "오늘숙제.doc",
  "dirstart",
  "책리스트.txt",
  "dirend",
  "요리법.hwp",
  "dirend",
  "fe멤버들.md",
];

function parse(list, parentNode = { type: "Directory", child: [] }) {
  while (list.length > 0) {
    const item = list.shift();
    if (item === "dirstart") {
      parentNode.child.push(parse(list));
    } else if (item === "dirend") {
      break;
    } else {
      parentNode.child.push({ type: "file", value: item });
    }
  }
  return parentNode;
}
console.dir(parse(list), { depth: null });

function parse2(list, parentNode = { type: "Directory", child: [] }) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === "dirstart") {
      //parse를 다시 호출한다.
      // i 값을 변경, 받은결과에서 자식노드 처리된 갯수등의 힌트로 i값증가.
      //받은 결과를 parentNode 에 추가.
      const newList = parse2(list.slice(i + 1));
      parentNode.child.push(newList.parentNode);
      i += newList.index;
    } else if (list[i] === "dirend") {
      return { parentNode, index: i };
      //parentNode를 반환한다.
    } else {
      //parentNode의 child에 추가한다.
      parentNode.child.push({ type: "file", value: list[i] });
    }
  }
  return parentNode;
}

console.dir(parse2(list), { depth: null });
