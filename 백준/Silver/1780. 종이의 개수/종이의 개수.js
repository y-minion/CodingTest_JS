const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const size = Number(input.shift());

const board = input.map((str) => str.split(" ").map((el) => Number(el)));

function sol(row, col, n) {
  const firstEl = board[row][col];

  const parMap = new Map([
    [-1, 0],
    [0, 0],
    [1, 0],
  ]);

  //일반 재귀식
  const gap = n / 3;

  //완전 탐색
  for (let i = row; i < row + n; i++) {
    for (let j = col; j < col + n; j++) {
      const curEl = board[i][j];

      //3등분 되는 상황
      if (firstEl !== curEl) {
        for (let i = 0; i < 3; i++) {
          const startRow = gap * i;
          for (let j = 0; j < 3; j++) {
            const startCol = gap * j;
            const map = sol(row + startRow, col + startCol, n / 3);
            for (const [key, val] of map) {
              parMap.set(key, parMap.get(key) + val);
            }
          }
        }

        return parMap;
      }
    }
  }
  parMap.set(firstEl, parMap.get(firstEl) + 1);
  return parMap;
}

const resMap = sol(0, 0, size);

let res = [];
for (const [_, val] of resMap) {
  res.push(val);
}

console.log(res.join("\n"));
