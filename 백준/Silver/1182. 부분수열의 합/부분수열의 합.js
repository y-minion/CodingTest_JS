const fs = require("fs");

let [[N, S], input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((str) => str.split(" ").map((el) => Number(el)));

//input 오름차순으로 정렬하기!
input.sort((a, b) => a - b);

let count = 0;
const arr = [];

function sol(x, startIdx) {
  if (input.length - 1 < startIdx) {
    return;
  }

  for (let i = startIdx; i < input.length; i++) {
    arr[x] = input[i];

    const sum = arr.reduce((acc, num, idx) => {
      if (x < idx) return acc;
      return acc + num;
    }, 0);

    if (sum === S) count++;

    sol(x + 1, i + 1);
  }
}

sol(0, 0);

console.log(count);
