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
    .filter((el) => el !== "")
    .join("\n");

  console.log(res);
}

sol(input);
