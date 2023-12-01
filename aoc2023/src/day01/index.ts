import run from "aocrunner";

function findNumbers(line: string): string[] {
  return [...line.matchAll(/[\-\d]+/g)].map((i) => i.toString());
}

function filterLine(lines: string[]): string[][] {
  const list = lines.map((x) => {
    return findNumbers(x);
  });

  return list;
}

function sumLines(lines: number[]): number {
  let sum = 0;

  lines.forEach((x) => {
    sum += x;
  });

  return sum;
}

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input
    .trim()
    .split("\n\n")
    .map((x) => x.split("\n"))
    .map((x) => filterLine(x))
    .map((x) => x.map((y) => y.join("")))
    .map((x) => x.map((y) => y.split("")))
    .map((x) => x.map((y) => y[0] + y[y.length - 1]))
    .map((x) => x.map((y) => parseInt(y)))
    .map((x) => sumLines(x));

  return lines[0];
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input
    .trim()
    .split("\n\n")
    .map((x) => x.split("\n"))
    .map((x) =>
      x.map((y) =>
        y
          .replace(/(?=(one|two|three|four|five|six|seven|eight|nine))/g, "$1")
          .replace(/one/g, "1")
          .replace(/two/g, "2")
          .replace(/three/g, "3")
          .replace(/four/g, "4")
          .replace(/five/g, "5")
          .replace(/six/g, "6")
          .replace(/seven/g, "7")
          .replace(/eight/g, "8")
          .replace(/nine/g, "9"),
      ),
    )
    .map((x) => filterLine(x))
    .map((x) => x.map((y) => y.join("")))
    .map((x) => x.map((y) => y.split("")))
    .map((x) => x.map((y) => y[0] + y[y.length - 1]))
    .map((x) => x.map((y) => parseInt(y)))
    .map((x) => sumLines(x));

  return lines[0];
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
