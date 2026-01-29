const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split(/\s+/);

const n = input.shift();

function sol() {
  input.sort((a, b) => {
    if (a.length > b.length) return 1;
    if (a.length < b.length) return -1;
    const e = a.localeCompare(b);
    if (e === -1) return -1;
    if (e === 1) return 1;
    return 0;
  });

  const arr = [];
  input.forEach((char) => {
    if (arr.length !== 0 && arr[arr.length - 1] === char) return;
    arr.push(char);
  });

  return arr.join("\n");
}

const res = sol();
console.log(res);
