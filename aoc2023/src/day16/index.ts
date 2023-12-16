import run from "aocrunner";

type Beam = {
  pos: BeamPosition;
  dir: string;
};

type BeamPosition = { i: number; j: number };

type Visited = { [key: string]: { [key: string]: boolean } };

type Direction = "r" | "l" | "u" | "d";
type MapSymbol = "." | "|" | "-" | "/" | "\\";

const map = {
  ".": { r: ["r"], l: ["l"], u: ["u"], d: ["d"] },
  "|": { r: ["u", "d"], l: ["u", "d"], u: ["u"], d: ["d"] },
  "-": { r: ["r"], l: ["l"], u: ["r", "l"], d: ["r", "l"] },
  "/": { r: ["u"], l: ["d"], u: ["r"], d: ["l"] },
  "\\": { r: ["d"], l: ["u"], u: ["l"], d: ["r"] },
};

function getNext(current: string | null, dir: string): string[] {
  if (current === null || !isMapSymbol(current) || !isDirection(dir)) {
    return [];
  }

  return map[current][dir];
}

function isMapSymbol(symbol: string): symbol is MapSymbol {
  return [".", "|", "-", "/", "\\"].includes(symbol);
}

function isDirection(direction: string): direction is Direction {
  return ["r", "l", "u", "d"].includes(direction);
}

function move(pos: BeamPosition, dir: string) {
  const result = {
    i: pos.i,
    j: pos.j,
  };

  if (dir == "r") {
    result.j += 1;
  }

  if (dir == "l") {
    result.j -= 1;
  }

  if (dir == "u") {
    result.i -= 1;
  }

  if (dir == "d") {
    result.i += 1;
  }

  return result;
}

function isVisited(visited: Visited, pos: BeamPosition, dir: string): boolean {
  const key = `${pos.i}-${pos.j}`;

  return visited[key] && visited[key][dir];
}

function markVisited(visited: Visited, pos: BeamPosition, dir: string) {
  const key = `${pos.i}-${pos.j}`;

  if (!visited[key]) {
    visited[key] = {};
  }

  visited[key][dir] = true;
}

function energize(map: string[][], initialBeam: Beam): number {
  // Initialize the list of beams with the initial beam
  let beams = [initialBeam];

  // Initialize an empty object to keep track of visited positions
  let visitedPositions: Visited = {};

  // Continue the process as long as there are beams in the list
  while (beams.length !== 0) {
    // Initialize an empty list to hold the new beams generated in this iteration
    let newBeams: Beam[] = [];

    // Process each beam in the list
    for (const beam of beams) {
      // If the current position and direction of the beam have not been visited before
      if (!isVisited(visitedPositions, beam.pos, beam.dir)) {
        // Mark the current position and direction as visited
        markVisited(visitedPositions, beam.pos, beam.dir);

        // Get the symbol at the current position on the map
        const currentSymbol = map[beam.pos.i]
          ? map[beam.pos.i][beam.pos.j]
          : null;

        // Get the possible next directions based on the current symbol and direction
        const possibleNextDirections = getNext(currentSymbol, beam.dir);

        // For each possible next direction
        for (const direction of possibleNextDirections) {
          // Calculate the new position based on the current position and the next direction
          const newPosition = move(beam.pos, direction);

          // If the new position is outside the map, skip this direction
          if (!map[newPosition.i] || !map[newPosition.i][newPosition.j]) {
            continue;
          }

          // If the new position and direction have not been visited before
          if (!isVisited(visitedPositions, newPosition, direction)) {
            // Add a new beam with the new position and direction to the list of new beams
            newBeams.push({ pos: newPosition, dir: direction });
          }
        }
      }
    }

    // Replace the list of beams with the list of new beams for the next iteration
    beams = newBeams;
  }

  // Return the number of visited positions
  return Object.keys(visitedPositions).length;
}
const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""));

  return energize(grid, { pos: { i: 0, j: 0 }, dir: "r" });
};

const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""));

  const startingBeams = [];

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    startingBeams.push({ pos: { i: rowIndex, j: 0 }, dir: "r" });
    startingBeams.push({
      pos: { i: rowIndex, j: grid[rowIndex].length - 1 },
      dir: "l",
    });
  }

  for (let columnIndex = 0; columnIndex < grid[0].length; columnIndex++) {
    startingBeams.push({ pos: { i: 0, j: columnIndex }, dir: "d" });
    startingBeams.push({
      pos: { i: grid.length - 1, j: columnIndex },
      dir: "u",
    });
  }

  let maxScore = 0;

  for (const startingBeam of startingBeams) {
    const score = energize(grid, startingBeam);
    if (score > maxScore) {
      maxScore = score;
    }
  }

  return maxScore;
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
