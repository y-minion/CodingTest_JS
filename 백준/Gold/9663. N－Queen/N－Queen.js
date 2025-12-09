const fs = require("fs");

const N = Number(fs.readFileSync("/dev/stdin").toString().trim());

const d1 = [];
const d2 = [];
const d3 = [];

let count = 0;
function sol(row) {
  if (row === N) {
    count++;
    return;
  }

  for (let i = 0; i < N; i++) {
    const d1Tar = i;
    const d2Tar = row + i;
    const d3Tar = row - i + N - 1;
    if (d1[d1Tar] || d2[d2Tar] || d3[d3Tar]) continue;
    d1[d1Tar] = 1;
    d2[d2Tar] = 1;
    d3[d3Tar] = 1;
    sol(row + 1);
    d1[d1Tar] = 0;
    d2[d2Tar] = 0;
    d3[d3Tar] = 0;
  }
}

sol(0);
console.log(count);
