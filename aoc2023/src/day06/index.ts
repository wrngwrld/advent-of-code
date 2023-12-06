import run from "aocrunner";

interface Game {
  time: number;
  distance: number;
}

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const [time, distance] = parseInput(rawInput).split("\n");

  const times = time
    .split(" ")
    .filter((t) => t !== "")
    .splice(1);
  const distances = distance
    .split(" ")
    .filter((t) => t !== "")
    .splice(1);

  const games: Game[] = times.map((time, i) => ({
    time: parseInt(time),
    distance: parseInt(distances[i]),
  }));

  let timesBeatenOverall: number[] = [];

  games.map((game) => {
    let timesBeaten = 0;

    for (let i = 0; i < game.time; i++) {
      const pressedTime = i;
      const restTime = game.time - i;

      const distance = restTime * pressedTime;

      if (distance > game.distance) timesBeaten++;
    }

    timesBeatenOverall.push(timesBeaten);
  });

  const sum = timesBeatenOverall.reduce((a, b) => a * b);

  return sum;
};

const part2 = (rawInput: string) => {
  let [time, distance] = parseInput(rawInput).split("\n");

  time = time
    .split(" ")
    .filter((t) => t !== "")
    .splice(1)
    .join("");
  distance = distance
    .split(" ")
    .filter((t) => t !== "")
    .splice(1)
    .join("");

  const game: Game = {
    time: parseInt(time),
    distance: parseInt(distance),
  };

  let timesBeaten = 0;

  for (let i = 0; i < game.time; i++) {
    const pressedTime = i;
    const restTime = game.time - i;

    const distance = restTime * pressedTime;

    if (distance > game.distance) timesBeaten++;
  }

  return timesBeaten;
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
