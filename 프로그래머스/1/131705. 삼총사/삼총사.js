function solution(number) {
  let count = 0;
  number.forEach((n1, idx1) => {
    if (idx1 > number.length - 3) return;
    number.forEach((n2, idx2) => {
      if (idx2 < idx1 || idx2 === idx1 || idx2 > number.length - 2) return;
      number.forEach((n3, idx3) => {
        if (idx3 === idx2 || idx3 < idx2 || idx3 < 2) return;
        const sum = n1 + n2 + n3;
        if (sum === 0) count += 1;
      });
    });
  });
  return count;
}