const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, K] = input
  .shift()
  .split(" ")
  .map((e) => Number(e));

input = input.map((str) => str.split(" ").map((e) => Number(e)));

function sol() {
  input.sort((a, b) => {
    const [A, aG, aS, aB] = a;
    const [B, bG, bS, bB] = b;
    if (aG > bG) return -1;
    else if (aG < bG) return 1;
    else {
      if (aS > bS) return -1;
      else if (aS < bS) return 1;
      else {
        if (aB > bB) return -1;
        if (aB < bB) return 1;
        else return 0;
      }
    }
  });

  let grade = 1;
  let res = 1;
  if (input[0][0] === K) return 1;
  for (let i = 1; i < N; i++) {
    const [prv, prvG, prvS, prvB] = input[i - 1];
    const [cur, curG, curS, curB] = input[i];
    if (prvG !== curG || prvS !== curS || prvB !== curB) grade = i + 1;

    if (cur === K) {
      res = grade;
      break;
    }
  }

  return grade;
}

const res = sol();
console.log(res);
