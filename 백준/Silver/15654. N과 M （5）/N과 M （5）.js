const fs = require("fs");

let [[N, M], numArr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((str) => str.split(" ").map((el) => Number(el)));

numArr.sort((a, b) => a - b);

const resArr = [];
const state = [];

const isUsed = [];

function sol(pos) {
  if (pos === M) {
    resArr.push(state.join(" "));
    return;
  }

  numArr.forEach((num, i) => {
    if (isUsed[i]) return;
    state[pos] = num;
    isUsed[i] = 1;
    sol(pos + 1);
    isUsed[i] = 0;
  });
}

sol(0);
const res = resArr.join("\n");
console.log(res);
