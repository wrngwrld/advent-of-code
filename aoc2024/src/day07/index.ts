import run from "aocrunner"

interface Line {
  testValue: number
  values: number[]
}

const parseInput = (rawInput: string): Line[] =>
  rawInput.split("\n").map((line) => {
    const [testValue, values] = line.split(": ")
    return {
      testValue: parseInt(testValue),
      values: values.split(" ").map((value) => parseInt(value)),
    }
  })

const generateOperatorCombinations = (
  length: number,
  operators: string[],
): string[][] => {
  const combinations: string[][] = []
  const totalCombinations = Math.pow(operators.length, length)

  for (let i = 0; i < totalCombinations; i++) {
    const combination: string[] = []
    let num = i

    for (let j = 0; j < length; j++) {
      combination.push(operators[num % operators.length])
      num = Math.floor(num / operators.length)
    }

    combinations.push(combination)
  }

  return combinations
}

const evaluateExpression = (values: number[], operators: string[]): number => {
  let result = values[0]

  operators.forEach((operator, i) => {
    if (operator === "+") {
      result += values[i + 1]
    } else if (operator === "*") {
      result *= values[i + 1]
    } else if (operator === "||") {
      result = parseInt(result.toString() + values[i + 1].toString())
    }
  })

  return result
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let sum = 0

  input.forEach(({ testValue, values }) => {
    const operatorCombinations = generateOperatorCombinations(
      values.length - 1,
      ["+", "*"],
    )

    const possibleValues = operatorCombinations.map((operators) =>
      evaluateExpression(values, operators),
    )

    if (possibleValues.includes(testValue)) {
      sum += testValue
    }
  })

  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let sum = 0

  input.forEach(({ testValue, values }) => {
    const operatorCombinations = generateOperatorCombinations(
      values.length - 1,
      ["+", "*", "||"],
    )

    const possibleValues = operatorCombinations.map((operators) =>
      evaluateExpression(values, operators),
    )

    if (possibleValues.includes(testValue)) {
      sum += testValue
    }
  })

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `
        190: 10 19
        3267: 81 40 27
        83: 17 5
        156: 15 6
        7290: 6 8 6 15
        161011: 16 10 13
        192: 17 8 14
        21037: 9 7 18 13
        292: 11 6 16 20
        `,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        190: 10 19
        3267: 81 40 27
        83: 17 5
        156: 15 6
        7290: 6 8 6 15
        161011: 16 10 13
        192: 17 8 14
        21037: 9 7 18 13
        292: 11 6 16 20
        `,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
