
const fs = require("fs");

let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .pop()
  .split(" ")
  .map((el) => Number(el));

function sol(input) {
  let towStack = [[Number.MIN_SAFE_INTEGER, 0]];
  const res = input.map((tow, i) => {
    const pos = i + 1;

    while (towStack[towStack.length - 1][0] < tow) {
      towStack.pop();
      if (towStack.length === 0) {
        towStack.push([tow, pos]);
        return 0;
      }
    }
    const top = towStack[towStack.length - 1];
    towStack.push([tow, pos]);
    return top[1];
  });

  console.log(res.join(" "));
}

sol(input);
