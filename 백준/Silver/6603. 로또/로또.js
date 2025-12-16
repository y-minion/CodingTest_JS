const fs = require("fs");

let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((str) => str.split(" ").map((el) => Number(el)));

input.pop();

function func(input) {
  const res = input.map((test) => {
    const state = [];
    const resArr = [];
    const k = test.slice(0, 1);
    const S = test.slice(1);

    function sol(pos, startIdx) {
      if (pos === 6) {
        resArr.push(state.join(" "));
        return;
      }
      for (let i = startIdx; i < k; i++) {
        state[pos] = S[i];
        sol(pos + 1, i + 1);
      }
    }

    sol(0, 0);
    const res = resArr.join("\n");

    return res;
  });

  console.log(res.join("\n\n"));
}

func(input);
