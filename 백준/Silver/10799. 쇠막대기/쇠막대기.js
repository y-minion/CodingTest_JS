
const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim();

function sol(input) {
  const stack = [];
  let count = 0;
  let past = "";
  [...input].forEach((char) => {
    if (char === "(") {
      stack.push(char);
    } else {
      if (past === "(") {
        stack.pop();
        count += stack.length;
      } else {
        stack.pop();
        count++;
      }
    }
    past = char;
  });

 console.log(count);
}

sol(input);
