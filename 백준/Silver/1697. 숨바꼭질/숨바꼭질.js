
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

const queue = [];
let head = 0;
let tail = 0;

function sol(n, k) {
  let res = -1;
  queue[tail++] = n;
  dis[n] = 0;

  while (tail - head !== 0) {
    const curPos = queue[head++];
    const curDis = dis[curPos];

    const movedPosArr = [curPos + 1, curPos - 1, curPos * 2];
    if (curPos === k) {
      res = curDis;
      break;
    }

    for (const movedPos of movedPosArr) {
      if (movedPos < 0 || 100000 < movedPos) continue;
      if (dis[movedPos] !== -1) continue;
      queue[tail++] = movedPos;
      dis[movedPos] = curDis + 1; //오타 조심......
    }
  }

  return res;
}

console.log(sol(N, K));
