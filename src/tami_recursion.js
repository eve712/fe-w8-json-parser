const list = [1, 2, [3, [6, [7]]], 4];

// [1, 2, 3, 6, 7, 4]

function flat(list) {
  const newList = [];
  //배열인지 아닌지는 -> Array.isArray() 함수를 사용
  /* 
   list를 순회하면서
   		배열 타입이면 flat을 재귀호출 -> 결과를 받아서 newList에 합친다.
   		ex) (spread opearator 를 사용..) -> newList.push(...flat(v))
   
	   그렇지 않다면 새로운 배열에 element를 추가
  
   순회가 끝나면 새로운 배열을 반환
  */
  list.forEach((v) => {
    if (Array.isArray(v)) {
      newList.push(...flat(v));
    } else {
      newList.push(v);
    }
  });

  return newList;
}

console.log(flat(list));
