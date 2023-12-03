import run from "aocrunner";

function getSurroundingChars(
  lines: string[],
  linesIndex: number,
  lineIndex: number,
): string[] {
  const line = lines[linesIndex].split("");
  const lineAbove = linesIndex > 0 ? lines[linesIndex - 1].split("") : [];
  const lineBelow =
    linesIndex < lines.length - 1 ? lines[linesIndex + 1].split("") : [];

  return [
    lineAbove[lineIndex - 1],
    lineAbove[lineIndex],
    lineAbove[lineIndex + 1],
    line[lineIndex - 1],
    line[lineIndex + 1],
    lineBelow[lineIndex - 1],
    lineBelow[lineIndex],
    lineBelow[lineIndex + 1],
  ];
}

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");

  let partSum: number = 0;

  lines.forEach((line, linesIndex) => {
    let isAlreadyPartNumber: number[] = [];

    line.split("").map((char, lineIndex) => {
      if (!isNaN(parseInt(char)) && !isAlreadyPartNumber.includes(lineIndex)) {
        let surroundingChars = getSurroundingChars(
          lines,
          linesIndex,
          lineIndex,
        );

        surroundingChars = surroundingChars.filter(
          (char) => char !== "." && isNaN(parseInt(char)) && char !== undefined,
        );

        if (!(surroundingChars.length === 0)) {
          const splitLine = line.split("");

          let parseNumber = "";
          let currentIndex = lineIndex;

          for (let i = lineIndex; i >= 0; i--) {
            if (parseInt(splitLine[i]) >= 0) {
              currentIndex = i;
            } else {
              break;
            }
          }

          for (let i = currentIndex; i < splitLine.length; i++) {
            if (isNaN(parseInt(splitLine[i]))) {
              break;
            }
            isAlreadyPartNumber.push(i);
            parseNumber = parseNumber + splitLine[i];
          }

          partSum = partSum + parseInt(parseNumber);
        }
      }
    });
  });

  return partSum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");

  const numbers: {
    number: string;
    line: number;
    start: number;
    end: number;
  }[] = [];

  lines.forEach((line, lineIndex) => {
    let currentNumber = "";
    let start = 0;

    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      const char = line[charIndex];
      if (char >= "0" && char <= "9") {
        if (currentNumber === "") {
          start = charIndex;
        }
        currentNumber += char;
      } else {
        if (currentNumber !== "") {
          numbers.push({
            number: currentNumber,
            line: lineIndex,
            start,
            end: charIndex - 1,
          });
          currentNumber = "";
        }
      }
    }

    if (currentNumber !== "") {
      numbers.push({
        number: currentNumber,
        line: lineIndex,
        start,
        end: line.length - 1,
      });
    }
  });

  let sum = 0;

  lines.forEach((line, lineIndex) => {
    line.split("").map((char, charIndex) => {
      if (char === "*") {
        const adjacentNumbers = numbers.filter((number) => {
          return (
            number.line >= lineIndex - 1 &&
            number.line <= lineIndex + 1 &&
            number.end >= charIndex - 1 &&
            number.start <= charIndex + 1
          );
        });

        if (adjacentNumbers.length === 2) {
          sum +=
            parseInt(adjacentNumbers[0].number) *
            parseInt(adjacentNumbers[1].number);
        }
      }
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
