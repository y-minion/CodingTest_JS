
const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function sol(input) {
  const MX = Number(input.splice(0, 1));
  const de = [];
  const res = [];
  let fr = MX;
  let ba = MX;

  const map = {
    push_front(x) {
      de[--fr] = x;
    },
    push_back(x) {
      de[ba++] = x;
    },
    pop_front() {
      if (fr === ba) return -1;
      return de[fr++];
    },
    pop_back() {
      if (fr === ba) return -1;
      return de[--ba];
    },
    size() {
      return ba - fr;
    },
    empty() {
      return ba === fr ? 1 : 0;
    },
    front() {
      return ba === fr ? -1 : de[fr];
    },
    back() {
      return fr === ba ? -1 : de[ba - 1];
    },
  };
  input.forEach((el) => {
    const [method, arg] = el.split(" ");
    if (arg) {
      map[method](Number(arg));
    } else {
      const a = map[method]();
      res.push(a);
    }
  });

  console.log(res.join("\n"));
}

sol(input);
