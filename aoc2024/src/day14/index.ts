import run from "aocrunner"

interface Position {
  x: number
  y: number
}

interface Robot {
  position: Position
  velocity: Position
}

const parseInput = (rawInput: string) => rawInput

const simulateRobots = (
  robots: Robot[],
  width: number,
  height: number,
): Robot[] => {
  robots.map((robot) => {
    robot.position.x = (robot.position.x + robot.velocity.x + width) % width
    robot.position.y = (robot.position.y + robot.velocity.y + height) % height
  })

  return robots
}

const part1 = (rawInput: string) => {
  let robots = parseInput(rawInput)
    .split("\n")
    .map((line) => {
      let position: Position = { x: 0, y: 0 }
      position.x = Number(line.split("p=")[1].split(" v=")[0].split(",")[0])
      position.y = Number(line.split("p=")[1].split(" v=")[0].split(",")[1])

      let velocity: Position = { x: 0, y: 0 }
      velocity.x = Number(line.split("v=")[1].split(",")[0])
      velocity.y = Number(line.split("v=")[1].split(",")[1])

      const robot: Robot = { position, velocity }

      return robot
    })

  const width = 101
  const height = 103

  for (let i = 0; i < 100; i++) {
    robots = simulateRobots(robots, width, height)
  }

  const midX = Math.floor(width / 2)
  const midY = Math.floor(height / 2)

  let quadrant1 = 0
  let quadrant2 = 0
  let quadrant3 = 0
  let quadrant4 = 0

  robots.forEach((robot) => {
    if (robot.position.x === midX || robot.position.y === midY) {
      return
    }

    if (robot.position.x > midX && robot.position.y < midY) {
      quadrant1++
    } else if (robot.position.x < midX && robot.position.y < midY) {
      quadrant2++
    } else if (robot.position.x < midX && robot.position.y > midY) {
      quadrant3++
    } else if (robot.position.x > midX && robot.position.y > midY) {
      quadrant4++
    }
  })

  const safetyFactor = quadrant1 * quadrant2 * quadrant3 * quadrant4

  return safetyFactor
}

function part2(input: string) {
  let robots = parseInput(input)
    .split("\n")
    .map((line) => {
      let position: Position = { x: 0, y: 0 }
      position.x = Number(line.split("p=")[1].split(" v=")[0].split(",")[0])
      position.y = Number(line.split("p=")[1].split(" v=")[0].split(",")[1])

      let velocity: Position = { x: 0, y: 0 }
      velocity.x = Number(line.split("v=")[1].split(",")[0])
      velocity.y = Number(line.split("v=")[1].split(",")[1])

      const robot: Robot = { position, velocity }

      return robot
    })

  const width = 101
  const height = 103

  let step = 0

  while (true) {
    step++

    robots = simulateRobots(robots, width, height)

    const positions = new Set(
      robots.map((robot) => `${robot.position.x},${robot.position.y}`),
    )

    // check if there is a solid 5x5 area
    // this should only happen if the christmas tree is there
    // that is a guess though
    for (const position of positions) {
      const [x, y] = position.split(",").map((num) => parseInt(num))
      let hasGroup = true

      for (let j = -2; j <= 2; j++) {
        for (let k = -2; k <= 2; k++) {
          if (!positions.has(`${x + k},${y + j}`)) {
            hasGroup = false
            break
          }
        }
        if (!hasGroup) break
      }

      if (hasGroup) return step
    }
  }
}

run({
  part1: {
    tests: [
      {
        input: `
          p=0,4 v=3,-3
          p=6,3 v=-1,-3
          p=10,3 v=-1,2
          p=2,0 v=2,-1
          p=0,0 v=1,3
          p=3,0 v=-2,-2
          p=7,6 v=-1,-3
          p=3,0 v=-1,-2
          p=9,3 v=2,3
          p=7,3 v=-1,2
          p=2,4 v=-2,-3
          p=9,5 v=-3,-3
        `,
        expected: 21,
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
