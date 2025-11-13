const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim();

function sol(input) {
  const resArr = Array.from({ length: 9 }, () => 0);
  [...input].forEach((char) => {
    let num = Number(char);
    if (num === 9) num = 6; //9를 6을 전환

    resArr[num] += 1;
  });
  resArr[6] = Math.ceil(resArr[6] / 2);
  const setCount = Math.max(...resArr);
  console.log(setCount);
}

sol(input);
