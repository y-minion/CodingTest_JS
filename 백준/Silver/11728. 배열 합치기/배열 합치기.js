const fs = require("fs");

let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((str) => str.split(" ").map((el) => Number(el)));

let [[N, M], arrA, arrB] = input;

function sol() {
  arrA.sort((a, b) => a - b);
  arrB.sort((a, b) => a - b);
  let idxA = 0;
  let idxB = 0;
  const res = [];

  while (idxA < N && idxB < M) {
    if (arrA[idxA] > arrB[idxB]) {
      res.push(arrB[idxB++]);
    } else if (arrA[idxA] < arrB[idxB]) {
      res.push(arrA[idxA++]);
    } else {
      res.push(arrB[idxB++], arrA[idxA++]);
    }
  }

  if (idxA < N) {
    res.push(...arrA.slice(idxA));
  }

  if (idxB < M) {
    res.push(...arrB.slice(idxB));
  }

  console.log(res.join(" "));
}

sol();
