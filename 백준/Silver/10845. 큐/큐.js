
const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
input.shift();

function sol(input) {
  const queue = [];
  let tail = 0;
  let head = 0;
  const pop = () => {
    let res;
    if (head < tail) {
      res = queue[head++];
    } else {
      res = -1;
    }
    return res;
  };
  const push = (x) => {
    queue[tail++] = x;
  };
  const size = () => {
    return tail - head;
  };
  const empty = () => {
    return tail === head ? 1 : 0;
  };
  const front = () => {
    return queue[head] || -1;
  };
  const back = () => {
    let res;
    if (head < tail) {
      res = queue[tail - 1];
    } else {
      res = -1;
    }
    return res;
  };

  let res = [];
  input.forEach((el) => {
    const [method, arg] = el.split(" ");

    switch (method) {
      case "push":
        push(arg);
        break;
      case "pop":
        res.push(pop());
        break;

      case "size":
        res.push(size());
        break;

      case "empty":
        res.push(empty());
        break;

      case "front":
        res.push(front());
        break;

      case "back":
        res.push(back());
        break;
    }
  });

  console.log(res.join("\n"));
}

sol(input);
