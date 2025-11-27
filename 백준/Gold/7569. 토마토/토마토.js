const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [M, N, H] = input
  .shift()
  .split(" ")
  .map((el) => Number(el));

let totalCount = 0; //목표 토마토 개수
let perfectCount = 0;
let curCount = 0; //현재 토마토 개수

const dx = [0, -1, 0, 1, 0, 0];
const dy = [1, 0, -1, 0, 0, 0];
const dz = [0, 0, 0, 0, 1, -1];

//3차원 vis 배열
const vis = Array.from({ length: H }, () =>
  Array.from({ length: N }, () => Array.from({ length: M }, () => -1))
);

input = input.map((str) => str.split(" ").map((el) => Number(el)));

const board = [];
for (let i = 0; i < H; i++) {
  board.push(input.slice(i * N, i * N + N));
}

const queue = [];
let head = 0;
let tail = 0;

for (let z = 0; z < H; z++) {
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < M; y++) {
      if (board[z][x][y] === 0) totalCount++;
      if (board[z][x][y] === 1) {
        queue[tail++] = [z, x, y];
        vis[z][x][y] = 0;
        curCount++;
        totalCount++;
        perfectCount++;
      }
    }
  }
}

function sol() {
  if (perfectCount === totalCount) return 0;
  let curDay = 0;
  while (tail - head !== 0) {
    const [curH, curRow, curCol] = queue[head++];
    curDay = vis[curH][curRow][curCol];
    for (let i = 0; i < 6; i++) {
      let movedRow = curRow + dx[i];
      let movedCol = curCol + dy[i];
      let movedH = curH + dz[i];
      if (
        movedRow < 0 ||
        N <= movedRow ||
        movedCol < 0 ||
        M <= movedCol ||
        movedH < 0 ||
        H <= movedH
      )
        continue;
      if (
        vis[movedH][movedRow][movedCol] !== -1 ||
        board[movedH][movedRow][movedCol] === -1
      )
        continue;
      queue[tail++] = [movedH, movedRow, movedCol];
      vis[movedH][movedRow][movedCol] = curDay + 1;
      curCount++;
    }
  }

  const res = totalCount === curCount ? curDay : -1;
  return res;
}
console.log(sol());
