
const fs = require("fs");

let [N, K] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => Number(el));

function sol(n, k) {
  const res = [];
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  let curIdx = 0;
  while (arr.length > 0) {
    curIdx = (curIdx + k - 1) % arr.length;
    res.push(arr.splice(curIdx, 1));
  }

  console.log(`<${res.join(", ")}>`);
}

sol(N, K);
