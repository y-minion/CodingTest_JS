const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split(/\s+/);

const n = input.shift();

function sol() {
  const arr = input.map((char) => BigInt(char.split("").reverse().join("")));
  arr.sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });
  return arr.join("\n");
}

const res = sol();
console.log(res);
