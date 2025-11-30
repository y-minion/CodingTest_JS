const fs = require("fs");

const N = Number(fs.readFileSync("/dev/stdin").toString().trim());

let res = [];
function hanoi(a, b, n) {
  if (n === 1) return res.push(`${a} ${b}`);
  hanoi(a, 6 - a - b, n - 1);
  res.push(`${a} ${b}`);
  hanoi(6 - a - b, b, n - 1);
}

res.push(Math.pow(2, N) - 1);
hanoi(1, 3, N);

console.log(res.join("\n"));
