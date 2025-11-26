const fs = require("fs");
//fs.readFileSync("/dev/stdin")
// const a = "4 4\n####\n#JF#\n#..#\n#..#";
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input.shift());
const board = input.map((str) => str.split(""));

let queue = [];
let head = 0;
let tail = 0;

const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];

function sol(n, board) {
  /**
   * 목표 갯수 -> 큐에서 push할때 count변수 추가
   */
  const finalCount = n * n;

  let count = 0;
  let ableCount = 0;
  let disabledCount = 0;

  /**
   * B,R만 존재하는 보드 -> 색맹용
   */
  const disabledBoard = board.map((arr) => {
    return arr.map((char) => (char === "G" ? "R" : char));
  });

  const vis = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => -1)
  );

  /**
   * 색맹용 방문 배열
   */
  const disabledVis = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => -1)
  );

  //1차 정상인 탐색
  while (finalCount !== count) {
    let curPos;
    let curColor;

    //vis가 -1인곳 찾기(시작점 탐색)
    for (let i = 0; i < n; i++) {
      if (curPos) break;
      for (let j = 0; j < n; j++) {
        if (vis[i][j] === -1) {
          curPos = [i, j];
          curColor = board[i][j];
          break;
        }
      }
    }

    queue[tail++] = curPos;
    vis[curPos[0]][curPos[1]] = curColor;
    count++;

    while (tail - head !== 0) {
      const [curRow, curCol] = queue[head++]; //큐에서 pop

      //확산시도
      for (let d = 0; d < 4; d++) {
        const movedRow = curRow + dx[d];
        const movedCol = curCol + dy[d];

        if (movedRow < 0 || n <= movedRow || movedCol < 0 || n <= movedCol)
          continue;
        if (
          vis[movedRow][movedCol] !== -1 ||
          board[movedRow][movedCol] !== curColor
        )
          continue;

        queue[tail++] = [movedRow, movedCol];
        vis[movedRow][movedCol] = curColor;
        count++;
      }
    }
    ableCount++;
  }

  count = 0; //카운트 초기화
  //큐 초기화
  queue = [];
  head = 0;
  tail = 0;

  while (finalCount !== count) {
    let curPos;
    let curColor;

    //vis가 -1인곳 찾기(시작점 탐색)
    for (let i = 0; i < n; i++) {
      if (curPos) break;
      for (let j = 0; j < n; j++) {
        if (disabledVis[i][j] === -1) {
          curPos = [i, j];
          curColor = disabledBoard[i][j];
          break;
        }
      }
    }

    queue[tail++] = curPos;
    disabledVis[curPos[0]][curPos[1]] = curColor;
    count++;

    while (tail - head !== 0) {
      const [curRow, curCol] = queue[head++]; //큐에서 pop

      //확산시도
      for (let d = 0; d < 4; d++) {
        const movedRow = curRow + dx[d];
        const movedCol = curCol + dy[d];

        if (movedRow < 0 || n <= movedRow || movedCol < 0 || n <= movedCol)
          continue;
        if (
          disabledVis[movedRow][movedCol] !== -1 ||
          disabledBoard[movedRow][movedCol] !== curColor
        )
          continue;

        queue[tail++] = [movedRow, movedCol];
        disabledVis[movedRow][movedCol] = curColor;
        count++;
      }
    }
    disabledCount++;
  }
  const res = `${ableCount} ${disabledCount}`;
  return res;
}

console.log(sol(N, board));
