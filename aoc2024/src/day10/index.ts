import run from "aocrunner"

// Parse the input into a 2D array of numbers
const parseInput = (rawInput: string): number[][] => {
  return rawInput
    .trim()
    .split("\n")
    .map((line) => line.trim().split("").map(Number))
}

// Directions for moving in the grid (right, down, left, up)
const directions: [number, number][] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
]

// Perform BFS to calculate the score or count distinct paths
const bfs = (
  map: number[][],
  startRow: number,
  startCol: number,
  mode: "score" | "paths",
): number => {
  const rows = map.length
  const cols = map[0].length
  const queue: [number, number][] = [[startRow, startCol]]
  const visited = new Set<string>([`${startRow},${startCol}`])
  let result = 0

  if (mode === "paths") {
    const pathCount = new Map<string, number>([[`${startRow},${startCol}`, 1]])

    while (queue.length > 0) {
      const [row, col] = queue.shift()!
      const currentCount = pathCount.get(`${row},${col}`)!

      for (const [dr, dc] of directions) {
        const newRow = row + dr
        const newCol = col + dc

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          map[newRow][newCol] === map[row][col] + 1
        ) {
          const newPos = `${newRow},${newCol}`

          if (!pathCount.has(newPos)) {
            queue.push([newRow, newCol])
          }

          pathCount.set(newPos, (pathCount.get(newPos) || 0) + currentCount)
        }
      }
    }

    for (const [key, value] of pathCount.entries()) {
      const [row, col] = key.split(",").map(Number)
      if (map[row][col] === 9) {
        result += value
      }
    }
  } else {
    while (queue.length > 0) {
      const [row, col] = queue.shift()!

      if (map[row][col] === 9) {
        result++
      }

      for (const [dr, dc] of directions) {
        const newRow = row + dr
        const newCol = col + dc

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          !visited.has(`${newRow},${newCol}`) &&
          map[newRow][newCol] === map[row][col] + 1
        ) {
          queue.push([newRow, newCol])
          visited.add(`${newRow},${newCol}`)
        }
      }
    }
  }

  return result
}

const part1 = (rawInput: string): number => {
  const map = parseInput(rawInput)
  let totalScore = 0

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === 0) {
        totalScore += bfs(map, row, col, "score")
      }
    }
  }

  return totalScore
}

const part2 = (rawInput: string): number => {
  const map = parseInput(rawInput)
  let totalRating = 0

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === 0) {
        totalRating += bfs(map, row, col, "paths")
      }
    }
  }

  return totalRating
}

run({
  part1: {
    tests: [
      {
        input: `
        89010123
        78121874
        87430965
        96549874
        45678903
        32019012
        01329801
        10456732
        `,
        expected: 36,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        89010123
        78121874
        87430965
        96549874
        45678903
        32019012
        01329801
        10456732
        `,
        expected: 81,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
