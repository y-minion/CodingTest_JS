const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input.shift());

input = input.map((el) => Number(el));

const move = 10 ** 6;
const freq = Array.from({ length: move * 2 + 1 }, () => 0);
const res = [];

function sol() {
  input.forEach((el) => {
    const moved = el + move;
    freq[moved] += 1;
  });

  freq.forEach((cnt, num) => {
    if (cnt === 0) return;
    for (let i = 0; i < cnt; i++) {
      res.push(num - move);
    }
  });

  return res.join("\n");
}

console.log(sol());
