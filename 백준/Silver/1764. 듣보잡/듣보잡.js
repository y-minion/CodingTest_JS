/**
 * 명단에서 듣보잡을 찾자.

이름이 중복(2번)으로 나오는 순간 듣보잡이 된다.

매 루프마다 항상 Map에 사람의 등록를 확인한다.
이때 이미 등록이 되어 있으면 새로운 배열에 추가한다.
그리고 등록한다.

마지막에 배열을 정렬한다.

 */

const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
input.shift();

function sol() {
  const set = new Set();
  const res = [];
  input.forEach((e) => {
    if (set.has(e)) {
      res.push(e);
      return;
    }
    set.add(e);
  });

  res.sort((a, b) => a.localeCompare(b));
  res.unshift(res.length);
  return res.join("\n");
}

const res = sol();
console.log(res);
