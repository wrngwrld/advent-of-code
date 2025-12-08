import run from "aocrunner";

function isRepeatedTwice(n: number): boolean {
  const s = String(n);
  if (s.length % 2 !== 0) return false;

  const half = s.length / 2;
  return s.slice(0, half) === s.slice(half);
}

function isRepeatedNTimes(n: number): boolean {
  const s = String(n);
  const len = s.length;

  // Try every possible repeat count from 2 up to len
  for (let repeat = 2; repeat <= len; repeat++) {
    if (len % repeat !== 0) continue;
    const segLen = len / repeat;
    const pattern = s.slice(0, segLen);
    let ok = true;
    for (let i = 1; i < repeat; i++) {
      if (s.slice(i * segLen, (i + 1) * segLen) !== pattern) {
        ok = false;
        break;
      }
    }
    if (ok) return true;
  }
  return false;
}
const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const ranges = input.split(",");

  let count = 0;

  ranges.forEach((range) => {
    const [a, b] = range.split("-").map(Number);
    for (let i = a; i <= b; i++) {
      if (isRepeatedTwice(i)) {
        count = count + i;
      }
    }
  });

  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const ranges = input.split(",");

  let count = 0;

  ranges.forEach((range) => {
    const [a, b] = range.split("-").map(Number);
    for (let i = a; i <= b; i++) {
      if (isRepeatedNTimes(i)) {
        count = count + i;
      }
    }
  });

  return count;
};

run({
  part1: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
        expected: 1227775554,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
        expected: 4174379265,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
