const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split(/\r?\n/);
input.shift();
input = input.map((e) => e.split(" ").map((chr) => Number(chr)));

function sol() {
  const res = [];

  input.forEach((c) => {
    const line = [];
    const t = c.shift();
    let cnt = 0;

    //학생 무더기
    c.forEach((s) => {
      let tarIdx = null;
      for (let i = 0; i < line.length; i++) {
        //비교될 학생
        const stu = line[i];
        if (stu > s) {
          tarIdx = i;
          break;
        }
      }
      if (tarIdx !== null) {
        cnt += line.length - tarIdx;
        line.splice(tarIdx, 0, s);
      } else {
        line.push(s);
      }
    });

    res.push(`${t} ${cnt}`);
  });

  return res.join("\n");
}

const res = sol();
console.log(res);
