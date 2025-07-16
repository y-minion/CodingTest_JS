function solution(a, b, n) {
  let getColaEA = 0; // 상빈이가 받을 콜라의 병_EA

  function colaLoop(a, b, n) {
    if (n < a) return;
    let currnetColaEA = 0;
    currnetColaEA = b * parseInt(n / a);
    n -= a * parseInt(n / a); //콜라병 반납
    n += currnetColaEA; // 콜라병 받음.
    getColaEA += currnetColaEA;
    colaLoop(a, b, n); //재귀
  }
  colaLoop(a, b, n);
  return getColaEA;
}