const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split(/\r?\n/);
input.shift();

input = input.map((el) => el.split(" ").map((e) => Number(e)));

const board = Array.from({ length: 100 }, () =>
  Array.from({ length: 100 }, () => 0),
);

function sol() {
  input.forEach(([c, r]) => {
    for (let i = 0; i < 10; i++) {
      const movedR = r + i;
      for (let j = 0; j < 10; j++) {
        const movedC = c + j;
        board[movedR][movedC] = 1;
      }
    }
  });

  let cnt = 0;
  board.forEach((r) => {
    r.forEach((c) => {
      if (!c) return;
      cnt++;
    });
  });

  return cnt;
}

const res = sol();
console.log(res);
