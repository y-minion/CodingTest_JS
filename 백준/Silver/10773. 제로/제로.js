const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

input.splice(0, 1);

class Stack {
  constructor() {
    this.pos = 1;
    this.arr = [0];
  }
  push(num) {
    this.arr[this.pos] = num;
    this.pos++;
  }
  pop() {
    this.pos--;
  }

  printSum() {
    const res = this.arr.reduce((acc, num, i) => {
      if (i >= this.pos) return acc;
      return acc + num;
    }, 0);
    console.log(res);
  }
}

function sol(input) {
  const stack = new Stack();
  input.forEach((el) => {
    const num = Number(el);
    if (num === 0) {
      stack.pop();
    } else {
      stack.push(num);
    }
  });
  stack.printSum();
}

sol(input);
