const fs = require("fs");

const [N, M] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => Number(el));

const isUsed = Array.from({ length: N + 1 }, () => 0);
const arr = [];
const resArr = [];

function sol(x) {
  if (x === M) {
    resArr.push(arr.join(" "));
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (isUsed[i]) continue;
    arr[x] = i;
    isUsed[i] = 1;
    sol(x + 1);
    isUsed[i] = 0;
  }
}

sol(0);

const res = resArr.join("\n");
console.log(res);
