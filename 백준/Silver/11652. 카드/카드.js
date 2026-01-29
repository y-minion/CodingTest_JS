const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input.shift());

input = input.map((el) => BigInt(el));

function sol() {
  input.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }); //먼저 오름차순 정렬

  let mxN = input[0];
  let mxCnt = -1;
  let curN = input[0];
  let curCnt = 0;
  //정렬 배열 순회 ->coreLogic
  input.forEach((num) => {
    if (curN === num) {
      curCnt++;
    } else {
      //계산 빈도수 최소화
      if (mxCnt < curCnt) {
        mxN = curN;
        mxCnt = curCnt;
      }

      curN = num;
      curCnt = 1;
    }
  });

  if (mxCnt < curCnt) mxN = curN;

  return mxN.toString();
}

const res = sol();
console.log(res);
