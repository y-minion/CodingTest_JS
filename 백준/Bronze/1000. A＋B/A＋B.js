const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim();

const [A, B] = input.split(" ");

function sol(a, b) {
  console.log(Number(a) + Number(b));
}

sol(A, B);
