const fs = require("fs");

let [top, down] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, _] = top.split(" ").map((el) => Number(el));
const target = down.split(" ").map((el) => Number(el));

const mx = 1000000;
const queue = [];

function sol(n, target) {
  let head = mx;
  let tail = head + n;
  let count = 0;

  function initQ() {
    for (let i = 0; i < n; i++) {
      let num = i + 1;
      queue[head + i] = num;
    }
  }

  initQ(); //큐 초기화

  const pullOut = () => {
    head++;
  };
  const left = () => {
    queue[tail++] = queue[head++];
    count++;
  };
  const right = () => {
    queue[--head] = queue[--tail];
    count++;
  };

  target.forEach((num) => {
    const size = tail - head;
    const mid = head + Math.floor(size / 2);
    const targetIdx = queue.indexOf(num, head);

    if (targetIdx <= mid) {
      const gap = targetIdx - head;
      for (let i = 0; i < gap; i++) {
        left();
      }
    } else {
      const gap = tail - targetIdx;
      for (let i = 0; i < gap; i++) {
        right();
      }
    }
    pullOut();
  });

  console.log(count);
}

sol(N, target);