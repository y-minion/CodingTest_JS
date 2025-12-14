const fs = require("fs");

let [N, M] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => Number(el));

const state = [];
const resArr = [];
function sol(pos) {
  if (pos === M) {
    resArr.push(state.join(" "));
    return;
  }

  for (let i = 1; i <= N; i++) {
    state[pos] = i;
    sol(pos + 1);
  }
}

sol(0);
const res = resArr.join("\n");

console.log(res);
