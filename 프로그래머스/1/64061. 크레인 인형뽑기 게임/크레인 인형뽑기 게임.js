//번호를 뽑는 함수
const numberPick = function (pickedArr) {
  let pickedNum = pickedArr.pop();
  if (pickedNum === 0) return numberPick(pickedArr);
  return pickedNum;
};

function solution(board, moves) {
  let point = null;
  const board2 = boardFormChange(board); //2차원 배열 선언
  let clampLocationArr = moves; //집게 위치배열 선언
  let basketArr = []; //바구니 배열 선언

  clampLocationArr.forEach((location) => {
    const pickLocationIdx = location - 1; //2차원 배열에 접근할 인덱스
    const pickedRowArr = board2[pickLocationIdx]; //1차원 배열에 접근
    let pickedNum = numberPick(pickedRowArr); //번호 뽑기
    if (pickedNum) {
      //!pickedNum === 0 이거는 안돼?
      basketArr.push(pickedNum); //바구니에 번호를 넣는다
      if (basketArr.at(-1) === basketArr.at(-2)) {
        basketArr.splice(-2); //값 중복시 중복값 제거
        point += 2;
      }
    }
  });

  return point;
}

const board = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 3],
  [0, 2, 5, 0, 1],
  [4, 2, 4, 4, 2],
  [3, 5, 1, 3, 1],
];

const boardFormChange = function (arr2) {
  const changedBoard = new Array(arr2.length).fill(null).map(() => new Array());
  //2차원 빈 배열 초기화

  arr2.forEach((arr1) => {
    arr1.forEach((num, i) => {
      changedBoard[i].unshift(num);
    });
  });
  return changedBoard;
};

const moves = [1, 5, 3, 5, 1, 2, 1, 4];

console.log(solution(board, moves));
