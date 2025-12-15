const fs = require("fs");

let [[N, M], input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((str) => str.split(" ").map((el) => Number(el)));

input.sort((a, b) => a - b); //오름차순 작업

const state = [];
const resArr = [];

function sol(pos) {
  if (pos === M) {
    resArr.push(state.join(" "));
    return;
  }

  for (let i = 0; i < N; i++) {
    state[pos] = input[i];
    sol(pos + 1);
  }
}

sol(0);
const res = resArr.join("\n");
console.log(res);
