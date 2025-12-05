const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input
  .shift()
  .split(" ")
  .map((el) => Number(el));
const board = input.map((str) => str.split("").map((el) => Number(el)));

const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];

const vis = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => [-1, -1])
);

const queue = [];
let head = 0;
let tail = 0;

function sol() {
  const curEl = [0, 0, 0];
  queue[tail++] = curEl;
  vis[0][0][0] = 1;

  let curDis = 0;

  while (tail !== head) {
    const [curR, curC, count] = queue[head++];
    curDis = vis[curR][curC][count]; //현재 거리

    if (curR === N - 1 && curC === M - 1) return curDis;

    for (let i = 0; i < 4; i++) {
      const movedR = curR + dx[i];
      const movedC = curC + dy[i];

      if (movedR < 0 || N <= movedR || movedC < 0 || M <= movedC) continue;
      if (vis[movedR][movedC][count] !== -1) continue;

      if (count === 1 && board[movedR][movedC] !== 0) continue;

      //벽 뚫는경우
      if (count === 0 && board[movedR][movedC] !== 0) {
        queue[tail++] = [movedR, movedC, 1];
        vis[movedR][movedC][1] = curDis + 1;
        continue;
      }

      queue[tail++] = [movedR, movedC, count];
      vis[movedR][movedC][count] = curDis + 1;
    }
  }

  return -1;
}

const res = sol();
console.log(res);
