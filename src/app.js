/* eslint-disable no-console */

import { generateCards, generateCardRow } from "./generateCards.js";
import { selectionSort } from "./selectionSort.js";

const drawButton = document.getElementById("draw");
const sortButton = document.getElementById("sort");
let isSorting = false;

drawButton.addEventListener("click", draw);
sortButton.addEventListener("click", sortAndAnimate);

function draw() {
  const selectionLogContainer = document.getElementById("selectionLog");
  selectionLogContainer.innerHTML = "";
  const numCardsInput = document.getElementById("numCards");
  const numCards = parseInt(numCardsInput.value);
  const cardsContainer = document.getElementById("cardsContainer");

  if (!cardsContainer) {
    console.error("Elemento cardsContainer no encontrado en el DOM.");
    return;
  }

  const cards = generateCards(numCards);
  displayCards(cards);
}

function sortAndAnimate() {
  if (isSorting) return;
  isSorting = true;

  const selectionLogContainer = document.getElementById("selectionLog");
  selectionLogContainer.innerHTML = ""; // Limpiar el contenedor de registros

  const title = document.createElement("h3");
  title.className = "selection-log-title";
  title.textContent = "Selection Log";
  selectionLogContainer.appendChild(title);

  const cardsContainer = document.getElementById("cardsContainer");
  const allCards = Array.from(cardsContainer.querySelectorAll(".card"));
  const cardTexts = allCards.map(
    card => card.querySelector(".centered-text").textContent
  );

  const sortedCardLogs = selectionSort(cardTexts);

  sortedCardLogs.forEach((sortedCardTexts, index) => {
    setTimeout(() => {
      const newCards = sortedCardTexts
        .map(text => {
          const originalCard = allCards.find(
            card => card.querySelector(".centered-text").textContent === text
          );
          return originalCard ? originalCard.cloneNode(true) : null;
        })
        .filter(card => card !== null);

      if (newCards.length > 0) {
        const newCardRow = generateCardRow(newCards);
        if (!isDuplicateLog(selectionLogContainer, newCardRow)) {
          selectionLogContainer.appendChild(newCardRow.cloneNode(true));
        }
      }

      if (index === sortedCardLogs.length - 1) {
        console.log("¡Ordenamiento completado!");
        isSorting = false;
      }
    }, 300 * index);
  });
}

function displayCards(cards) {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";
  const numColumns = Math.ceil(cards.length / 6);
  const cardsPerRow = Math.ceil(cards.length / numColumns);

  for (let i = 0; i < numColumns; i++) {
    const startIdx = i * cardsPerRow;
    const endIdx = Math.min(startIdx + cardsPerRow, cards.length);
    const columnCards = cards.slice(startIdx, endIdx);
    const cardRow = generateCardRow(columnCards);
    cardsContainer.appendChild(cardRow);
  }
}

function isDuplicateLog(logContainer, newLogRow) {
  const newLogContent = Array.from(newLogRow.children)
    .map(card => card.querySelector(".centered-text").textContent)
    .join(",");

  return Array.from(logContainer.children).some(row => {
    const existingLogContent = Array.from(row.children)
      .map(card => card.querySelector(".centered-text").textContent)
      .join(",");
    return existingLogContent === newLogContent;
  });
}
