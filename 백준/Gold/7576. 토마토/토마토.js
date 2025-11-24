
const fs = require("fs");
//fs.readFileSync("/dev/stdin")
// const a = "6 4\n0 0 0 0 0 0\n1 0 0 0 0 0";
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [M, N] = input
  .shift()
  .split(" ")
  .map((el) => Number(el));

const board = input.map((el) => el.split(" ").map((char) => Number(char)));

const queue = [];

let head = 0;
let tail = 0;
let vis = Array.from({ length: N }, () => Array.from({ length: M }, () => 0));
let dis = Array.from({ length: N }, () => Array.from({ length: M }, () => -1));
let countZero = 0;
let countOne = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 1) {
      queue[tail++] = [i, j];
      dis[i][j] = 0; //거리 삽입
      vis[i][j] = 1;
      countOne++;
    } else if (board[i][j] === 0) {
      countZero++;
    }
  }
}

const countGoal = countZero + countOne; //이 갯수가 맞아야한다.

const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];

let curCount = 0;
function sol(board) {
  let curRow;
  let curCol;
  while (tail - head !== 0) {
    [curRow, curCol] = queue[head++];
    curCount++;
    const curDis = dis[curRow][curCol]; //현재 확산 거리 확인
    for (let i = 0; i < 4; i++) {
      const movedRow = curRow + dx[i];
      const movedCol = curCol + dy[i];

      //범위 검사
      if (movedRow < 0 || N <= movedRow || movedCol < 0 || M <= movedCol)
        continue;

      //방문여부검사+토마토 존재 검사
      if (vis[movedRow][movedCol] === 1 || board[movedRow][movedCol] === -1)
        continue;

      queue[tail++] = [movedRow, movedCol];
      vis[movedRow][movedCol] = 1;
      dis[movedRow][movedCol] = curDis + 1; //현재 노드에 해당하는 거리에 +1된 거리를 확산된 노드에 삽입한다.
    }
  }

  const finalDis = curCount !== countGoal ? -1 : dis[curRow][curCol];
  console.log(finalDis);
}

sol(board);
