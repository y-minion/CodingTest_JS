
const fs = require("fs");

let input = fs.readFileSync("/dev/stdin").toString().trim();
input = Number(input);

function sol(input) {
  const card = Array.from({ length: input }, (_, i) => i + 1);
  let top = 0;
  let bottom = card.length;
  function deleteCard() {
    top++;
  }
  function moveCard() {
    card[bottom++] = card[top++];
  }

  while (1 < bottom - top) {
    deleteCard();
    moveCard();
  }
  const finalCard = card[top];
  console.log(finalCard);
}

sol(input);
