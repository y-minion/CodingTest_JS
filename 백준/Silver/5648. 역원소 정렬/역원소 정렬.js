const fs = require("fs");

let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s+/)
  .map((char) => Number(char));

const n = input.shift();

function sol() {
  const arr = input.map((num) => {
    const arr = [];
    while (num !== 0) {
      const rest = num % 10;
      num = Math.floor(num / 10);
      arr.push(rest);
    }
    return Number(arr.join(""));
  });

  arr.sort((a, b) => a - b);
  return arr;
}

const res = sol().join("\n");
console.log(res);
