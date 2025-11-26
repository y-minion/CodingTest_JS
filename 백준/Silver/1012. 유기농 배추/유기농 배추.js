const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];

function bfs(maxRow, maxCol, startRow, startCol, board, vis) {
  const queue = [];
  let head = 0;
  let tail = 0;
  queue[tail++] = [startRow, startCol];
  vis[startRow][startCol] = 1;

  while (tail - head !== 0) {
    const [curRow, curCol] = queue[head++];
    for (let d = 0; d < 4; d++) {
      const movedRow = curRow + dx[d];
      const movedCol = curCol + dy[d];
      if (
        movedRow < 0 ||
        maxRow <= movedRow ||
        movedCol < 0 ||
        maxCol <= movedCol
      )
        continue;
      if (vis[movedRow][movedCol] !== 0 || board[movedRow][movedCol] === 0)
        continue;

      queue[tail++] = [movedRow, movedCol];
      vis[movedRow][movedCol] = 1; //방문처리 제발 까먹지 말자..!!!!!!!!!!
    }
  }
}

function sol(input) {
  const testEA = Number(input.shift());
  const resArr = [];
  for (let i = 0; i < testEA; i++) {
    let count = 0;
    const [M, N, K] = input
      .shift()
      .split(" ")
      .map((el) => Number(el));

    const board = Array.from({ length: N }, () =>
      Array.from({ length: M }, () => 0)
    );

    const vis = Array.from({ length: N }, () =>
      Array.from({ length: M }, () => 0)
    );

    const targetPos = input
      .splice(0, K)
      .map((str) => str.split(" ").map((el) => Number(el)));

    //배추 심기
    //문제를 헷갈리게 주네..?
    targetPos.forEach(([col, row]) => {
      board[row][col] = 1;
    });

    for (let j = 0; j < N; j++) {
      for (let k = 0; k < M; k++) {
        if (vis[j][k] === 0 && board[j][k] === 1) {
          //BFS 로직 실행
          bfs(N, M, j, k, board, vis);
          //확산작업 끝나면 count 증가.
          count++;
        }
      }
    }

    //count 를 결과 배열에 push하기
    resArr.push(count);
  }

  const res = resArr.join("\n");
  console.log(res);
}

sol(input);
