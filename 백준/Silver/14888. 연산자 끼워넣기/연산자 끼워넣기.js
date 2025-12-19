const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N] = input.slice(0, 1).map((el) => Number(el));
let [_, numArr, tools] = input.map((arr) =>
  arr.split(" ").map((el) => Number(el))
);

let max = Number.MIN_SAFE_INTEGER;
let min = Number.MAX_SAFE_INTEGER;
const state = [];

function sol(pos) {
  if (pos === N - 1) {
    let res = numArr[0];
    for (let i = 0; i < N - 1; i++) {
      const tool = state[i];
      const cur = numArr[i + 1];
      switch (tool) {
        case 0:
          res += cur;
          break;
        case 1:
          res -= cur;
          break;

        case 2:
          res *= cur;
          break;

        case 3:
          res = Math.trunc(res / cur);
          break;
      }
    }

    if (max < res) max = res;
    if (res < min) min = res;
  }

  for (let i = 0; i < 4; i++) {
    if (tools[i] <= 0) continue;
    state[pos] = i; //tools의 인덱스가 연산자!
    tools[i] -= 1;
    sol(pos + 1);
    tools[i] += 1;
  }
}

sol(0);
console.log(`${max}\n${min}`);
