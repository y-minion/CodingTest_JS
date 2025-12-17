const fs = require("fs");

let board = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((str) => str.split(""));

const resArr = [];
const state = [];

function comb(pos, startIdx) {
  if (pos === 7) {
    const countS = state.reduce((acc, num) => {
      const curR = Math.floor(num / 5);
      const curC = num % 5;
      const el = board[curR][curC];
      if (el === "S") return acc + 1;
      return acc;
    }, 0);

    if (4 <= countS) {
      /*
      resArr.push(state); //최악의 실수. 배열 주소 자체를 넣어서 값이 이상하게 반환되고 있었음.
      */

      resArr.push([...state]);
    }

    return;
  }

  for (let i = startIdx; i < 25; i++) {
    state[pos] = i;
    comb(pos + 1, i + 1);
  }
}

const dr = [0, 1, 0, -1];
const dc = [1, 0, -1, 0];

function findConnect(selected) {
  const queue = [];
  let head = 0;
  let tail = 0;
  let count = 0;
  const vis = [];

  const curStud = selected[0];
  queue[tail++] = curStud;
  vis[curStud] = 1;
  count++;

  while (tail - head !== 0) {
    const curNode = queue[head++];
    const curR = Math.floor(curNode / 5);
    const curC = curNode % 5;

    for (let i = 0; i < 4; i++) {
      const movedR = curR + dr[i];
      const movedC = curC + dc[i];
      const movedStud = 5 * movedR + movedC;
      if (movedR < 0 || 5 <= movedR || movedC < 0 || 5 <= movedC) continue;
      if (!selected.includes(movedStud) || vis[movedStud]) continue;
      queue[tail++] = movedStud;
      vis[movedStud] = 1;
      count++;
    }
  }

  return count === 7;
}

comb(0, 0);

const res = resArr.reduce(
  (acc, comb) => (findConnect(comb) ? acc + 1 : acc),
  0
);

console.log(res);
