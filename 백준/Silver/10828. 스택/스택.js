
const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

input.splice(0, 1);

class Stack {
  constructor() {
    this.arr = [];
    this.pos = 0;
  }

  push(num) {
    this.arr[this.pos] = num;
    this.pos++;
    return "";
  }

  pop() {
    if (this.pos === 0) return -1;
    this.pos--;
    return this.arr[this.pos];
  }

  size() {
    return this.pos;
  }

  empty() {
    return this.pos === 0 ? 1 : 0;
  }

  top() {
    return this.pos === 0 ? -1 : this.arr[this.pos - 1];
  }
}

function sol(input) {
  const stack = new Stack();
  let res = input
    .map((el) => {
      const [method, arg] = el.split(" ");
      if (arg) {
        const num = Number(arg);
        return stack[method](num);
      } else {
        return stack[method]();
      }
    })
    .filter((el) => el !== "") //el을 truthy,falthy로 판단하면 안되고 ''(공백)을 대상으로 직접 비교해야한다. -> 0은 거짓 처리되서 원치않는 결과 반환
    .join("\n");

  console.log(res);
}

sol(input);
