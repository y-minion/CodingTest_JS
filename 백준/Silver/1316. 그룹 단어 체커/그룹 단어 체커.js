/**
 * 그룹단어 찾기.
 * 그룹단어란? -> 앞에 나왔던 단어가 연속해서 계속 등장해도 되지만 연속이 끊기고 뒤에 다시 등장하면 그룹단어는 탈락한다.

- 어떻게 연속이 끊기는걸 판단할까?
  현재 노드의 이전 노드와 비교한다. 이때 다르면 연속이 끊긴것. 이때는 이전 노드를 품절 목록에 등록한다.

- 그러면 그룹단어 검사는 어떻게 할까?
  매 루프의 현재 요소가 품절 목록에 있는지 확인한다.
  이때 검사에 탈락하면 즉시 현재 단어 노드 반복은 종료한다.

- 엣지케이스. -> 단어가 1개인 경우는 무조건 통과한다. 검사도 하지 않는다.
 */

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

    const map = new Set();

    let isGroup = 1;

    for (let i = 1; i < str.length; i++) {
      const e = str[i];
      const prev = str[i - 1];

      if (e !== prev) {
        map.add(prev);
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
