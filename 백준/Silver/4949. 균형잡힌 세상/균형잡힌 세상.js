
const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split(".");
input.splice(-2, 2);

function sol(input) {
  //각 문자열 순환
  const res = input.map((str) => {
    const stack = [];

    //하나의 문장을 순환
    for (const char of [...str]) {
      if (char === "(" || char === "[") {
        stack.push(char);
      } else if (char === ")" || char === "]") {
        if (stack.length === 0) return "no"; //바로 map루프 종료
        const top = stack.pop();
        if ((top === "[" && char === "]") || (top === "(" && char === ")")) {
          continue;
        } else {
          return "no";
        }
      }
    }

    return stack.length === 0 ? "yes" : "no";
  });

  console.log(res.join("\n"));
}

sol(input);
