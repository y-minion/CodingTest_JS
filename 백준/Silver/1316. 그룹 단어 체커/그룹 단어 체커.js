const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
input.shift();

function sol() {
  let cnt = 0;

  input.forEach((str) => {
    //엣지케이스
    if (str.length === 1) {
      cnt++;
      return;
    }

    const map = new Map();

    let isGroup = 1;

    for (let i = 1; i < str.length; i++) {
      const e = str[i];
      const prev = str[i - 1];

      if (e !== prev) {
        map.set(prev, 0);
      }
      if (map.has(e)) {
        isGroup = 0;
        break;
      }
    }
    if (isGroup) cnt++;
  });

  return cnt;
}

console.log(sol());
