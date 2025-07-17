function solution(n) {
  let count;
  for (let i = 0; i < 10; i++) {
    const result = factorial(i + 1);
    if (result > n) {
      count = i;
      break;
    }
  }
  return count;
}

function factorial(n) {
  if (n === 1) return n;
  return n * factorial(n - 1);
}
