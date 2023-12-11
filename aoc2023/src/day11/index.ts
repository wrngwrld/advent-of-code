import run from "aocrunner";

interface Galaxy {
  x: number;
  y: number;
}

interface EmptySpace {
  rows: number[];
  cols: number[];
}

function findGalaxies(input: string[][]) {
  let galaxies: Galaxy[] = [];

  input.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === "#") {
        galaxies.push({ x, y });
      }
    });
  });

  return galaxies;
}

function findEmptySpaces(input: string[][]) {
  const emptySpaces: EmptySpace = { rows: [], cols: [] };

  input.forEach((row, rowIndex) => {
    if (!row.includes("#")) {
      emptySpaces.rows.push(rowIndex);
    }
  });

  input[0].forEach((x, colIndex) => {
    const column = input.map((row) => row[colIndex]);
    if (!column.includes("#")) {
      emptySpaces.cols.push(colIndex);
    }
  });

  return emptySpaces;
}

const calculateSteps = (
  start: number,
  end: number,
  emptySpaces: number[],
  expansion: number,
): number => {
  let steps = Math.abs(start - end);
  for (let i = Math.min(start, end); i < Math.max(start, end); i++) {
    if (emptySpaces.includes(i)) {
      steps += expansion - 1;
    }
  }
  return steps;
};

function getPathLength(input: string[][], expansion: number) {
  let galaxies = findGalaxies(input);
  const emptySpaces = findEmptySpaces(input);

  let steps = 0;

  galaxies.forEach((galaxy) => {
    galaxies.forEach((otherGalaxy) => {
      if (galaxy.y < otherGalaxy.y) return;
      if (galaxy.y === otherGalaxy.y && galaxy.x < otherGalaxy.x) return;

      steps += calculateSteps(
        galaxy.x,
        otherGalaxy.x,
        emptySpaces.cols,
        expansion + 1,
      );
      steps += calculateSteps(
        galaxy.y,
        otherGalaxy.y,
        emptySpaces.rows,
        expansion + 1,
      );
    });
  });

  return steps;
}

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((row) => row.split(""));

  return getPathLength(input, 1);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((row) => row.split(""));

  return getPathLength(input, 999999);
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
