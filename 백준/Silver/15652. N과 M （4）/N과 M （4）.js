const fs = require("fs");

let [N, M] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => Number(el));

const resArr = [];
const state = [];

function sol(pos, startIdx) {
  if (pos === M) {
    resArr.push(state.join(" "));
    return;
  }

  for (let i = startIdx; i <= N; i++) {
    state[pos] = i;
    sol(pos + 1, i);
  }
}

sol(0, 1);
const res = resArr.join("\n");
console.log(res);
