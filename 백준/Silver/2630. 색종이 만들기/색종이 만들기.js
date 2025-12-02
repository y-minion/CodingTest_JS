const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const size = Number(input.shift());
const board = input.map((str) => str.split(" ").map((el) => Number(el)));

const res = [0, 0];

function sol(row, col, n) {
  const startEl = board[row][col];

  let isUniform = true;
  for (let i = row; i < row + n; i++) {
    for (let j = col; j < col + n; j++) {
      const curEl = board[i][j];

      if (curEl !== startEl) {
        isUniform = false;
        break;
      }
    }
    if (!isUniform) break;
  }

  if (isUniform) {
    res[startEl] += 1;

    return;
  }

  //4등분 실행
  if (!isUniform) {
    const half = n / 2;
    for (let i = 0; i < 2; i++) {
      const newRow = row + half * i;
      for (let j = 0; j < 2; j++) {
        const newCol = col + half * j;

        sol(newRow, newCol, half);
      }
    }
    return;
  }
}

sol(0, 0, size);

console.log(res.join("\n"));
