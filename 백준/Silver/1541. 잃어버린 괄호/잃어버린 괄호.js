const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("");
let isMinus = false;
input.push("+");
function sol() {
  let res = 0;
  let num = "";
  input.forEach((char) => {
    if (char !== "-" && char !== "+") {
      num += char;
    } else {
      //이전 숫자
      const number = Number(num);
      num = "";
      if (!isMinus) res += number;
      else {
        res -= number;
      }

      if (char === "-") {
        isMinus = true;
      }
    }
  });

  return res;
}

const res = sol();
console.log(res);
