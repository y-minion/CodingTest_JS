const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input.shift());

input = input.map((str) =>
  str.split(" ").map((el, idx) => {
    if (idx === 0) return Number(el);
    return el;
  }),
);

const tmp = [];
function merge(start, end) {
  const mid = Math.floor((start + end) / 2);
  let lIdx = start;
  let rIdx = mid;
  for (let i = start; i < end; i++) {
    if (lIdx === mid) tmp[i] = input[rIdx++];
    else if (rIdx === end) tmp[i] = input[lIdx++];
    else if (input[lIdx][0] <= input[rIdx][0]) tmp[i] = input[lIdx++];
    else tmp[i] = input[rIdx++];
  }

  for (let i = start; i < end; i++) {
    input[i] = tmp[i];
  }
}

function mergeSort(start, end) {
  if (end - start <= 1) return;
  const mid = Math.floor((start + end) / 2);

  mergeSort(start, mid);
  mergeSort(mid, end);

  merge(start, end);
}

mergeSort(0, N);
console.log(input.map((el) => el.join(" ")).join("\n"));
