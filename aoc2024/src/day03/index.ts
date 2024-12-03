import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const pattern = /mul\(\d+,\d+\)/g
  const found = input.match(pattern)?.map((match) => {
    return match.replace("mul(", "").replace(")", "").split(",").map(Number)
  })

  let sum = 0

  found?.forEach((match) => {
    sum += match[0] * match[1]
  })

  return sum
}

interface Result {
  type: "mul" | "do" | "don't"
  value: number
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const pattern = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g
  const found: Result[] =
    input.match(pattern)?.map((match) => {
      if (match === "do()") {
        return { type: "do", value: 0 }
      }
      if (match === "don't()") {
        return { type: "don't", value: 0 }
      }
      const [a, b] = match
        .replace("mul(", "")
        .replace(")", "")
        .split(",")
        .map(Number)
      return { type: "mul", value: a * b }
    }) || []

  let allowed = true
  let sum = 0

  found.forEach((match) => {
    if (match.type === "do") {
      allowed = true
    } else if (match.type === "don't") {
      allowed = false
    } else if (allowed) {
      sum += match.value
    }
  })

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
