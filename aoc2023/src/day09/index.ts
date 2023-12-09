import run from "aocrunner";

function getDatasets(rawInput: string): number[][] {
  return rawInput
    .split("\n")
    .map((line) => line.split(" "))
    .map((line) => line.map((num) => parseInt(num)));
}

function findSequenceDifference(sequence: number[]): number[] {
  let newSequence: number[] = [];

  for (let i = 0; newSequence.length < sequence.length - 1; i++) {
    const diff = sequence[i + 1] - sequence[i];
    newSequence.push(diff);
  }

  return newSequence;
}

function getSequenceDifference(dataset: number[]): number[][] {
  let sequences: number[][] = [dataset];

  while (!isOnlyZeroes(sequences[sequences.length - 1])) {
    sequences.push(findSequenceDifference(sequences[sequences.length - 1]));
  }

  return sequences;
}

function isOnlyZeroes(sequence: number[]): boolean {
  return sequence.every((num) => num === 0);
}

function getLastHistory(sequence: number[][]): number {
  sequence[sequence.length - 1].push(0);

  for (let i = sequence.length - 1; i > 0; i--) {
    const currentNum = sequence[i][sequence[i].length - 1];
    const nextNumb = sequence[i - 1][sequence[i - 1].length - 1];

    sequence[i - 1].push(currentNum + nextNumb);
  }

  return sequence[0][sequence[0].length - 1];
}

function getFirstHistory(sequence: number[][]): number {
  sequence[sequence.length - 1].unshift(0);

  for (let i = sequence.length - 1; i > 0; i--) {
    const currentNum = sequence[i][0];
    const nextNumb = sequence[i - 1][0];

    sequence[i - 1].unshift(nextNumb - currentNum);
  }

  return sequence[0][0];
}

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const datasets = getDatasets(parseInput(rawInput));

  let sum = 0;

  datasets.forEach((dataset) => {
    const sequences = getSequenceDifference(dataset);

    sum += getLastHistory(sequences);
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const datasets = getDatasets(parseInput(rawInput));

  let sum = 0;

  datasets.forEach((dataset) => {
    const sequences = getSequenceDifference(dataset);

    sum += getFirstHistory(sequences);
  });

  return sum;
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
