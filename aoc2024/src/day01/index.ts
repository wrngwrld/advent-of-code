import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((x) => x.split("  ").map(Number))

  const list1: number[] = []
  const list2: number[] = []

  input.forEach(([a, b]) => {
    list1.push(a)
    list2.push(b)
  })

  list1.sort((a, b) => a - b)
  list2.sort((a, b) => a - b)

  let sum = 0

  list1.map((x, index) => {
    if (x < list2[index]) {
      sum += list2[index] - x
    } else {
      sum += x - list2[index]
    }
  })

  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((x) => x.split("  "))

  const list1: number[] = []
  const list2: number[] = []

  input.forEach((x) => {
    list1.push(Number(x[0]))
    list2.push(Number(x[1]))
  })

  let similarityScore = 0

  list1.map((x) => {
    let amountFound = 0

    list2.map((y) => {
      if (x === y) amountFound += 1
    })

    similarityScore += x * amountFound
  })

  return similarityScore
}

run({
  part1: {
    tests: [
      {
        input: `
        3   4
        4   3
        2   5
        1   3
        3   9
        3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        3   4
        4   3
        2   5
        1   3
        3   9
        3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
