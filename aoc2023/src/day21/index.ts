import run from "aocrunner";
import { log } from "console";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""));

  let startPosition = [0, 0];

  input.forEach((line, y) => {
    line.forEach((char, x) => {
      if (char === "S") {
        startPosition = [x, y];
      }
    });
  });

  const steps = 64;

  let newPositions: number[][] = [startPosition];

  for (let i = 0; i < steps; i++) {
    let positions: number[][] = [];

    newPositions.forEach((position) => {
      try {
        if (input[position[1] - 1][position[0]] === ".") {
          input[position[1] - 1][position[0]] = "O";
          positions.push([position[0], position[1] - 1]);
        }
      } catch (e) {}

      try {
        if (input[position[1]][position[0] - 1] === ".") {
          input[position[1]][position[0] - 1] = "O";
          positions.push([position[0] - 1, position[1]]);
        }
      } catch (e) {}

      try {
        if (input[position[1] + 1][position[0]] === ".") {
          input[position[1] + 1][position[0]] = "O";
          positions.push([position[0], position[1] + 1]);
        }
      } catch (e) {}

      try {
        if (input[position[1]][position[0] + 1] === ".") {
          input[position[1]][position[0] + 1] = "O";
          positions.push([position[0] + 1, position[1]]);
        }
      } catch (e) {}
    });

    newPositions.forEach((position) => {
      input[position[1]][position[0]] = ".";
    });

    newPositions = positions;
  }

  let sum = 0;

  input.forEach((line) => {
    line.forEach((char) => {
      if (char === "O") {
        sum++;
      }
    });
  });

  return sum;
};

const part2 = (rawInput: string) => {
  return;
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
