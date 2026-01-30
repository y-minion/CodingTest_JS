/**
 * N의 범위는 1000보다 작다.
그냥 Input을 한번 순환하며 map에 기록을 하고, 루프가 끝나면 map을 순환하며 집계하면 될듯?

집계하는 방법이 관건이다.
map에서 가장 많이 팔린 책은 어떻게 알 것인가?

집계 데이터가
{
top :12,
kim : 2,
pop : 12
}
이렇다면 어떻게 반환할까?

[제일 간단한 방법_직관적으로 떠오른 방법]

- 집계 데이터를 모두 순회하며 가장 값이 큰 숫자를 찾는다.
- 그리고 다시 집계 데이터를 순회하며 최댓값에 해당하는 key를 배열에 넣는다.
- 그리고 루프가 끝나면 정렬한다.

근데 이렇게 해도 N + N + N => 3000이라 시간 오바는 발생하지 않는다

 */

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

  //map인 데이터를 배열로 바꾸고 오름차순 정렬한뒤 제일 앞에 있는 책을 반환하면 된다.
  const arr = [...map];
  arr.sort((a, b) => {
    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    else {
      return a[0].localeCompare(b[0]);
    }
  });

  return arr[0][0];
}
const res = sol();
console.log(res);
