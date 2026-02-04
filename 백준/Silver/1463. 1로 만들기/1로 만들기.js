const fs = require("fs");

let input = Number(fs.readFileSync("/dev/stdin").toString().trim());

const d = Array.from({ length: input + 1 }, () => 0);

function sol() {
  d[1] = 0;
  for (let i = 2; i < input + 1; i++) {
    d[i] = d[i - 1] + 1;
    if (i % 2 === 0) {
      d[i] = Math.min(d[i / 2] + 1, d[i]);
    }

    if (i % 3 === 0) {
      d[i] = Math.min(d[i / 3] + 1, d[i]);
    }
  }
  return d[input];
}

console.log(sol());
