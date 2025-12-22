const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = Number(input.slice(0, 1)[0]);
const board = input.slice(1).map((str) => str.split(" "));

const teachers = [];
const empties = [];

//선생과 빈칸 추출
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === "T") teachers.push([i, j]);
    if (board[i][j] === "X") empties.push([i, j]);
  }
}

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

//빈칸을 3개 뽑는 조합 추출후 조합들이 유효한지 검사를 하고, 유효하면 즉시 조합찾는 로직을 중단한다.

//먼저 BaseCondition의 로직을 작성한다.
//해당 조합이 유효한지 T를 기준으로 직선으로 뻗어나가면서 검사를한다.
//이때 O를 만나면 중단후 다음 방향으로 넘어간다.
//S를 만나는 순간 이는 실패한 조합이다. 실패를 반환하고 즉시 해당 루프 종료한다. 다른 가지로 넘어가야한다.
function check() {
  let res = true;
  for (const [r, c] of teachers) {
    //4방향 직진
    for (let i = 0; i < 4; i++) {
      let movedR = r;
      let movedC = c;
      while (true) {
        movedR += dx[i];
        movedC += dy[i];
        if (movedR < 0 || N <= movedR || movedC < 0 || N <= movedC) break;
        const curNode = board[movedR][movedC];
        if (curNode === "S") {
          res = false;
          return res;
        }
        if (curNode === "T") break;
        if (curNode === "O") break;
      }
    }
  }

  return res;
}

function sol(startIdx, n) {
  if (n === 3) {
    return check();
  }

  for (let i = startIdx; i < empties.length; i++) {
    const [r, c] = empties[i];
    board[r][c] = "O";
    const res = sol(i + 1, n + 1);
    if (res) return res;
    board[r][c] = "X";
  }

  return false;
}

const res = sol(0, 0) ? "YES" : "NO";

console.log(res);
