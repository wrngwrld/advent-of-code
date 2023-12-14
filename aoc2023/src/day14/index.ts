import run from "aocrunner";

function rotateMatrix(matrix: string[][]): string[][] {
  const rowCount = matrix.length;
  const colCount = matrix[0].length;
  const rotatedMatrix = Array.from({ length: colCount }, () =>
    Array(rowCount).fill(0),
  );

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      rotatedMatrix[c][rowCount - r - 1] = matrix[r][c];
    }
  }

  return rotatedMatrix;
}

function tilt(lines: string[][]): string[][] {
  for (let i = 0; i < lines.length; i++) {
    lines.forEach((line, y) => {
      if (y === 0) return;

      line.forEach((char, x) => {
        if (char === "O" && lines[y - 1][x] === ".") {
          lines[y][x] = ".";
          lines[y - 1][x] = "O";
        }
      });
    });
  }

  return lines;
}

function calcSum(lines: string[][]): number {
  let sum = 0;

  lines.forEach((line, y) => {
    line.forEach((char) => {
      if (char === "O") sum = sum + 1 * (lines.length - y);
    });
  });

  return sum;
}

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  let input = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""));

  input = tilt(input);

  const sum = calcSum(input);

  return sum;
};

function hash(lines: string[][]): string {
  return lines.map((line) => line.join("")).join("\n");
}

function performOperations(input: string[][]): string[][] {
  for (let i = 0; i < 4; i++) {
    input = tilt(input);
    input = rotateMatrix(input);
  }
  return input;
}

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""));

  let cycleLength = 0;
  let cycleStart = 0;
  const seen = new Map();

  for (let i = 0; i < 1000000000; i++) {
    const h = hash(input);

    if (seen.has(h)) {
      cycleStart = seen.get(h);
      cycleLength = i - cycleStart;
      break;
    }

    seen.set(h, i);

    input = performOperations(input);
  }

  const remainingIterations = (1000000000 - cycleStart) % cycleLength;

  for (let i = 0; i < remainingIterations; i++) {
    input = performOperations(input);
  }

  const sum = calcSum(input);

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
