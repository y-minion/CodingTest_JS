
const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("");

function sol(input) {
  const stack = [];

  for (const el of input) {
    if (el === "(" || el === "[") {
      stack.push(el);
      continue;
    }

    if (el === ")" || el === "]") {
      const target = el === ")" ? "(" : "["; //타겟 설정
      const multiNum = el === ")" ? 2 : 3;
      let sum = 0;

      //stack 왼쪽으로 훑기
      while (stack[stack.length - 1] !== target) {
        const top = stack.pop();
        if (typeof top !== "number") return 0; //괄호 조건 오류 -> 강제 종료
        sum += top;
      }
      stack.pop(); //열린 괄호 제거
      if (sum === 0) sum = 1;

      stack.push(sum * multiNum);
    }
  }

  let res = 0;

  for (const num of stack) {
    if (typeof num !== "number") return 0;
    res += num;
  }
  return res;
}

const res = sol(input);
console.log(res);
