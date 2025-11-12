const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, X] = input[0]
  .trim()
  .split(" ")
  .map((n) => Number(n));
const arr = input[1]
  .trim()
  .split(" ")
  .map((n) => Number(n));

function sol(x, arr) {
  console.log(arr.filter((n) => n < x).join(" "));
}

sol(X, arr);
