export default function parseTami(
  list,
  parentNode = { type: "array", child: [] }
) {
  while (list.length > 0) {
    const item = list.shift();

    if (item.subtype === "open") {
      parentNode.child.push(parseTami(list));
    } else if (item.subtype === "close") {
      break;
    } else {
      parentNode.child.push(item);
    }
  }
  return parentNode;
}
