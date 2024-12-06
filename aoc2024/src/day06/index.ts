import run from "aocrunner"

interface Position {
  x: number
  y: number
}

enum Direction {
  North = 0,
  East = 1,
  South = 2,
  West = 3,
}

interface VisitedField {
  position: Position
  direction: Direction
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split(""))

const getNextPosition = (
  position: Position,
  direction: Direction,
): Position => {
  switch (direction) {
    case Direction.North:
      return { x: position.x, y: position.y - 1 }
    case Direction.East:
      return { x: position.x + 1, y: position.y }
    case Direction.South:
      return { x: position.x, y: position.y + 1 }
    case Direction.West:
      return { x: position.x - 1, y: position.y }
    default:
      throw new Error("Invalid direction")
  }
}

const getStartPosition = (input: string[][]): Position => {
  let position: Position = { x: 0, y: 0 }

  input.forEach((line, y) => {
    if (line.includes("^")) {
      position = { x: line.indexOf("^"), y }
    }
  })

  return position
}

const getPathAndCheckValidity = (
  input: string[][],
): { path: string[][]; isValid: boolean } => {
  let running = true
  let position: Position = getStartPosition(input)
  let direction = Direction.North

  const visitedFields: VisitedField[] = []

  while (running) {
    let nextPosition: Position = getNextPosition(position, direction)

    const alreadyVisited = visitedFields.find(
      (field) =>
        field.position.x === nextPosition.x &&
        field.position.y === nextPosition.y &&
        field.direction === direction,
    )

    if (alreadyVisited) {
      return { path: input, isValid: false }
    }

    if (
      nextPosition.x < 0 ||
      nextPosition.y < 0 ||
      nextPosition.x >= input[0].length ||
      nextPosition.y >= input.length
    ) {
      running = false
    } else {
      const nextCell = input[nextPosition.y][nextPosition.x]

      if (nextCell === "#" || nextCell === "O") {
        direction = (direction + 1) % 4
      } else {
        position = nextPosition
        input[position.y][position.x] = "X"
        visitedFields.push({ position, direction })
      }
    }
  }

  return { path: input, isValid: true }
}

const part1 = (rawInput: string) => {
  let input = parseInput(rawInput)

  const path = getPathAndCheckValidity(input).path

  let sum = 0

  path.forEach((line) => {
    line.forEach((cell) => {
      if (cell === "X") {
        sum++
      }
    })
  })

  return sum
}

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput)

  const initialInput = input.map((line) => [...line])

  const path = getPathAndCheckValidity(input).path

  let sum = 0

  path.forEach((line, y) => {
    line.forEach((cell, x) => {
      if (cell === "X") {
        const newGrid = initialInput.map((line) => [...line])
        newGrid[y][x] = "O"

        const valid = getPathAndCheckValidity(newGrid).isValid

        if (!valid) {
          sum++
        }
      }
    })
  })

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `
          ....#.....
          .........#
          ..........
          ..#.......
          .......#..
          ..........
          .#..^.....
          ........#.
          #.........
          ......#...
        `,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          ....#.....
          .........#
          ..........
          ..#.......
          .......#..
          ..........
          .#..^.....
          ........#.
          #.........
          ......#...
        `,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
