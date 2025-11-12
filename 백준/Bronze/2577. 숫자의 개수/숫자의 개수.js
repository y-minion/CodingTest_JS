const fs = require("fs");

const [A, B, C] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((n) => Number(n));

function sol(a, b, c) {
  const multiple = (a * b * c).toString();
  const res = Array.from({ length: 10 }, () => 0);
  [...multiple].forEach((char) => {
    res[Number(char)] += 1;
  });
  console.log(res.join("\n"));
}

sol(A, B, C);
