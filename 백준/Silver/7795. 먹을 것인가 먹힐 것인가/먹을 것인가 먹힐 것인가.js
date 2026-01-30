const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split(/\n/);

const T = Number(input.shift());
input = input.map((str) =>
  str
    .trim()
    .split(" ")
    .map((el) => Number(el)),
);
function sol() {
  const res = [];
  for (let i = 0; i < T; i++) {
    let cnt = 0;
    let pointer = 0;
    let [[N, M], arrA, arrB] = input.splice(0, 3);
    arrA.sort((a, b) => a - b);
    arrB.sort((a, b) => a - b);

    arrA.forEach((a) => {
      while (pointer < M && a > arrB[pointer]) {
        pointer++;
      }

      cnt += pointer;
    });

    res.push(cnt);
  }

  return res.join("\n");
}

const res = sol();
console.log(res);
