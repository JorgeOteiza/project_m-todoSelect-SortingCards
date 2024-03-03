// app.js
import "./style.css";

const suitsSymbols = {
  spade: "♠",
  club: "♣",
  heart: "♥",
  diamond: "♦"
};

const mapper = {
  A: 1,
  J: 11,
  Q: 12,
  K: 13
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCard(randomSuit, randomCardNumber) {
  const card = document.createElement("div");
  card.className = "card";

  const topSymbol = document.createElement("div");
  topSymbol.className = "corner-symbol top-left";
  topSymbol.textContent = suitsSymbols[randomSuit];

  const bottomSymbol = document.createElement("div");
  bottomSymbol.className = "corner-symbol bottom-right";
  bottomSymbol.textContent = suitsSymbols[randomSuit];

  const centeredText = document.createElement("div");
  centeredText.className = "centered-text";
  const cardNumber =
    randomCardNumber < 9
      ? randomCardNumber + 2
      : ["J", "Q", "K", "A"][randomCardNumber - 9];
  centeredText.textContent = cardNumber;

  if (randomSuit === "heart" || randomSuit === "diamond") {
    topSymbol.style.color = "red";
    bottomSymbol.style.color = "red";
  }

  card.appendChild(topSymbol);
  card.appendChild(centeredText);
  card.appendChild(bottomSymbol);

  return card.outerHTML;
}

function generateRandomCards(numCards) {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";

  for (let i = 0; i < numCards; i++) {
    const randomSuitIndex = getRandomNumber(0, 3);
    const randomCardNumber = getRandomNumber(0, 13);
    const randomSuit = Object.keys(suitsSymbols)[randomSuitIndex];

    cardsContainer.insertAdjacentHTML(
      "beforeend",
      generateCard(randomSuit, randomCardNumber)
    );
  }
}

function selectionSort() {
  const cardsContainer = document.getElementById("cardsContainer");
  const cardsArray = Array.from(cardsContainer.children);

  for (let i = 0; i < cardsArray.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < cardsArray.length; j++) {
      const currentCard = cardsArray[j];
      const minCard = cardsArray[minIndex];

      const currentCardValueText = currentCard.querySelector(".centered-text")
        .textContent;
      const minCardValueText = minCard.querySelector(".centered-text")
        .textContent;

      const currentCardValue =
        mapper[currentCardValueText] || parseInt(currentCardValueText);
      const minCardValue =
        mapper[minCardValueText] || parseInt(minCardValueText);

      if (currentCardValue < minCardValue) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const temp = cardsArray[i];
      cardsArray[i] = cardsArray[minIndex];
      cardsArray[minIndex] = temp;
      cardsContainer.insertBefore(cardsArray[minIndex], cardsArray[i]);
    }
  }
}

document.getElementById("drawButton").addEventListener("click", () => {
  const numCards = document.getElementById("numCards").value;
  generateRandomCards(numCards);
});

document.getElementById("sortButton").addEventListener("click", () => {
  selectionSort();
});
