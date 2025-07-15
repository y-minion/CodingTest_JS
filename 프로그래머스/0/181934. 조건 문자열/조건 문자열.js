function solution(ineq, eq, n, m) {
  const ineqMap = {
    ">": (n, m) => n > m,
    "<": (n, m) => n < m,
  };
  const eqMap = {
    "=": (n, m) => n === m,
    "!": () => 0,
  };
  return ineqMap[String(ineq)](n, m) || eqMap[String(eq)](n, m) ? 1 : 0;
}

solution(">", "!", 41, 78);
