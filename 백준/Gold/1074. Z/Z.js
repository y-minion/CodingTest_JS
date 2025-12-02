const fs = require("fs");

const [N, R, C] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split(" ")
  .map((el) => Number(el));

function sol(r, c, n) {
  if (n === 0) return 0;
  const half = 2 ** (n - 1);
  if (r < half && c < half) return sol(r, c, n - 1);
  if (r < half && half <= c) return sol(r, c - half, n - 1) + half ** 2;
  if (half <= r && c < half) return sol(r - half, c, n - 1) + half ** 2 * 2;
  if (half <= r && half <= c)
    return sol(r - half, c - half, n - 1) + half ** 2 * 3;
}

console.log(sol(R, C, N));
