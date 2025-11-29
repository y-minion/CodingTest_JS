const fs = require("fs");

const [A, B, C] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(BigInt);

function pow(a, b, c) {
  if (b === 1n) return a % c;
  let flag = 0;

  if (b % 2n !== 0n) {
    b--;
    flag = 1;
  }
  const half = pow(a, b / 2n, c);
  const res = (half * half) % c;
  return !flag ? res : (res * a) % c;
}

console.log(pow(A, B, C).toString());
