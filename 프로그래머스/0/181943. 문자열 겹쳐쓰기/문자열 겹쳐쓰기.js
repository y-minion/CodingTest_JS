function solution(my_string, overwrite_string, s) {
  const myString = [...my_string];
  const overwriteString = [...overwrite_string];
  myString.splice(s, overwriteString.length, ...overwriteString);
  return myString.join('')
}