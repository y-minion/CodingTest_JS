const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const testNum = Number(input.shift());

const testArr = [];

for (let i = 0; i < testNum; i++) {
  let [num, students] = input.splice(0, 2);
  num = Number(num);
  students = students.split(" ").map((el) => Number(el));
  students.unshift(0);
  testArr.push([num, students]);
}

const res = testArr.map(([num, students]) => {
  const unvisited = 0;
  const cycledIn = -1; //기존에 1로 표시 했었는데 이러면 학생 번호 1과 출동발생!!
  const state = Array.from({ length: num + 1 }, () => unvisited);

  function run(x) {
    let cur = x;
    state[cur] = x;
    while (true) {
      cur = students[cur]; //시점 이동
      if (state[cur] === x) {
        while (state[cur] !== cycledIn) {
          state[cur] = cycledIn;
          cur = students[cur];
        }
        return;
      } else if (state[cur] !== unvisited) return;
      state[cur] = x; // 이 부분의 위치가 헷갈리네..?
    }
  }

  for (let i = 1; i < num + 1; i++) {
    const cur = i;
    if (state[cur] !== unvisited) continue;
    run(cur);
  }

  let count = 0;
  for (let i = 1; i < num + 1; i++) {
    const cur = i;
    if (state[cur] === cycledIn) count++;
  }

  return num - count;
});

console.log(res.join("\n"));
