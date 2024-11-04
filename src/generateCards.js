export function generateCards(numCards) {
  const suitsSymbols = ["♠", "♣", "♥", "♦"];
  const cards = [];

  for (let i = 0; i < numCards; i++) {
    const randomSuit =
      suitsSymbols[Math.floor(Math.random() * suitsSymbols.length)];
    const randomCardNumber = Math.floor(Math.random() * 13) + 1;
    const cardElement = generateCard(randomSuit, randomCardNumber);
    cards.push(cardElement);
  }

  return cards;
}

function generateCard(suit, cardNumber) {
  const card = document.createElement("div");
  card.className = "card";

  // Crear los elementos de los símbolos en las esquinas
  const topSymbol = document.createElement("div");
  topSymbol.className = `corner-symbol top-left ${getSuitClass(suit)}`;
  topSymbol.textContent = suit;

  const bottomSymbol = document.createElement("div");
  bottomSymbol.className = `corner-symbol bottom-right ${getSuitClass(suit)}`;
  bottomSymbol.textContent = suit;

  // Crear el texto centrado para el número o valor de la carta
  const centeredText = document.createElement("div");
  centeredText.className = "centered-text";
  centeredText.textContent = getCardValue(cardNumber);

  // Agregar los símbolos y texto a la carta
  card.appendChild(topSymbol);
  card.appendChild(centeredText);
  card.appendChild(bottomSymbol);

  return card;
}

function getSuitClass(suit) {
  // Asignar la clase en función del símbolo
  return suit === "♥" || suit === "♦" ? "red-suit" : "black-suit";
}

function getCardValue(cardNumber) {
  // Asignar el valor textual correspondiente al número
  return cardNumber === 1
    ? "A"
    : cardNumber <= 10
    ? cardNumber.toString()
    : ["J", "Q", "K"][cardNumber - 11];
}

export function generateCardRow(cards) {
  const row = document.createElement("div");
  row.className = "card-row";
  cards.forEach(card => row.appendChild(card));
  return row;
}
