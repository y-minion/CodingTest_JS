const fs = require("fs");

let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s+/)
  .map((el) => Number(el));

input.splice(0, 2);

const map = new Map();
const appear = new Map();

function sol() {
  input.forEach((n, i) => {
    map.set(n, (map.get(n) || 0) + 1);
    if (appear.get(n) || appear.get(n) === 0) return;
    appear.set(n, i);
  });

  input.sort((a, b) => {
    const freqA = map.get(a);
    const freqB = map.get(b);

    if (freqA > freqB) return -1;
    if (freqA < freqB) return 1;
    return appear.get(a) - appear.get(b);
  });

  return input.join(" ");
}

const res = sol();
console.log(res);
