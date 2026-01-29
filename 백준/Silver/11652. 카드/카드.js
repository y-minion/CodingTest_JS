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

  let max = [input[0], 0];
  let cur = [input[0], 0];
  //정렬 배열 순회 ->coreLogic
  input.forEach((num) => {
    if (cur[0] === num) {
      cur[1] += 1;
    } else {
      cur = [num, 1];
    }

    if (max[0] === cur[0]) {
      max[1] = cur[1];
    } else {
      if (max[1] < cur[1]) {
        max = [num, cur[1]];
      }
    }
  });

  return max[0].toString();
}

const res = sol();
console.log(res);
