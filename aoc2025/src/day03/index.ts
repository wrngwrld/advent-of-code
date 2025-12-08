import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const banks = parseInput(rawInput).split("\n");

  let sum = 0;

  banks.forEach((bank) => {
    const digits = bank.split("").map(Number);
    let maxJoltage = 0;
    for (let i = 0; i < digits.length; i++) {
      for (let j = i + 1; j < digits.length; j++) {
        const joltage = digits[i] * 10 + digits[j];
        if (joltage > maxJoltage) {
          maxJoltage = joltage;
        }
      }
    }
    sum += maxJoltage;
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const banks = parseInput(rawInput).split("\n");

  let sum = 0;

  banks.forEach((bank) => {
    const digits = bank.split("").map(Number);
    const n = digits.length;
    const target = 12;

    // We need to select exactly 12 digits to form the largest possible number
    // This is equivalent to removing (n - 12) digits to maximize the remaining number

    const toRemove = n - target;
    if (toRemove <= 0) {
      // If we have 12 or fewer digits, use all of them
      const numStr = digits.join("");
      sum += Number(numStr);
      return;
    }

    // Use a greedy approach to remove digits to maximize the remaining number
    const selected: number[] = [];
    let remainingToRemove = toRemove;

    for (let i = 0; i < digits.length; i++) {
      // While we can still remove digits and the last selected digit is smaller than current
      while (
        remainingToRemove > 0 &&
        selected.length > 0 &&
        selected[selected.length - 1] < digits[i] &&
        selected.length + (digits.length - i - 1) >= target
      ) {
        selected.pop();
        remainingToRemove--;
      }

      if (selected.length < target) {
        selected.push(digits[i]);
      }
    }

    // If we still need to remove more digits, remove from the end
    while (selected.length > target) {
      selected.pop();
    }

    const numStr = selected.join("");
    sum += Number(numStr);
  });

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 357,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 3121910778619,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
