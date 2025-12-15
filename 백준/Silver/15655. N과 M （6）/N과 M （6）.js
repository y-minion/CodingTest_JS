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

function sol(pos, startIdx) {
  if (pos === M) {
    resArr.push(state.join(" "));
    return;
  }

  for (let i = startIdx; i < N; i++) {
    state[pos] = input[i];
    sol(pos + 1, i + 1);
    //반복문에서 이미 시작 idx를 조절하고 있으므로 여기서는 따로 중복 방지 로직이 필요없다.
  }
}

sol(0, 0);

const res = resArr.join("\n");
console.log(res);
