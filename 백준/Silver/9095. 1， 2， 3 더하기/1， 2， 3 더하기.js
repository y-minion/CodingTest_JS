const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

input.shift();

const ref = Array.from({ length: 12 }, () => -1);

ref[1] = 1;
ref[2] = 2;
ref[3] = 4;
function sol() {
  for (let i = 4; i < 12; i++) {
    ref[i] = ref[i - 3] + ref[i - 2] + ref[i - 1];
  }
}
sol();

const res = input.map((n) => {
  const num = Number(n);
  return ref[num];
});

console.log(res.join("\n"));
