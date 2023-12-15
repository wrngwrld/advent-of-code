import run from "aocrunner";

export interface Lens {
  label: string;
  value: string;
}

export interface Box {
  lenses: Lens[];
}

function hashing(chars: string) {
  return chars.split("").reduce((val, char) => {
    const ascii = char.charCodeAt(0);
    return ((val + ascii) * 17) % 256;
  }, 0);
}

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split(",");

  const sum = input.reduce((total, chars) => {
    let curVal = hashing(chars);
    return total + curVal;
  }, 0);

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split(",");

  let boxes: Box[] = [];
  for (let i = 0; i < 256; i++) {
    boxes.push({
      lenses: [],
    });
  }

  input.forEach((chars) => {
    if (chars.includes("=")) {
      const [label, value] = chars.split("=");

      const boxIndex = hashing(label);
      const oldIndex = boxes[boxIndex].lenses.findIndex(
        (l) => l.label === label,
      );

      if (oldIndex > -1) {
        boxes[boxIndex].lenses[oldIndex].value = value;
      } else {
        boxes[boxIndex].lenses.push({
          label,
          value,
        });
      }
    } else if (chars.includes("-")) {
      const [label, _] = chars.split("-");

      const boxIndex = hashing(label);
      const removeIndex = boxes[boxIndex].lenses.findIndex(
        (l) => l.label === label,
      );

      if (removeIndex > -1) {
        boxes[boxIndex].lenses.splice(removeIndex, 1);
      }
    }
  });

  let sum = 0;

  boxes.forEach((box, boxIndex) => {
    box.lenses.forEach((lens, lensIndex) => {
      sum += (boxIndex + 1) * (lensIndex + 1) * Number(lens.value);
    });
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
