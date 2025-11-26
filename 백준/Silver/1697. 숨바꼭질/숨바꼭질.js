
const fs = require("fs");
//fs.readFileSync("/dev/stdin")
// const a = "4 4\n####\n#JF#\n#..#\n#..#";
let [N, K] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((el) => Number(el));

const maxLange = 200000;
const dis = Array.from({ length: maxLange }, () => -1);
const dx = [-1, 1, 2];

const queue = [];
let head = 0;
let tail = 0;

let isOver = 0;
let movedPos;
function sol(n, k) {
  let res = -1;
  queue[tail++] = n;
  dis[n] = 0;
  while (tail - head !== 0) {
    const curPos = queue[head++];
    const curDis = dis[curPos];
    if (curPos === k) {
      res = curDis;
      break;
    }
    isOver = 100000 <= curPos ? 1 : 0;

    if (isOver) {
      movedPos = curPos - 1;
      if (movedPos < 0 || maxLange < movedPos) continue;
      if (dis[movedPos] !== -1) continue;
      queue[tail++] = movedPos;
      dis[movedPos] = curDis + 1;
    } else {
      for (let i = 0; i < 3; i++) {
        if (i === 2) {
          movedPos = curPos * dx[i];
        } else {
          movedPos = curPos + dx[i];
        }

        if (movedPos < 0 || maxLange < movedPos) continue;
        if (dis[movedPos] !== -1) continue;
        queue[tail++] = movedPos;
        dis[movedPos] = curDis + 1; //오타 조심......
      }
    }
  }

  return res;
}

console.log(sol(N, K));
