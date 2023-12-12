import run from "aocrunner";

interface Cache {
  cacheLine: CacheLine;
  result: number;
}

interface CacheLine {
  pos: number;
  numberId: number;
}

class Row {
  springs: string;
  numbers: number[];
  cache: Cache[] = [];

  constructor(line: string, unfoldAmount: number) {
    let springs = line.split(" ")[0];
    let numbers = line.split(" ")[1].split(",").map(Number);

    this.springs = Array(unfoldAmount).fill(springs).join("?");
    this.numbers = Array(unfoldAmount)
      .fill(numbers)
      .join(",")
      .split(",")
      .map(Number);
  }

  findPossibilities(index: number, numberId: number): number {
    if (
      this.cache.find(
        (cacheLine) =>
          cacheLine.cacheLine.pos === index &&
          cacheLine.cacheLine.numberId === numberId,
      )
    ) {
      return this.cache.find(
        (cacheLine) =>
          cacheLine.cacheLine.pos === index &&
          cacheLine.cacheLine.numberId === numberId,
      )!.result;
    }

    let result = 0;

    if (index >= this.springs.length) {
      let cacheLine: CacheLine = { pos: index, numberId: numberId };
      let res = numberId === this.numbers.length ? 1 : 0;
      this.cache.push({ cacheLine: cacheLine, result: res });
      return res;
    }

    if (this.springs[index] === "." || this.springs[index] === "?") {
      result += this.findPossibilities(index + 1, numberId);
    }

    if (numberId == this.numbers.length) {
      let cacheLine: CacheLine = { pos: index, numberId: numberId };
      this.cache.push({ cacheLine: cacheLine, result: result });
      return result;
    }

    if (
      (this.springs[index] === "#" || this.springs[index] === "?") &&
      index + this.numbers[numberId] <= this.springs.length &&
      !this.springs
        .substring(index, index + this.numbers[numberId])
        .includes(".") &&
      (index + this.numbers[numberId] == this.springs.length ||
        this.springs[index + this.numbers[numberId]] !== "#")
    ) {
      result += this.findPossibilities(
        index + this.numbers[numberId] + 1,
        numberId + 1,
      );
    }

    let cacheLine: CacheLine = { pos: index, numberId: numberId };
    this.cache.push({ cacheLine: cacheLine, result: result });
    return result;
  }
}

function findSolution(lines: string[], unfoldAmount: number) {
  let sum = 0;

  let rows: Row[] = lines.map((line): Row => new Row(line, unfoldAmount));

  for (let i = 0; i < rows.length; i++) {
    sum += rows[i].findPossibilities(0, 0);
  }

  return sum;
}

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput).split("\n");

  return findSolution(lines, 1);
};

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput).split("\n");

  return findSolution(lines, 5);
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
