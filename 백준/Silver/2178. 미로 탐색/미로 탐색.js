
const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input
  .shift()
  .split(" ")
  .map((el) => Number(el));

const maze = input.map((str) => str.split("").map((el) => Number(el)));
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
let dis = Array.from({ length: N }, () => Array.from({ length: M }, () => 0));
let curDis = 0;
const queue = [];
let head = 0;
let tail = 0;

function sol(maze) {
  let curPos = [0, 0];
  let [curRow, curCol] = curPos;
  queue[tail++] = curPos;
  dis[curRow][curCol] = ++curDis; //1로 초기화

  while (tail - head !== 0) {
    [curRow, curCol] = queue[head++];
    curDis = dis[curRow][curCol]; //큐에서 pop한 현재 거리 초기화(이 거리를 기준으로 1 더한다.)

    for (let i = 0; i < 4; i++) {
      const movedRow = curRow + dx[i];
      const movedCol = curCol + dy[i];
      if (movedRow < 0 || N <= movedRow || movedCol < 0 || M <= movedCol)
        continue;
      if (maze[movedRow][movedCol] === 0 || dis[movedRow][movedCol] !== 0)
        continue;
      queue[tail++] = [movedRow, movedCol];
      dis[movedRow][movedCol] = curDis + 1;
    }
  }

  const res = dis[N - 1][M - 1];
  console.log(res);
}

sol(maze);
