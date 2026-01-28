const fs = require("fs");

let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => Number(el));

const N = input.shift();
const tmp = [];
function merge(start, end) {
  const mid = Math.floor((start + end) / 2);
  let rIdx = mid;
  let lIdx = start;
  for (let i = start; i < end; i++) {
    if (lIdx === mid) tmp[i] = input[rIdx++];
    else if (rIdx === end) tmp[i] = input[lIdx++];
    else if (input[rIdx] >= input[lIdx]) tmp[i] = input[lIdx++];
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
console.log(input.join("\n"));
