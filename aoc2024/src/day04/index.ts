import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const directions = [
  [0, 1], // right
  [1, 0], // down
  [1, 1], // down-right
  [1, -1], // down-left
  [0, -1], // left
  [-1, 0], // up
  [-1, -1], // up-left
  [-1, 1], // up-right
]

const checkWord = (
  grid: string[][],
  x: number,
  y: number,
  dx: number,
  dy: number,
) => {
  const word = "XMAS"

  for (let i = 0; i < word.length; i++) {
    const nx = x + i * dx
    const ny = y + i * dy

    if (
      nx < 0 ||
      ny < 0 ||
      nx >= grid.length ||
      ny >= grid[0].length ||
      grid[nx][ny] !== word[i]
    ) {
      return false
    }
  }

  return true
}

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""))
  let count = 0

  grid.forEach((line, cIndex) => {
    line.forEach((_, rIndex) => {
      for (const [dx, dy] of directions) {
        if (checkWord(grid, rIndex, cIndex, dx, dy)) {
          count++
        }
      }
    })
  })

  return count
}

const checkXMAS = (grid: string[][], x: number, y: number) => {
  const patterns = [
    ["M", "", "M", "", "A", "", "S", "", "S"],
    ["M", "", "S", "", "A", "", "M", "", "S"],
    ["S", "", "M", "", "A", "", "S", "", "M"],
    ["S", "", "S", "", "A", "", "M", "", "M"],
  ]

  for (const pattern of patterns) {
    let match = true

    for (let i = 0; i < pattern.length; i++) {
      const nx = x + Math.floor(i / 3)
      const ny = y + (i % 3) - 1

      if (
        nx < 0 ||
        ny < 0 ||
        nx >= grid.length ||
        ny >= grid[0].length ||
        (grid[nx][ny] !== pattern[i] && pattern[i] !== "")
      ) {
        match = false
        break
      }
    }

    if (match) {
      return true
    }
  }
  return false
}

const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""))
  let count = 0

  grid.forEach((line, cIndex) => {
    line.forEach((_, rIndex) => {
      if (checkXMAS(grid, cIndex, rIndex)) {
        count++
      }
    })
  })

  return count
}

run({
  part1: {
    tests: [
      {
        input: `
          MMMSXXMASM
          MSAMXMSMSA
          AMXSXMAAMM
          MSAMASMSMX
          XMASAMXAMM
          XXAMMXXAMA
          SMSMSASXSS
          SAXAMASAAA
          MAMMMXMMMM
          MXMXAXMASX
        `,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          MMMSXXMASM
          MSAMXMSMSA
          AMXSXMAAMM
          MSAMASMSMX
          XMASAMXAMM
          XXAMMXXAMA
          SMSMSASXSS
          SAXAMASAAA
          MAMMMXMMMM
          MXMXAXMASX
        `,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
