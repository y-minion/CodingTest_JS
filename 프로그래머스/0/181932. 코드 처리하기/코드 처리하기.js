function solution(code) {
  let mode = 0;

  const result = [...code].reduce((ret, char, idx) => {
    if (!mode) {
      if (char !== "1" && idx % 2 === 0) {
        ret += char;
      }
      if (char === "1") {
        mode = 1;
      }
    } else {
      if (char !== "1" && idx % 2 === 1) {
        ret += char;
      }
      if (char === "1") {
        mode = 0;
      }
    }
    return ret;
  }, "");
  return result.trim().length === 0 ? "EMPTY" : result;
}