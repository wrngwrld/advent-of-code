import run from "aocrunner"

enum Type {
  ascending,
  descending,
}

interface ReturnType {
  valid: boolean
  wrongIndex: number
}

const validateArray = (arr: number[], type: Type): ReturnType => {
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = Math.abs(arr[i] - arr[i + 1])

    if (
      diff < 1 ||
      diff > 3 ||
      (type === Type.ascending && arr[i] >= arr[i + 1]) ||
      (type === Type.descending && arr[i] <= arr[i + 1])
    ) {
      return { valid: false, wrongIndex: i }
    }
  }

  return { valid: true, wrongIndex: -1 }
}

const getType = (x: number, y: number): Type => {
  return x < y ? Type.ascending : Type.descending
}

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((x) => x.split(" ").map(Number))

  let sum = 0

  input.forEach((x) => {
    const type = getType(x[0], x[x.length - 1])
    const { valid } = validateArray(x, type)

    if (valid) {
      sum++
    }
  })

  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((x) => x.split(" ").map(Number))

  let sum = 0

  input.forEach((x) => {
    const type = getType(x[0], x[x.length - 1])
    let result = validateArray(x, type)

    if (!result.valid) {
      result.valid = x.some((_, i) => {
        const newReport = x.slice(0, i).concat(x.slice(i + 1))
        return validateArray(newReport, type).valid
      })
    }

    if (result.valid) {
      sum++
    }
  })

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `
        7 6 4 2 1
        1 2 7 8 9
        9 7 6 2 1
        1 3 2 4 5
        8 6 4 4 1
        1 3 6 7 9
        `,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
      7 6 4 2 1
      1 2 7 8 9
      9 7 6 2 1
      1 3 2 4 5
      8 6 4 4 1
      1 3 6 7 9
      `,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
