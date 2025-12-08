import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const wrap0to100 = (n: number): number => {
  const mod = 100;
  return ((n % mod) + mod) % mod;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const instructions = input.split("\n").map((line) => {
    return {
      direction: line.slice(0, 1) as "L" | "R",
      steps: parseInt(line.substring(1, 99)),
    };
  });

  let pos = 50;
  let count = 0;

  instructions.forEach((instruction) => {
    if (instruction.direction === "L") {
      pos -= instruction.steps;
      pos = wrap0to100(pos);
    } else {
      pos += instruction.steps;
      pos = wrap0to100(pos);
    }

    if (pos === 0) {
      count++;
    }
  });

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const instructions = input.split("\n").map((line) => {
    return {
      direction: line.slice(0, 1) as "L" | "R",
      steps: parseInt(line.substring(1, 99)),
    };
  });

  let pos = 50;
  let count = 0;

  instructions.forEach((instruction) => {
    if (instruction.direction === "R") {
      const start = pos;
      const end = pos + instruction.steps;

      count += Math.floor(end / 100) - Math.floor(start / 100);
      pos = end % 100;
    } else {
      const start = pos;
      const end = pos - instruction.steps;

      count += Math.floor(-end / 100) - Math.floor(-start / 100);
      pos = ((end % 100) + 100) % 100;
    }
  });

  return count;
};

run({
  part1: {
    tests: [
      {
        input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
