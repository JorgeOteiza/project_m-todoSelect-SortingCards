/* eslint-disable no-undef */
let steps = [];

function generateCards(numCards) {
  const suits = ["\u2660", "\u2663", "\u2665", "\u2666"]; // Unicode for spade, club, heart, and diamond
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];
  const cardsContainer = document.getElementById("cardsContainer");

  cardsContainer.innerHTML = "";

  for (let i = 0; i < numCards; i++) {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];

    const card = document.createElement("div");
    card.classList.add("card");

    const topLeft = document.createElement("div");
    topLeft.classList.add("corner-symbol", "top-left");
    topLeft.textContent = suit;

    const bottomRight = document.createElement("div");
    bottomRight.classList.add("corner-symbol", "bottom-right");
    bottomRight.textContent = suit;

    const centeredText = document.createElement("div");
    centeredText.classList.add("centered-text");
    centeredText.textContent = value;

    if (suit === "\u2665" || suit === "\u2666") {
      topLeft.style.color = "red";
      bottomRight.style.color = "red";
    }

    card.appendChild(topLeft);
    card.appendChild(bottomRight);
    card.appendChild(centeredText);

    cardsContainer.appendChild(card);
  }
}

function registerStep(cards) {
  // Guardar el estado actual de las cartas en el array de pasos
  steps.push(cards.map(card => card.outerHTML));
}

function selectionSort(arr) {
  const len = arr.length;

  const mapper = {
    A: 1,
    J: 11,
    Q: 12,
    K: 13
  };

  const mapCardsLetters = value => {
    return parseInt(mapper[value] || value);
  };

  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < len; j++) {
      const value1 = mapCardsLetters(
        arr[j].querySelector(".centered-text").textContent
      );
      const value2 = mapCardsLetters(
        arr[minIndex].querySelector(".centered-text").textContent
      );

      if (value1 < value2) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      // Intercambio de las cartas en el arreglo
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;

      // Visualización del cambio en el contenedor de registros
      const logRow = document.createElement("div");
      logRow.classList.add("log-row");

      // Clonar las cartas y agregarlas al registro
      const clonedCard1 = arr[i].cloneNode(true);
      const clonedCard2 = arr[minIndex].cloneNode(true);

      logRow.appendChild(clonedCard1);
      logRow.appendChild(clonedCard2);

      const logContainer = document.getElementById("logContainer");
      logContainer.appendChild(logRow);
    }
  }

  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";
  arr.forEach(card => {
    cardsContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const drawButton = document.getElementById("drawButton");
  const sortButton = document.getElementById("sortButton");

  drawButton.addEventListener("click", () => {
    const numCards = document.getElementById("numCards").value;
    generateCards(numCards);
    steps = [];
  });

  sortButton.addEventListener("click", () => {
    const cards = document.querySelectorAll(".card");
    selectionSort(Array.from(cards));
    // Mostrar los registros en diferentes columnas en la interfaz de usuario
    const columnsContainer = document.getElementById("columnsContainer");
    if (columnsContainer) {
      columnsContainer.innerHTML = ""; // Limpiar las columnas existentes
      steps.forEach((step, index) => {
        const column = document.createElement("div");
        column.classList.add("column");
        column.innerHTML = `<h3>Step ${index + 1}</h3>${step.join("")}`;
        columnsContainer.appendChild(column);
      });
    } else {
      // console.error("id 'columnsContainer' not found.");
    }
  });
});
