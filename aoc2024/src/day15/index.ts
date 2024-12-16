import run from "aocrunner"

interface Position {
  x: number
  y: number
}

const parseInput = (rawInput: string) => {
  const [map, moves] = rawInput.trim().split("\n\n")
  return {
    map: map.split("\n").map((line) => line.split("")),
    moves: moves.replace(/\n/g, "").split(""),
  }
}

const directions: { [key: string]: [number, number] } = {
  "^": [-1, 0],
  v: [1, 0],
  "<": [0, -1],
  ">": [0, 1],
}

const getGPS = (x: number, y: number) => 100 * x + y

const getInitialPosition = (map: string[][]): Position => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === "@") {
        return { x: i, y: j }
      }
    }
  }

  return { x: 0, y: 0 }
}

const part1 = (rawInput: string) => {
  let { map, moves } = parseInput(rawInput)

  let position = getInitialPosition(map)

  moves.forEach((move) => {
    const [dx, dy] = directions[move]

    const nextX = position.x + dx
    const nextY = position.y + dy

    if (map[nextX][nextY] === ".") {
      map[nextX][nextY] = "@"
      map[position.x][position.y] = "."
      position.x = nextX
      position.y = nextY
    } else if (map[nextX][nextY] === "O") {
      let nextOX = nextX
      let nextOY = nextY
      while (map[nextOX][nextOY] === "O") {
        nextOX += dx
        nextOY += dy
      }

      if (map[nextOX][nextOY] === ".") {
        map[nextOX][nextOY] = "O"
        map[nextX][nextY] = "@"
        map[position.x][position.y] = "."
        position.x = nextX
        position.y = nextY
      }
    }
  })

  let sumGPS = 0

  map.forEach((line, i) => {
    line.forEach((cell, j) => {
      if (cell === "O") {
        sumGPS += getGPS(i, j)
      }
    })
  })

  return sumGPS
}

const part2 = (input: string) => {}

run({
  part1: {
    tests: [
      {
        input: `
        ##########
        #..O..O.O#
        #......O.#
        #.OO..O.O#
        #..O@..O.#
        #O#..O...#
        #O..O..O.#
        #.OO.O.OO#
        #....O...#
        ##########

        <vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
        vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
        ><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
        <<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
        ^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
        ^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
        >^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
        <><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
        ^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
        v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^
        `,
        expected: 10092,
      },
    ],
    solution: part1,
  },
  part2: {
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
