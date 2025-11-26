const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input.shift());

const board = input.map((str) => str.split(""));
const disabledBoard = board.map((arr) => {
  return arr.map((char) => (char === "G" ? "R" : char));
});

const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];

const vis = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));
const disabledVis = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => 0)
);

function bfs(startRow, startCol, vis, board) {
  const queue = [];
  let head = 0;
  let tail = 0;

  queue[tail++] = [startRow, startCol];
  vis[startRow][startCol] = 1;

  const curColor = board[startRow][startCol];
  while (tail - head !== 0) {
    const [curRow, curCol] = queue[head++]; //큐에서 pop

    for (let d = 0; d < 4; d++) {
      const movedRow = curRow + dx[d];
      const movedCol = curCol + dy[d];

      if (movedRow < 0 || N <= movedRow || movedCol < 0 || N <= movedCol)
        continue;
      if (
        vis[movedRow][movedCol] !== 0 ||
        board[movedRow][movedCol] !== curColor
      )
        continue;

      queue[tail++] = [movedRow, movedCol];
      vis[movedRow][movedCol] = 1;
    }
  }
}

function findAllColor(vis, board) {
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (vis[i][j] === 0) {
        bfs(i, j, vis, board);
        count++;
      }
    }
  }

  return count;
}

function sol() {
  const abledPerson = findAllColor(vis, board);
  const disabledPerson = findAllColor(disabledVis, disabledBoard);
  console.log(`${abledPerson} ${disabledPerson}`);
}

sol();
