const list = [1, 2, [3, [6, [7]]], 4];

function flat(list) {
  const newList = [];
  list.forEach((v) => {
    if (Array.isArray(v)) {
      return newList.push(...flat(v));
    }
    newList.push(v);
  });
  return newList;
}

console.log(flat(list));
