const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split(/\s+/);

const n = input.shift();
input = [...new Set(input)];

function sol() {
  input.sort((a, b) => {
    if (a.length > b.length) return 1;
    if (a.length < b.length) return -1;
    if (a < b) return -1;
    if (a > b) return 1;
  });

  return input.join("\n");
}

const res = sol();
console.log(res);
