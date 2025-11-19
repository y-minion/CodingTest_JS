
const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let testCase = input.splice(0, 1)[0];

// let testCase = 2;
// testCaseArr = [
//   ["RDD", 4, [1, 2, 3, 4]],
//   ["DD", 1, [42]],
// ];
let testCaseArr = []; //테스트 케이스 배열
for (let i = 0; i < Number(testCase); i++) {
  const test = input.splice(0, 3);
  testCaseArr.push(test);
}

function sol(testArr) {
  const res = testArr.map(([method, n, arr]) => {
    const parsedArr = JSON.parse(arr);
    const deque = [0, ...parsedArr];
    let head = 1;
    let tail = head + Number(n);

    const map = {
      R() {
        let copyH = head;
        let copyT = tail;
        if (tail < head) {
          tail = copyH;
          head = copyT;
          tail++;
          head++;
        } else {
          tail = copyH;
          head = copyT;
          tail--;
          head--;
        }
      },
      D() {
        if (head === tail) return "error";
        if (head < tail) {
          head++;
        } else {
          head--;
        }
      },

      print() {
        let res;
        if (head < tail) {
          res = deque.splice(head, tail - head);
        } else {
          res = deque.splice(tail + 1, head - tail);
          res.reverse();
        }
        return `[${res.join(",")}]`;
      },
    };

    for (const n of [...method]) {
      let res = map[n]();
      if (res) return res;
    }
    return map.print();
  });

  console.log(res.join("\n"));
}

sol(testCaseArr);
