import run from "aocrunner"

interface Machine {
  ax: number
  ay: number
  bx: number
  by: number
  px: number
  py: number
}

const parseInput = (rawInput: string, prizeMultiplier: number = 0): Machine[] =>
  rawInput
    .trim()
    .split("\n\n")
    .map((machine) => {
      const lines = machine.split("\n")

      const [ax, ay] = lines[0]
        .split(": ")[1]
        .split(", ")
        .map((l) => l.split("+")[1])
        .map(Number)
      const [bx, by] = lines[1]
        .split(": ")[1]
        .split(", ")
        .map((l) => l.split("+")[1])
        .map(Number)
      const [px, py] = lines[2]
        .split(": ")[1]
        .split(", ")
        .map((l) => l.split("=")[1])
        .map(Number)
        .map((x) => x + prizeMultiplier)

      return { ax, ay, bx, by, px, py }
    })

const part1 = (rawInput: string) => {
  const machines: Machine[] = parseInput(rawInput)
  let totalTokens = 0
  let prizesWon = 0

  for (const machine of machines) {
    let minTokens = Infinity

    for (let a = 0; a <= 100; a++) {
      for (let b = 0; b <= 100; b++) {
        if (
          a * machine.ax + b * machine.bx === machine.px &&
          a * machine.ay + b * machine.by === machine.py
        ) {
          const tokens = a * 3 + b
          if (tokens < minTokens) {
            minTokens = tokens
          }
        }
      }
    }

    if (minTokens < Infinity) {
      totalTokens += minTokens
      prizesWon++
    }
  }

  return totalTokens
}

const part2 = (rawInput: string) => {
  const machines: Machine[] = parseInput(rawInput, 10000000000000)

  return machines.reduce((sum, machine) => {
    const b =
      (machine.ax * machine.py - machine.ay * machine.px) /
      (machine.ax * machine.by - machine.ay * machine.bx)
    const a = (machine.px - machine.bx * b) / machine.ax

    return sum + (a % 1 === 0 && b % 1 === 0 ? a * 3 + b : 0)
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `
          Button A: X+94, Y+34
          Button B: X+22, Y+67
          Prize: X=8400, Y=5400

          Button A: X+26, Y+66
          Button B: X+67, Y+21
          Prize: X=12748, Y=12176

          Button A: X+17, Y+86
          Button B: X+84, Y+37
          Prize: X=7870, Y=6450

          Button A: X+69, Y+23
          Button B: X+27, Y+71
          Prize: X=18641, Y=10279
        `,
        expected: 480,
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
