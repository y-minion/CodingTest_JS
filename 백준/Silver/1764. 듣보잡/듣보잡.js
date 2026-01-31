const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
input.shift();

function sol() {
  const set = new Set();
  const res = [];
  input.forEach((e) => {
    if (set.has(e)) {
      res.push(e);
      return;
    }
    set.add(e);
  });

  res.sort((a, b) => a.localeCompare(b));
  res.unshift(res.length);
  return res.join("\n");
}

const res = sol();
console.log(res);
