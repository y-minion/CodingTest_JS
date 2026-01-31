/**
 * 카멜케이스 vs 케밥케이스
변수명 변환기 만들자.

입력: 변수명

언어(java|c++)에 따라 변환되는 언어가 달라진다.
이때 이외의 언어가 입력받으면 바로 에러 발생

우선 input을 파싱해야한다.
먼저 해당 문자열에 언더바(\_) 의 유무를 따진다.
-> 1. 이때 언더바가 있으면 언더바 기준으로 char을 분리하고,
-> 2. 언더바가 없으면 대문자를 기준으로 파싱한다.

case 1.
.split('\_')로 문자열을 배열로 분리한다.
분리된 배열을 순회하며 각 요소의 첫번째 단어를 찾아서 대문자로 변경한다.

- e.replace(e[0],e[0].UpperCase())
  > > 모든 루프가 끝나면 input을 join('')한다.

case 2.
input문자열을 .split('')으로 모두 char로 쪼갠다.
그리고 순회하며 대문자를 발견하면 소문자로 바꾼다.
그리고 해당 요소를 '\_소문자' 로 변경한다.
그리고 종료.



문자열에 특정 문자 갖고있는지 방법 모르겠음
 */

const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim();
const err = "Error!";
function sol() {
  const isUnder = input.includes("_");
  const isUpper = /[A-Z]/.test(input);
  if (isUnder && isUpper) return err;

  if (/__/.test(input) || input[0] === "_" || input[input.length - 1] === "_")
    return err;

  if (input[0] >= "A" && input[0] <= "Z") return err;
  if (isUnder) {
    input = input.split("_");
    const res = input.map((str, i) => {
      if (i === 0) return str; //엣지케이스
      let arr = str.split("");
      arr[0] = arr[0].toUpperCase();
      return arr.join("");
      // str.replace(str[0], str[0].toUpperCase());
    });
    return res.join("");
  } else {
    input = input.split("");
    const res = input.map((char) => {
      if (char === char.toUpperCase()) return `_${char.toLowerCase()}`;
      return char;
    });

    return res.join("");
  }
}

const res = sol();
console.log(res);
