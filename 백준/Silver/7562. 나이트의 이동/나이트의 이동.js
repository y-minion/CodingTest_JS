const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const testCaseNumber = Number(input.shift());
const testArr = [];

const dx = [-2, -1, 1, 2, 2, 1, -1, -2];
const dy = [1, 2, 2, 1, -1, -2, -2, -1];

for (let i = 0; i < testCaseNumber; i++) {
  testArr.push(input.slice(i * 3, i * 3 + 3));
}

function sol() {
  const resArr = testArr.map((test) => {
    const queue = [];
    let head = 0;
    let tail = 0;
    const [I, curPos, goalPos] = test.map((str, i) => {
      if (i === 0) return Number(str);
      return str.split(" ").map((el) => Number(el));
    });
    const [curRow, curCol] = curPos;
    const [goalRow, goalCol] = goalPos;

    //보드배열은 따로 필요없을듯..?
    const vis = Array.from({ length: I }, () =>
      Array.from({ length: I }, () => -1)
    );

    queue[tail++] = curPos;
    vis[curRow][curCol] = 0;

    while (tail - head !== 0) {
      const curPos = queue[head++]; //pop
      const [curRow, curCol] = curPos;
      const curMove = vis[curRow][curCol];

      if (curRow === goalRow && curCol === goalCol) return curMove; //일치하면 현재 이동 위치 반환

      for (let i = 0; i < 8; i++) {
        const movedRow = curRow + dx[i];
        const movedCol = curCol + dy[i];

        if (movedRow < 0 || I <= movedRow || movedCol < 0 || I <= movedCol)
          continue;
        if (vis[movedRow][movedCol] !== -1) continue;

        queue[tail++] = [movedRow, movedCol];
        vis[movedRow][movedCol] = curMove + 1;
      }
    }
  });

  return resArr.join("\n");
}

console.log(sol());
