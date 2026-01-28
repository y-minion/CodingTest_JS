const fs = require("fs");

let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => Number(el));

const N = input.shift();

const tmp = [];
function merge(s, e) {
  const mid = Math.floor((s + e) / 2);
  let l = s;
  let r = mid;

  for (let i = s; i < e; i++) {
    if (l === mid) tmp[i] = input[r++];
    else if (r === e) tmp[i] = input[l++];
    else if (input[l] <= input[r]) tmp[i] = input[l++];
    else tmp[i] = input[r++];
  }

  for (let i = s; i < e; i++) {
    input[i] = tmp[i];
  }
}

function mergeSort(s, e) {
  if (e - s <= 1) return;

  const mid = Math.floor((s + e) / 2);

  mergeSort(s, mid);
  mergeSort(mid, e);

  merge(s, e);
}

mergeSort(0, N);
console.log(input.join("\n"));
