import run from "aocrunner";

interface Card {
  number: number;
  winningNumbers: number[];
  values: number[];
}

function getCards(game: string[][]) {
  let cards: Card[] = [];

  game.map((line) => {
    const [key, value] = line;

    const cardNumber = key
      .split(" ")
      .filter((value) => value !== "")
      .map((value) => parseInt(value))[1];

    const gameValues = value.split(" | ").map((game) =>
      game
        .split(" ")
        .map((value) => value.trim())
        .filter((value) => value !== "")
        .map((value) => parseInt(value)),
    );

    const card = {
      number: cardNumber,
      winningNumbers: gameValues[0],
      values: gameValues[1],
    };

    cards.push(card);
  });

  return cards;
}

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(":").map((part) => part.trim()));

  const cards = getCards(input);

  let sum = 0;

  cards.forEach((card) => {
    let foundSum = 0;
    let alreadyFound: number[] = [];

    card.values.map((value) => {
      if (
        card.winningNumbers.includes(value) &&
        !alreadyFound.includes(value)
      ) {
        alreadyFound.push(value);
        if (foundSum === 0) {
          foundSum = 1;
        } else {
          foundSum *= 2;
        }
      }
    });

    sum += foundSum;
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(":").map((part) => part.trim()));

  const cards = getCards(input);
  const cardMap = new Map(cards.map((card) => [card.number, card]));
  let numbers: number[] = cards.map((card) => card.number);

  for (let i = 0; i < numbers.length; i++) {
    const currentCard = cardMap.get(numbers[i]);

    if (currentCard) {
      let cardSum = 0;

      currentCard.values.forEach((value) => {
        if (currentCard.winningNumbers.includes(value)) {
          cardSum += 1;
        }
      });

      for (let j = 0; j < cardSum; j++) {
        const foundCard = cardMap.get(currentCard.number + 1 + j);

        if (foundCard) {
          numbers.push(foundCard.number);
        }
      }
    }
  }

  return numbers.length;
};

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
