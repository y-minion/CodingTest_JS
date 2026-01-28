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
  let lidx = start;
  let ridx = mid;
  for (let i = start; i < end; i++) {
    if (ridx === end) {
      tmp[i] = input[lidx++];
    } else if (lidx === mid) {
      tmp[i] = input[ridx++];
    } else if (input[lidx] <= input[ridx]) tmp[i] = input[lidx++];
    else tmp[i] = input[ridx++];
  }
  for (let j = start; j < end; j++) {
    input[j] = tmp[j];
  }
}

function mergeSort(start, end) {
  const mid = Math.floor((start + end) / 2);
  if (end - start <= 1) return;

  mergeSort(start, mid);
  mergeSort(mid, end);

  merge(start, end);
}

mergeSort(0, N);
console.log(input.join("\n"));
