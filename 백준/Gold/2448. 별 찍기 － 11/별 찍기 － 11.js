const fs = require("fs");

const input = Number(fs.readFileSync("/dev/stdin").toString().trim());

const board = Array.from({ length: input }, () =>
  Array.from({ length: input * 2 - 1 }, () => " ")
);

function sol(row, col, height) {
  if (height === 3) {
    board[row][col] = "*";
    board[row + 1][col - 1] = "*";
    board[row + 1][col + 1] = "*";
    for (let i = 0; i < 5; i++) {
      board[row + 2][col - 2 + i] = "*";
    }

    return;
  }

  const half = height / 2;
  sol(row, col, half);
  sol(row + half, col - half, half);
  sol(row + half, col + half, half);
  return;
}

sol(0, input - 1, input);

const res = board.map((arr) => arr.join("")).join("\n");
console.log(res);
