const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = input[0];
const s = [0, ...input.splice(1)];

function sol() {
  const d = Array.from({ length: N + 1 }, () => 0);
  const total = s.reduce((acc, n) => acc + n, 0);
  if (N <= 2) return total;

  d[1] = s[1];
  d[2] = s[2];
  d[3] = s[3];

  for (let i = 4; i < N; i++) {
    d[i] = s[i] + Math.min(d[i - 2], d[i - 3]);
  }
  return total - Math.min(d[N - 2], d[N - 1]);
}
const res = sol();

console.log(res);
