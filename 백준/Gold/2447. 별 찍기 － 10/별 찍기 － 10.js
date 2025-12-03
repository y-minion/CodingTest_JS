const fs = require("fs");

const input = Number(fs.readFileSync("/dev/stdin").toString().trim());

//그림판 초기화
let board = Array.from({ length: input }, () =>
  Array.from({ length: input }, () => " ")
);

function sol(r, c, size) {
  const segment = size / 3;

  if (size === 3) {
    for (let i = 0; i < size; i++) {
      const curR = r + i * segment;
      for (let j = 0; j < size; j++) {
        const curC = c + j * segment;
        if (i === 1 && j === 1) continue;

        board[curR][curC] = "*";
      }
    }

    return;
  }

  for (let i = 0; i < 3; i++) {
    const curR = r + i * segment;
    for (let j = 0; j < 3; j++) {
      const curC = c + j * segment;
      if (i === 1 && j === 1) continue;
      sol(curR, curC, segment);
    }
  }

  return;
}

sol(0, 0, input);

//보드 용접
const arr = board.map((arr) => arr.join(""));
const res = arr.join("\n");

console.log(res);
