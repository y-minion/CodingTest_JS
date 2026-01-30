const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
input.shift();

const map = new Map();
let mx = 0;
const mxBooks = [];

function sol() {
  input.forEach((book) => {
    const isThere = map.has(book);
    if (isThere) {
      const cur = map.get(book);
      map.set(book, cur + 1);
    } else {
      map.set(book, 1);
    }
  });

  //최댓값 찾기
  for (const val of map.values()) {
    if (mx < val) mx = val;
  }

  //최다 판매 책 넣기
  for (const [k, v] of map) {
    if (v !== mx) continue;
    mxBooks.push(k);
  }

  //사전순 정렬
  mxBooks.sort((a, b) => a.localeCompare(b));
  return mxBooks[0];
}
const res = sol();
console.log(res);
