const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const arr = input[1].split(" ").map((el) => Number(el));
const X = Number(input[2]);

const caseArr = [];

function sol(arr, x) {
  let count = 0;

  arr.forEach((num) => {
    caseArr[num] = 1; //참조용 초기화 작업
  });

  arr.forEach((num) => {
    //엣지케이스 제거 -> 자기 사진이 들어갈 수 있다.
    caseArr[num] = 0;
    const target = x - num;
    if (!caseArr[target]) return;
    count++;
    caseArr[target] = 0;
  });

  return count;
}

console.log(sol(arr, X));
