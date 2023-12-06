import run from "aocrunner";

function getMapOutput(map: string[], input: number) {
  let result: number = 0;

  let valFound = false;
  map.forEach((row) => {
    if (!valFound) {
      const [destinationStartString, sourceStartString, rangeLengthString] =
        row.split(" ");

      const destinationStart = parseInt(destinationStartString);
      const sourceStart = parseInt(sourceStartString);
      const rangeLength = parseInt(rangeLengthString);

      if (input >= sourceStart && input <= sourceStart + rangeLength) {
        const diff = input - sourceStart;
        result = destinationStart + diff;
        valFound = true;
      } else if (result === 0) {
        result = input;
      }
    }
  });

  return result;
}

function getMapOutputReverse(map: string[], location: number) {
  let result: number = 0;

  let valFound = false;
  map.forEach((row) => {
    if (!valFound) {
      const [destinationStartString, sourceStartString, rangeLengthString] =
        row.split(" ");

      const destinationStart = parseInt(destinationStartString);
      const sourceStart = parseInt(sourceStartString);
      const rangeLength = parseInt(rangeLengthString);

      if (
        location >= destinationStart &&
        location <= destinationStart + rangeLength
      ) {
        const diff = location - destinationStart;

        result = sourceStart + diff;
        valFound = true;
      } else if (result === 0) {
        result = location;
      }
    }
  });

  return result;
}

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n\n");
  const seeds = input[0]
    .split(" ")
    .splice(1)
    .map((seed) => parseInt(seed));

  let lowestSeed: number | undefined = undefined;

  seeds.forEach((seed) => {
    for (let i = 1; i < 8; i++) {
      const map = input[i].split("\n").slice(1);
      seed = getMapOutput(map, seed);
    }

    if (!lowestSeed || seed < lowestSeed) {
      lowestSeed = seed;
    }
  });

  return lowestSeed;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n\n");
  const inputSeeds = input[0]
    .split(" ")
    .splice(1)
    .map((seed) => parseInt(seed));

  let maxSeed = 0;
  let seedRange = [];

  let result = 0;

  for (let a = 0; a < inputSeeds.length; a += 2) {
    let seedStart = inputSeeds[a] * 1;
    let seedSize = inputSeeds[a + 1] * 1;
    let seedEnd = seedStart + seedSize - 1;
    seedRange.push({ start: seedStart, end: seedEnd });
    maxSeed = Math.max(maxSeed, seedEnd);
  }

  for (let i = 0; i < maxSeed; i++) {
    if (i % 100000 == 0) console.log("Checking next range", i);

    let currentSeed = i;

    for (let j = 7; j > 0; j--) {
      const map = input[j].split("\n").slice(1);
      currentSeed = getMapOutputReverse(map, currentSeed);
    }

    let found = false;
    seedRange.forEach((sr) => {
      if (currentSeed >= sr.start && currentSeed <= sr.end) {
        found = true;
      }
    });
    if (found) {
      result = i;
      break;
    }
  }

  return result;
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
