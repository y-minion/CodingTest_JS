/**
 * 생각..
 * 문자열 뒤집기인데 단순히 reverse로 해결될 문제가 아닌데..?
 * 근데 뒤집는 특성이 stack자료구조 성격과 똑같다.
 *
 * 그러면 stack구조를 사용해서 문자열 뒤집기를 조건에 따라 해보자.
 * 일단 <,공백이 나오면 stack에 저장된 char를 모두 쏟아낸다.
 * 그리고 <가 등장시 isTag를 참으로 변경. > 등장시 거짓으로 변경
 *
 * isTag가 거짓일때만 stack에 Push한다.
 * isTag가 참이면 그대로 중첩한다.
 * 그리고 <,>,공백은 그대로 중첩한다.
 *
 *
 */

const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim();
let isTag = false;
let res = "";
const stack = [];

function sol() {
  input = input.split("");
  input.push(" ");
  input.forEach((char) => {
    if (char === "<") {
      while (stack.length !== 0) {
        res += stack.pop();
      }
      isTag = true;
      res += char;
    } else if (char === ">") {
      isTag = false;
      res += char;
    } else if (char === " ") {
      if (isTag) {
        res += char;
      } else {
        while (stack.length !== 0) {
          res += stack.pop();
        }
        res += char;
      }
    } else {
      if (isTag) {
        res += char;
      } else {
        stack.push(char);
      }
    }
  });
}

sol();
console.log(res.trim());
