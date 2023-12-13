import run from "aocrunner";

function transpose(pattern: string[]): string[] {
  const result = Array(pattern[0].length).fill("");
  for (const row of pattern) {
    [...row].forEach((c, i) => (result[i] += c));
  }
  return result;
}

const findReflection = (
  section: string[],
  multiplier: number,
  singleMismatch: boolean = false,
) => {
  for (let row = 0; row < section.length - 1; row++) {
    let mismatch = 0;

    for (let l = row, r = row + 1; l >= 0 && r < section.length; l--, r++) {
      if (section[l] !== section[r]) {
        mismatch += getDiff(section[l], section[r]);
      }
    }

    if (mismatch === (singleMismatch ? 1 : 0)) {
      return (row + 1) * multiplier;
    }
  }

  return null;
};

const getDiff = (left: string, right: string) => {
  let diff = 0;
  let i = 0;

  while (i < left.length) {
    if (left[i] !== right[i]) diff++;
    i++;
  }

  return diff;
};

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n\n")
    .map((line) => line.split("\n"));

  let sum = 0;

  input.map((map) => {
    const vertical = findReflection(map, 100);
    map = transpose(map);
    const horizontal = findReflection(map, 1);

    sum += vertical ?? horizontal ?? 0;
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n\n")
    .map((line) => line.split("\n"));

  let sum = 0;

  input.map((map) => {
    const vertical = findReflection(map, 100, true);
    map = transpose(map);
    const horizontal = findReflection(map, 1, true);

    sum += vertical ?? horizontal ?? 0;
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
