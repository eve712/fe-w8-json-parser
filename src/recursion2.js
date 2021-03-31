//리스트를 탐색하며  약ㄴㅅㅁㄳ 라면 재귀호출
// dirstart,dirend 가 아니라면 ㅔ
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
const list1 = ["myfile.txt"];
const list2 = [
  "myfile.txt",
  "dirstart",
  "오늘숙제.doc",
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
      parentNode.child.push({ type: "File", value: item });
    }
  }
  return parentNode;
}

// console.log(parse(list));

function parse2(list, parentNode = { type: "Directory", child: [] }) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === "dirstart") {
      const newList = parse2(list.slice(i + 1));
      parentNode.child.push(newList.parentNode);
      i += newList.index + 1;
    } else if (list[i] === "dirend") {
      return { parentNode, index: i };
    } else {
      const newList = {
        type: "file",
        value: list[i],
      };
      parentNode.child.push(newList);
    }
  }
  return parentNode;
}
console.log(JSON.stringify(parse2(list), null, "\t"));
