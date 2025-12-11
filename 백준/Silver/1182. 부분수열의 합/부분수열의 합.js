const fs = require("fs");

let [[N, S], input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((str) => str.split(" ").map((el) => Number(el)));

let count = 0;
function sol(x, total) {
  //최종 마지막 노드에 모든 경우들이 쌓인다.
  if (x === N) {
    if (total === S) count++;
    return;
  }

  sol(x + 1, total);
  sol(x + 1, total + input[x]);
}

sol(0, 0);
if (S === 0) count--;

console.log(count);
