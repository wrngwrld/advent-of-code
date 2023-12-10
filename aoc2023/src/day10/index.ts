import run from "aocrunner";

type Position = [number, number];

function getNextPoints(
  grid: string[][],
  currentPosition: Position,
): Position[] {
  if (!currentPosition) return [];

  const [currentRow, currentColumn] = currentPosition;

  if (grid[currentRow][currentColumn] === "S") {
    return [
      [currentRow - 1, currentColumn],
      [currentRow + 1, currentColumn],
      [currentRow, currentColumn - 1],
      [currentRow, currentColumn + 1],
    ].filter(
      ([r, c]) =>
        !!grid?.[r]?.[c] &&
        getNextPoints(grid, [r, c])?.some(
          (p) => p[0] === currentRow && p[1] === currentColumn,
        ),
    ) as [Position, Position];
  }

  if (grid[currentRow][currentColumn] === "-") {
    return [
      [currentRow, currentColumn - 1],
      [currentRow, currentColumn + 1],
    ];
  }

  if (grid[currentRow][currentColumn] === "|") {
    return [
      [currentRow - 1, currentColumn],
      [currentRow + 1, currentColumn],
    ];
  }

  if (grid[currentRow][currentColumn] === "L") {
    return [
      [currentRow, currentColumn + 1],
      [currentRow - 1, currentColumn],
    ];
  }

  if (grid[currentRow][currentColumn] === "J") {
    return [
      [currentRow - 1, currentColumn],
      [currentRow, currentColumn - 1],
    ];
  }

  if (grid[currentRow][currentColumn] === "7") {
    return [
      [currentRow, currentColumn - 1],
      [currentRow + 1, currentColumn],
    ];
  }

  if (grid[currentRow][currentColumn] === "F") {
    return [
      [currentRow, currentColumn + 1],
      [currentRow + 1, currentColumn],
    ];
  }

  return [];
}

function getStartingPosition(grid: string[][]): Position {
  for (let y = 0; y < grid.length; y++) {
    const x = grid[y].findIndex((cell) => cell === "S");

    if (x !== -1) {
      return [y, x];
    }
  }

  throw new Error("Start position not found");
}

function findFarthestPointInLoop(grid: string[][]): number {
  const startingPoint = getStartingPosition(grid);

  let foundFurthestPoint = false;
  let distance = 1;

  let currentPoints: Position[] = getNextPoints(grid, startingPoint);

  const visited = new Set<string>([
    startingPoint.join(","),
    ...currentPoints.map((p) => p.join(",")),
  ]);

  while (!foundFurthestPoint) {
    const nextForwardPoints = getNextPoints(grid, currentPoints[0]);
    const nextBackwardPoints = getNextPoints(grid, currentPoints[1]);

    const nextPoints = [...nextForwardPoints, ...nextBackwardPoints].filter(
      (p) => !visited.has(p.join(",")),
    );

    if (nextPoints.length === 0) {
      foundFurthestPoint = true;
    } else {
      nextPoints.forEach((p) => visited.add(p.join(",")));
      currentPoints = nextPoints as [Position, Position];
      distance++;
    }
  }

  return distance;
}

function getEnclosedAreaOfLoop(grid: string[][]): number {
  const startingPoint = getStartingPosition(grid);

  let done = false;
  let currentPoints: Position[] = getNextPoints(grid, startingPoint);

  const visited = new Set<string>([
    startingPoint.join(","),
    ...currentPoints.map((p) => p.join(",")),
  ]);

  while (!done) {
    const nextForwardPoints = getNextPoints(grid, currentPoints[0]);
    const nextBackwardPoints = getNextPoints(grid, currentPoints[1]);

    const nextPoints = [...nextForwardPoints, ...nextBackwardPoints].filter(
      (p) => !visited.has(p.join(",")),
    );
    if (nextPoints.length === 0) {
      done = true;
    } else {
      nextPoints.forEach((p) => visited.add(p.join(",")));
      currentPoints = nextPoints as [Position, Position];
    }
  }

  let containedPoints = 0;
  let insideWalls = false;
  let lastWall = "";

  grid.forEach((row, rowIndex) => {
    lastWall = "";
    insideWalls = false;

    row.forEach((cell, cellIndex) => {
      if (insideWalls && !visited.has([rowIndex, cellIndex].join(","))) {
        containedPoints++;
      }

      if (visited.has([rowIndex, cellIndex].join(","))) {
        if (cell === "|") {
          insideWalls = !insideWalls;
        } else {
          if (cell === "7") {
            if (lastWall === "L") {
              insideWalls = !insideWalls;
            }
          }

          if (cell === "J") {
            if (lastWall === "F") {
              insideWalls = !insideWalls;
            }
          }

          if (cell !== "-") lastWall = cell;
        }
      }
    });
  });

  return containedPoints;
}

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((l) => l.trim().split(""));

  return findFarthestPointInLoop(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((l) => l.trim().split(""));

  return getEnclosedAreaOfLoop(input);
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
