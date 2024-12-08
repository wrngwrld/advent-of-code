import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput
    .trim()
    .split("\n")
    .map((line) => line.split(""))

const collectAntennas = (map: string[][]) => {
  const antennas: { [key: string]: [number, number][] } = {}
  const rows = map.length
  const cols = map[0].length

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const char = map[r][c]
      if (char !== ".") {
        if (!antennas[char]) {
          antennas[char] = []
        }
        antennas[char].push([r, c])
      }
    }
  }

  return antennas
}

const calculateAntinodesPart1 = (
  positions: [number, number][],
  rows: number,
  cols: number,
  antinodes: Set<string>,
) => {
  const len = positions.length

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const [r1, c1] = positions[i]
      const [r2, c2] = positions[j]

      // Calculate potential antinode positions
      const candidates = [
        [r1 + 2 * (r2 - r1), c1 + 2 * (c2 - c1)],
        [r2 + 2 * (r1 - r2), c2 + 2 * (c1 - c2)],
      ]

      for (const [rAntinode, cAntinode] of candidates) {
        if (
          rAntinode >= 0 &&
          rAntinode < rows &&
          cAntinode >= 0 &&
          cAntinode < cols
        ) {
          antinodes.add(`${rAntinode},${cAntinode}`)
        }
      }
    }
  }
}

const part1 = (rawInput: string) => {
  const map = parseInput(rawInput)
  const rows = map.length
  const cols = map[0].length

  const antennas = collectAntennas(map)
  const antinodes = new Set<string>()

  for (const positions of Object.values(antennas)) {
    calculateAntinodesPart1(positions, rows, cols, antinodes)
  }

  return antinodes.size
}

const calculateAntinodesPart2 = (
  positions: [number, number][],
  rows: number,
  cols: number,
  antinodes: Set<string>,
) => {
  const len = positions.length

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const [r1, c1] = positions[i]
      const [r2, c2] = positions[j]
      const dr = r2 - r1
      const dc = c2 - c1

      // Generate all antinodes along the line defined by two antennas
      for (let k = -1; k <= 1; k += 2) {
        let rAntinode = r1 + k * dr
        let cAntinode = c1 + k * dc

        while (
          rAntinode >= 0 &&
          rAntinode < rows &&
          cAntinode >= 0 &&
          cAntinode < cols
        ) {
          antinodes.add(`${rAntinode},${cAntinode}`)
          rAntinode += k * dr
          cAntinode += k * dc
        }
      }
    }
  }

  // Include antenna positions as antinodes if applicable
  if (len > 1) {
    for (const [r, c] of positions) {
      antinodes.add(`${r},${c}`)
    }
  }
}

const part2 = (rawInput: string) => {
  const map = parseInput(rawInput)
  const rows = map.length
  const cols = map[0].length

  const antennas = collectAntennas(map)
  const antinodes = new Set<string>()

  for (const positions of Object.values(antennas)) {
    calculateAntinodesPart2(positions, rows, cols, antinodes)
  }

  return antinodes.size
}

run({
  part1: {
    tests: [
      {
        input: `
        ............
        ........0...
        .....0......
        .......0....
        ....0.......
        ......A.....
        ............
        ............
        ........A...
        .........A..
        ............
        ............
        `,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        ............
        ........0...
        .....0......
        .......0....
        ....0.......
        ......A.....
        ............
        ............
        ........A...
        .........A..
        ............
        ............
        `,
        expected: 34,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
