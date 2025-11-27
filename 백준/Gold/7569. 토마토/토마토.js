const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [M, N, H] = input
  .shift()
  .split(" ")
  .map((el) => Number(el));

const board = input.map((str) => str.split(" ").map((el) => Number(el)));

let totalCount = 0; //목표 토마토 개수
let perfectCount = 0;
let curCount = 0; //현재 토마토 개수

const queue = [];
let head = 0;
let tail = 0;

const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];
const dz = [N, -N]; //+N,-N

//vis만들기
const vis = Array.from({ length: N * H }, () =>
  Array.from({ length: M }, () => -1)
);

//현재 존재하는 토마토 개수 수집
for (let i = 0; i < N * H; i++) {
  for (let j = 0; j < M; j++) {
    //토마토 발견하면 개수 카운팅 + 익어있는 토마도 발견시 즉시 큐에 삽입 -> 동시 확산 -------->이때 큐에 삽입시 방문처리 필수
    if (board[i][j] === 0) totalCount++;
    if (board[i][j] === 1) {
      queue[tail++] = [i, j];
      vis[i][j] = 0; //방문 처리

      curCount++; //큐에 넣을때 현재 개수도 카운팅 해줘야한다.
      totalCount++;
      perfectCount++;
    }
  }
}

function sol() {
  if (perfectCount === totalCount) return 0;
  let curDay = 0;
  while (tail - head !== 0) {
    const [curRow, curCol] = queue[head++];
    const originRow = curRow % N;
    curDay = vis[curRow][curCol];

    for (let i = 0; i < 4; i++) {
      let movedRow = originRow + dx[i];
      let movedRealRow = curRow + dx[i];
      let movedCol = curCol + dy[i];
      if (movedRow < 0 || N <= movedRow || movedCol < 0 || M <= movedCol)
        continue;

      if (
        vis[movedRealRow][movedCol] !== -1 ||
        board[movedRealRow][movedCol] === -1
      )
        continue;

      queue[tail++] = [movedRealRow, movedCol];
      vis[movedRealRow][movedCol] = curDay + 1;
      curCount++;
    }

    for (let i = 0; i < 2; i++) {
      const movedZ = curRow + dz[i];
      if (movedZ < 0 || N * H <= movedZ) continue;
      if (vis[movedZ][curCol] !== -1 || board[movedZ][curCol] === -1) continue;
      queue[tail++] = [movedZ, curCol];
      vis[movedZ][curCol] = curDay + 1;
      curCount++;
    }
  }

  const res = totalCount === curCount ? curDay : -1;
  return res;
}

console.log(sol());
