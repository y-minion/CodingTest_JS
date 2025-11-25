
const fs = require("fs");
//fs.readFileSync("/dev/stdin")
// const a = "4 4\n####\n#JF#\n#..#\n#..#";
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [R, C] = input
  .shift()
  .split(" ")
  .map((el) => Number(el));

const maze = input.map((str) => str.split(""));

const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];
const fireDis = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => Number.MAX_SAFE_INTEGER)
);

const fireVis = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => 0)
);

const jihunDis = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => -1)
);

const jihunVis = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => 0)
);

const queue = [];
let head = 0;
let tail = 0;

let firePos = [];
let jihunPos;

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (maze[i][j] === "J") {
      jihunPos = [i, j];
    } else if (maze[i][j] === "F") {
      firePos.push([i, j]); //불이 여러개일 수 있다.
    }
    /*
    🚨 이렇게 출구 배열을 만드는 행위는 불필요하고 변수가 너무 많다! ->큐에서 pop할때 현재 위치를 파악하기
    else if (
      (i === 0 || i === R - 1 || j === 0 || j === C - 1) &&
      maze[i][j] === "."
    ) {
      goalPos.push([i, j]);
    }

    */
  }
}

function sol(maze) {
  const bfsArr = [firePos, jihunPos];

  let idx = 0;
  for (const pos of bfsArr) {
    const vis = idx === 0 ? fireVis : jihunVis;
    const dis = idx === 0 ? fireDis : jihunDis;
    let curRow, curCol;
    if (idx === 0) {
      pos.forEach((el) => {
        queue[tail++] = el;
        [curRow, curCol] = el;
        vis[curRow][curCol] = 1;
        dis[curRow][curCol] = 0;
      });
    } else {
      [curRow, curCol] = pos;
      queue[tail++] = pos;
      vis[curRow][curCol] = 1;
      dis[curRow][curCol] = 0;
    }

    while (tail - head !== 0) {
      [curRow, curCol] = queue[head++];
      const curDis = dis[curRow][curCol]; //현재 거리 확인
      if (
        idx === 1 &&
        (curRow === 0 || curCol === 0 || curRow === R - 1 || curCol === C - 1)
      )
        return curDis + 1;
      for (let i = 0; i < 4; i++) {
        const movedRow = curRow + dx[i]; //🚨설계를 확실하게 하자... 처음에 그냥 dx[i]로만 할당해 버그발생함. 확실하게 curRow+dx[i]인걸 설계하자.
        const movedCol = curCol + dy[i];
        if (movedRow < 0 || R <= movedRow || movedCol < 0 || C <= movedCol)
          continue;

        //현재 위치가 지훈,불 인지 검사할 필요는 없다. 이미 큐에 삽입해서 상관없다.
        if (vis[movedRow][movedCol] === 1 || maze[movedRow][movedCol] === "#")
          continue;

        if (idx === 1 && fireDis[movedRow][movedCol] <= curDis + 1) continue; //지훈이 전용 유효성 검사
        queue[tail++] = [movedRow, movedCol]; //🚨항상 설계 더 꼼꼼하게 하기...! 큐에 push하는걸 까먹었다!!!-> 항상 설계 더 확실하게 하자.;
        vis[movedRow][movedCol] = 1;
        dis[movedRow][movedCol] = curDis + 1;
      }
    }

    if (idx === 1) {
      return "IMPOSSIBLE"; //🚨문제 예시 잘보기... 탈출구 도달할경우+1을 해야 진짜 이동시간이 된다.
    }

    idx++;
  }
}

console.log(sol(maze));
