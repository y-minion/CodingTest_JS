const fs = require("fs");

// [8, 4, 3, 6, 8, 7, 5, 2, 1];
let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => Number(el));

function sol(input) {
  const n = input.splice(0, 1);
  const goalArr = input;
  const numArr = Array.from({ length: n }, (_, i) => n - i);
  const stack = [];
  const resArr = [];

  let curNum;
  for (const el of goalArr) {
    if (numArr.length === 0 || el < numArr[numArr.length - 1]) {
      while (curNum !== el) {
        if (stack.length === 0) return console.log("NO");
        curNum = stack.pop();
        resArr.push("-");
      }
    } else if (el > numArr[numArr.length - 1]) {
      while (stack[stack.length - 1] !== el) {
        stack.push(numArr.pop());
        resArr.push("+");
      }
      curNum = stack.pop();
      resArr.push("-");
    } else {
      stack.push(numArr.pop());
      resArr.push("+");
      curNum = stack.pop();
      resArr.push("-");
    }
  }

  console.log(resArr.join("\n"));
}

sol(input);
