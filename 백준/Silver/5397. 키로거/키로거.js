const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
input = input.splice(1);

function sol(test) {
  const leftArr = [];
  const rightArr = [];

  function add(char) {
    leftArr.push(char);
  }

  function del() {
    if (leftArr.length === 0) return;
    leftArr.pop();
  }

  function moveL() {
    if (leftArr.length === 0) return;
    rightArr.push(leftArr.pop());
  }

  function moveR() {
    if (rightArr.length === 0) return;
    leftArr.push(rightArr.pop());
  }

  function assemble() {
    let res = "";
    const left = leftArr.length === 0 ? "" : leftArr.join("");
    const right = rightArr.length === 0 ? "" : rightArr.reverse().join("");
    res = left + right;
    return res;
  }

  [...test].forEach((el) => {
    if (el === "-") {
      del();
    } else if (el === "<") {
      moveL();
    } else if (el === ">") {
      moveR();
    } else {
      add(el);
    }
  });

  return assemble();
}

let res = input.map((el) => sol(el));

console.log(res.join("\n"));
