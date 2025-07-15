function solution(n) {
  let result = 0;
  if (n % 2 === 0) {
    for (let i = 0; 2 * i <= n; i++) {
      result += (2*i) ** 2;
    }
  } else {
    for (let i = 0; 2 * i + 1 <= n; i++) {
      result += 2 * i + 1;
    }
  }
  return result;
}

solution(7);
