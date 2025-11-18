
const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
input.shift();

const queue = [];
const res = [];
let head = 0;
let tail = 0;

const map = {
  push(x) {
    queue[tail++] = x;
  },
  pop() {
    if (tail === head) return -1;
    return queue[head++];
  },
  size() {
    return tail - head;
  },
  empty() {
    return tail === head ? 1 : 0;
  },
  front() {
    if (head === tail) return -1;
    return queue[head];
  },
  back() {
    if (tail === head) return -1;
    return queue[tail - 1];
  },
};

function sol(input) {
  input.forEach((el) => {
    const [method, arg] = el.split(" ");
    if (method === "push") {
      map[method](Number(arg));
    } else {
      res.push(map[method]());
    }
  });
  console.log(res.join("\n"));
}

sol(input);
