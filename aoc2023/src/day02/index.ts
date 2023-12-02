import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let lines = input
    .split("\n")
    .map((line) => line.split(":").map((x) => x.trim()))
    .map(([game, input]) => {
      const gameId = game.split(" ")[1];
      let gameInvalid = false;

      input
        .split(";")
        .map((line) => line.trim())
        .map((line) =>
          line
            .split(",")
            .map((x) => x.trim())
            .map((value) => {
              const [val, color] = value.split(" ");

              if (color === "red" && parseInt(val) > 12) {
                gameInvalid = true;
              }
              if (color === "green" && parseInt(val) > 13) {
                gameInvalid = true;
              }
              if (color === "blue" && parseInt(val) > 14) {
                gameInvalid = true;
              }
            }),
        );

      if (!gameInvalid) return gameId;
    })
    .filter((x) => x !== undefined);

  const sum = lines
    .map((x) => parseInt(x as string))
    .reduce((a, b) => a + b, 0);

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let lines = input
    .split("\n")
    .map((line) => line.split(":").map((x) => x.trim()))
    .map(([_, input]) => {
      let minRed = 0;
      let minGreen = 0;
      let minBlue = 0;

      input
        .split(";")
        .map((line) => line.trim())
        .map((line) =>
          line
            .split(",")
            .map((x) => x.trim())
            .map((value) => {
              const [val, color] = value.split(" ");

              if (color === "red" && parseInt(val) > minRed) {
                minRed = parseInt(val);
              }
              if (color === "green" && parseInt(val) > minGreen) {
                minGreen = parseInt(val);
              }
              if (color === "blue" && parseInt(val) > minBlue) {
                minBlue = parseInt(val);
              }
            }),
        );

      return minRed * minGreen * minBlue;
    });

  const sum = lines.reduce((a, b) => a + b, 0);

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
