import run from "aocrunner"
import { Stack } from "js-sdsl"

export type Direction = 0 | 1 | 2 | 3

export const directionArray: number[][] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

const directions: Direction[] = [0, 1, 2, 3]

export function get2DKey([x, y]: number[]) {
  return x * 10000000 + y
}

const parseInput = (rawInput: string) => rawInput

const getNeighbors = (x: number, y: number, grid: string[][]) => {
  const neighbors: [number, number][] = []
  if (x > 0) neighbors.push([x - 1, y])
  if (x < grid.length - 1) neighbors.push([x + 1, y])
  if (y > 0) neighbors.push([x, y - 1])
  if (y < grid[0].length - 1) neighbors.push([x, y + 1])
  return neighbors
}

const exploreRegion = (
  x: number,
  y: number,
  grid: string[][],
  visited: boolean[][],
) => {
  const plantType = grid[x][y]
  const stack: [number, number][] = [[x, y]]
  let area = 0
  let perimeter = 0

  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!
    if (visited[cx][cy]) continue
    visited[cx][cy] = true
    area++

    const neighbors = getNeighbors(cx, cy, grid)
    let localPerimeter = 4

    for (const [nx, ny] of neighbors) {
      if (grid[nx][ny] === plantType) {
        stack.push([nx, ny])
        localPerimeter--
      }
    }

    perimeter += localPerimeter
  }

  return { area, perimeter }
}

const calculateTotalPrice = (grid: string[][]) => {
  const visited = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(false),
  )

  let totalPrice = 0

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (!visited[x][y]) {
        const { area, perimeter } = exploreRegion(x, y, grid, visited)
        totalPrice += area * perimeter
      }
    }
  }

  return totalPrice
}

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput)
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""))
  return calculateTotalPrice(grid)
}

function getTotalPrice(input: string[][], useSides = false) {
  const visited = new Set<number>()

  let sum = 0

  for (const [y, line] of input.entries()) {
    for (const [x] of line.entries()) {
      if (!visited.has(get2DKey([x, y]))) {
        sum += getRegionPrice([x, y], input, visited, useSides)
      }
    }
  }
  return sum
}

function getRegionPrice(
  position: number[],
  input: string[][],
  visited: Set<number>,
  useSides: boolean,
) {
  const char = input[position[1]][position[0]]
  const regionVisited = new Set<number>()
  const walls = Object.fromEntries<number[][]>(
    directions.map((d) => [d, []]),
  ) as Record<Direction, number[][]>
  const stack = new Stack<number[]>()
  let area = 0
  let perimeter = 0

  stack.push(position)
  regionVisited.add(get2DKey(position))

  while (!stack.empty()) {
    const current = stack.pop()!
    area++
    for (const d of directions) {
      const [x, y] = [
        current[0] + directionArray[d][0],
        current[1] + directionArray[d][1],
      ]

      if (
        input[y]?.[x] === undefined ||
        visited.has(get2DKey([x, y])) ||
        input[y]?.[x] !== char
      ) {
        perimeter++
        if (useSides) {
          walls[d].push([x, y])
        }
      } else if (!regionVisited.has(get2DKey([x, y]))) {
        regionVisited.add(get2DKey([x, y]))
        stack.push([x, y])
      }
    }
  }

  regionVisited.forEach((p) => visited.add(p))

  if (!useSides) {
    return area * perimeter
  }

  return area * getSidesCount(walls)
}

function getSidesCount(walls: Record<Direction, number[][]>) {
  let sides = 0
  for (const d of directions) {
    const main = d === 1 || d === 3 ? 0 : 1
    const other = d === 1 || d === 3 ? 1 : 0
    walls[d].sort((w1, w2) => w1[main] - w2[main])
    walls[d].sort((w1, w2) => w1[other] - w2[other])

    let prevMain = -2
    let prevOther = -2
    for (const wall of walls[d]) {
      if (
        prevMain === -2 ||
        prevOther !== wall[other] ||
        wall[main] - prevMain > 1
      ) {
        sides++
      }
      prevMain = wall[main]
      prevOther = wall[other]
    }
  }
  return sides
}

const part2 = (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""))
  return getTotalPrice(grid, true)
}

run({
  part1: {
    tests: [
      {
        input: `
        RRRRIICCFF
        RRRRIICCCF
        VVRRRCCFFF
        VVRCCCJFFF
        VVVVCJJCFE
        VVIVCCJJEE
        VVIIICJJEE
        MIIIIIJJEE
        MIIISIJEEE
        MMMISSJEEE
        `,
        expected: 1930,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        RRRRIICCFF
        RRRRIICCCF
        VVRRRCCFFF
        VVRCCCJFFF
        VVVVCJJCFE
        VVIVCCJJEE
        VVIIICJJEE
        MIIIIIJJEE
        MIIISIJEEE
        MMMISSJEEE
        `,
        expected: 1206,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
