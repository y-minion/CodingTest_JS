const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const size = input.splice(0, 1);
const board = input.map((str) => str.split("").map((el) => Number(el)));

let resStr = "";

function sol(r, c, s) {
  const startEl = board[r][c];
  let isUniform = true;

  for (let i = r; i < r + s; i++) {
    for (let j = c; j < c + s; j++) {
      const curEl = board[i][j];
      if (startEl !== curEl) {
        isUniform = false;
        break;
      }
    }
    if (!isUniform) break;
  }

  if (!isUniform) {
    const half = s / 2;
    //전위 작업
    resStr += "(";

    for (let i = 0; i < 2; i++) {
      const halfR = r + half * i;
      for (let j = 0; j < 2; j++) {
        const halfC = c + half * j;
        sol(halfR, halfC, half);
      }
    }

    //후위 작업
    resStr += ")";
    return;
  } else {
    resStr += startEl.toString();
    return;
  }
}

sol(0, 0, size);

console.log(resStr);
