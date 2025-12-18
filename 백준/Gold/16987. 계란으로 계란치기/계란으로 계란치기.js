const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input.shift());
input = input.map((arr) => arr.split(" ").map((el) => Number(el)));

let cnt = 0;
let resCnt = 0;

function sol(g) {
  if (g === N) {
    resCnt = Math.max(cnt, resCnt);
    return;
  }

  const gEl = input[g];

  if (gEl[0] <= 0 || cnt === N - 1) {
    sol(g + 1);
    return;
  }
  for (let i = 0; i < N; i++) {
    if (i === g) continue;
    const t = input[i];
    if (t[0] <= 0) continue;
    gEl[0] -= t[1];
    t[0] -= gEl[1];
    /*
    ❌ 잘못된 풀이! 이렇게 조건문을 타겟과 잡는 계란이 모두 깨지는경우로 하게되면 동시에 깨지는 경우에는 카운트가 1개만 증가하게 된다.
    if (t[0] <= 0 || gEl[0] <= 0) cnt++;
    */
    if (t[0] <= 0) cnt++;
    if (gEl[0] <= 0) cnt++;

    sol(g + 1);

    /*
    ❌ 잘못된 풀이! 백트래킹의 순서가 완전 잘못됨! 내구도 복구를 먼저 시키면 카운트 복구를 할 수 없다. 먼저 카운트 복구를 하고, 내구도를 복구해야 카운트 복구의 조건문이 정상적으로 돌아간다.
    gEl[0] += t[1];
    t[0] += gEl[1];
    if (t[0] <= 0 || gEl[0] <= 0) cnt--;
    */

    if (t[0] <= 0) cnt--;
    if (gEl[0] <= 0) cnt--;
    gEl[0] += t[1];
    t[0] += gEl[1];
  }
}

sol(0);

console.log(resCnt);
