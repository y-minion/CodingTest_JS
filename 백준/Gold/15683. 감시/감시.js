const fs = require("fs");

let initBlindCnt = 0; //초기 사각 카운트
const cctvArr = []; //board를 탐색하며 cctv수집하기

let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((str, r) =>
    str.split(" ").map((el, c) => {
      const num = Number(el);
      if (r === 0) return num;

      if (num === 0) initBlindCnt++;
      if (0 < num && num < 6) cctvArr.push([num, r - 1, c]);
      return num;
    })
  );

const [N, M] = input.slice(0, 1)[0];

const board = input.slice(1);

const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];

const state = []; //cctv의 각도 상태

//CCTV각도 map
const cctvMap = [
  null,
  [[0], [1], [2], [3]],
  [
    [0, 2],
    [1, 3],
  ],
  [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ],
  [
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 0],
    [0, 1, 3],
  ],
  [[0, 1, 2, 3]],
];

let minBlindCnt = Number.MAX_SAFE_INTEGER;

function comb() {
  const vis = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => -1)
  );

  let cnt = 0;
  cctvArr.forEach(([cctv, r, c], idx) => {
    const curState = state[idx]; //현재 CCTV의 감시방향
    const curDir = cctvMap[cctv][curState];

    for (const dir of curDir) {
      let movedR = r;
      let movedC = c;
      vis[movedR][movedC] = 1; //현재 카메라 위치 방문처리

      while (true) {
        movedR += dx[dir];
        movedC += dy[dir];
        if (movedR < 0 || N <= movedR || movedC < 0 || M <= movedC) break;

        const curNode = board[movedR][movedC];
        if (vis[movedR][movedC] !== -1) continue;
        if (curNode === 6) break;
        if (curNode === 0) {
          cnt++;
        }
        vis[movedR][movedC] = 1;
      }
    }
  });
  const curBlindCnt = initBlindCnt - cnt;
  minBlindCnt = minBlindCnt > curBlindCnt ? curBlindCnt : minBlindCnt;
}

function sol(n) {
  if (n === cctvArr.length) {
    comb();
    return;
  }

  for (let i = 0; i < 4; i++) {
    const curCCTV = cctvArr[n][0]; //현재 CCTV종류
    if (curCCTV === 2 && 1 < i) continue;
    if (curCCTV === 5 && 0 < i) continue;
    state[n] = i;
    sol(n + 1);
  }
}

sol(0);
console.log(minBlindCnt);
