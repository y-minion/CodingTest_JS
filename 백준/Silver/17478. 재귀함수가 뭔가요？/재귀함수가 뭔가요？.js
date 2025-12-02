const fs = require("fs");

const N = Number(fs.readFileSync("/dev/stdin").toString());

const flag = `____`;

const resArr = ["어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다."];

function sol(depth) {
  //depth만큼 flag생성
  let bonus = ``;
  for (let i = 0; i < depth; i++) {
    bonus += flag;
  }

  //base condition
  if (depth === N) {
    const strArr = [
      bonus + `"재귀함수가 뭔가요?"`,
      bonus + `"재귀함수는 자기 자신을 호출하는 함수라네"`,
      bonus + `라고 답변하였지.`,
    ];
    return resArr.push(...strArr);
  }
  const strArr = [
    bonus + `"재귀함수가 뭔가요?"`,
    bonus +
      `"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.`,
    bonus +
      `마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.`,
    bonus +
      `그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어."`,
  ];
  resArr.push(...strArr);

  sol(depth + 1);

  const finalAns = bonus + `라고 답변하였지.`;
  resArr.push(finalAns);
}

sol(0);
console.log(resArr.join("\n"));
