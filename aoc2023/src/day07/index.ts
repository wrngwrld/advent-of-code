import run from "aocrunner";

interface Hand {
  cards: number[];
  bid: number;
  rank: number;
}

const cardValues: { [key: string]: number } = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};

function isFiveOfAKind(cards: number[]) {
  const cardMap: { [key: number]: number } = {};
  cards.forEach((card) => {
    if (cardMap[card]) {
      cardMap[card] += 1;
    } else {
      cardMap[card] = 1;
    }
  });

  return Object.values(cardMap).includes(5);
}

function isFourOfAKind(cards: number[]) {
  const cardMap: { [key: number]: number } = {};
  cards.forEach((card) => {
    if (cardMap[card]) {
      cardMap[card] += 1;
    } else {
      cardMap[card] = 1;
    }
  });

  return Object.values(cardMap).includes(4);
}

function isFullHouse(cards: number[]) {
  const cardMap: { [key: number]: number } = {};
  cards.forEach((card) => {
    if (cardMap[card]) {
      cardMap[card] += 1;
    } else {
      cardMap[card] = 1;
    }
  });

  const cardCounts = Object.values(cardMap);

  return cardCounts.includes(2) && cardCounts.includes(3);
}

function isThreeOfAKind(cards: number[]) {
  const cardMap: { [key: number]: number } = {};
  cards.forEach((card) => {
    if (cardMap[card]) {
      cardMap[card] += 1;
    } else {
      cardMap[card] = 1;
    }
  });

  return Object.values(cardMap).includes(3);
}

function isTwoPair(cards: number[]) {
  const cardMap: { [key: number]: number } = {};
  cards.forEach((card) => {
    if (cardMap[card]) {
      cardMap[card] += 1;
    } else {
      cardMap[card] = 1;
    }
  });

  const cardCounts = Object.values(cardMap);

  return cardCounts.filter((count) => count === 2).length === 2;
}

function isOnePair(cards: number[]) {
  const cardMap: { [key: number]: number } = {};
  cards.forEach((card) => {
    if (cardMap[card]) {
      cardMap[card] += 1;
    } else {
      cardMap[card] = 1;
    }
  });

  return Object.values(cardMap).includes(2);
}

function isHighCard(cards: number[]) {
  const cardMap: { [key: number]: number } = {};
  cards.forEach((card) => {
    if (cardMap[card]) {
      cardMap[card] += 1;
    } else {
      cardMap[card] = 1;
    }
  });

  return Object.values(cardMap).length === 5;
}

function compareCards(cards1: number[], cards2: number[]) {
  for (let i = 0; i < 5; i++) {
    if (cards1[i] > cards2[i]) {
      return 1;
    } else if (cards1[i] < cards2[i]) {
      return -1;
    }
  }

  return 0;
}

function checkCardRank(card: number[]): number {
  if (isFiveOfAKind(card)) {
    return 1;
  }
  if (isFourOfAKind(card)) {
    return 2;
  }
  if (isFullHouse(card)) {
    return 3;
  }
  if (isThreeOfAKind(card)) {
    return 4;
  }
  if (isTwoPair(card)) {
    return 5;
  }
  if (isOnePair(card)) {
    return 6;
  }
  if (isHighCard(card)) {
    return 7;
  }
  return 0;
}

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let hands: Hand[] = input
    .split("\n")
    .map((hand) => {
      const cardNumbers = hand
        .split(" ")[0]
        .split("")
        .map((card) => cardValues[card]);

      const bid = hand.split(" ")[1];

      return {
        bid: Number(bid),
        cards: cardNumbers,
        rank: 0,
      };
    })
    .map((hand) => ({
      ...hand,
      rank: checkCardRank(hand.cards),
    }))
    .sort((a, b) => a.rank - b.rank)
    .sort((a, b) => {
      return a.rank === b.rank ? compareCards(b.cards, a.cards) : 0;
    });

  let totalWinnings = 0;

  for (let i = hands.length - 1; i >= 0; i--) {
    totalWinnings += hands[i].bid * (hands.length - i);
  }

  return totalWinnings;
};

function checkJokers(
  card: number[],
  jokerIndices: number[] = [],
  jokerIndex = 0,
): number {
  let bestRank = 7;

  if (jokerIndices.length === 0) {
    for (let i = 0; i < card.length; i++) {
      if (card[i] === 1) {
        jokerIndices.push(i);
      }
    }
  }

  if (jokerIndex < jokerIndices.length) {
    for (let i = 2; i <= 14; i++) {
      card[jokerIndices[jokerIndex]] = i;
      let currentRank = checkJokers(card, jokerIndices, jokerIndex + 1);
      if (currentRank < bestRank) {
        bestRank = currentRank;
      }
    }

    card[jokerIndices[jokerIndex]] = 1;
  } else {
    bestRank = checkCardRank(card);
  }

  return bestRank;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let hands: Hand[] = input
    .split("\n")
    .map((hand) => {
      const cardNumbers = hand
        .split(" ")[0]
        .split("")
        .map((card) => cardValues[card])
        .map((card) => (card == 11 ? 1 : card));

      const bid = hand.split(" ")[1];

      return {
        bid: Number(bid),
        cards: cardNumbers,
        rank: 0,
      };
    })
    .map((hand) => ({
      ...hand,
      rank: checkJokers(hand.cards),
    }))
    .sort((a, b) => a.rank - b.rank)
    .sort((a, b) => {
      return a.rank === b.rank ? compareCards(b.cards, a.cards) : 0;
    });

  let totalWinnings = 0;

  for (let i = hands.length - 1; i >= 0; i--) {
    totalWinnings += hands[i].bid * (hands.length - i);
  }

  return totalWinnings;
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
