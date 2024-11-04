export function selectionSort(cardTexts) {
  const log = [];
  const length = cardTexts.length;

  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < length; j++) {
      if (compareCards(cardTexts[j], cardTexts[minIndex]) < 0) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const temp = cardTexts[i];
      cardTexts[i] = cardTexts[minIndex];
      cardTexts[minIndex] = temp;

      // Solo registrar si el estado actual es distinto al último en `log`
      if (log.length === 0 || !arraysEqual(log[log.length - 1], cardTexts)) {
        log.push(cardTexts.slice());
      }
    }
  }
  return log;
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function compareCards(cardText1, cardText2) {
  const value1 = getValueFromCardText(cardText1);
  const value2 = getValueFromCardText(cardText2);
  return value1 - value2;
}

function getValueFromCardText(cardText) {
  switch (cardText) {
    case "A":
      return 1;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    default:
      return parseInt(cardText);
  }
}
