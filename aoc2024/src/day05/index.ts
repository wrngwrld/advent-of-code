import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

interface PageOrderingRule {
  pageNumber: number
  rules: number
}

const isUpdateInRightOrder = (
  update: number[],
  pageOrderingRules: PageOrderingRule[],
) => {
  for (let i = 0; i < update.length - 1; i++) {
    const currentPage = update[i]

    const rules: number[] = pageOrderingRules
      .filter((rule) => rule.pageNumber === currentPage)
      .map((rule) => rule.rules)

    for (let j = i + 1; j < update.length; j++) {
      const nextPage = update[j]

      if (!rules?.includes(nextPage)) {
        return false
      }
    }
  }

  return true
}

const part1 = (rawInput: string) => {
  const [rulesSection, updatesSection] = parseInput(rawInput).split("\n\n")

  const pageOrderingRules: PageOrderingRule[] = rulesSection
    .split("\n")
    .map((rule) => {
      const [pageNumber, ruleString] = rule.split("|")
      return { pageNumber: Number(pageNumber), rules: Number(ruleString) }
    })

  const updates: number[][] = updatesSection.split("\n").map((update) => {
    return update.split(",").map(Number)
  })

  let sum = 0

  updates.forEach((update) => {
    if (isUpdateInRightOrder(update, pageOrderingRules)) {
      const middleIndex = Math.floor(update.length / 2)
      sum += update[middleIndex]
    }
  })

  return sum
}

const part2 = (rawInput: string) => {
  const [rulesSection, updatesSection] = parseInput(rawInput).split("\n\n")

  const pageOrderingRules: PageOrderingRule[] = rulesSection
    .split("\n")
    .map((rule) => {
      const [pageNumber, ruleString] = rule.split("|")
      return { pageNumber: Number(pageNumber), rules: Number(ruleString) }
    })

  const updates: number[][] = updatesSection.split("\n").map((update) => {
    return update.split(",").map(Number)
  })

  let sum = 0

  updates.forEach((update) => {
    if (!isUpdateInRightOrder(update, pageOrderingRules)) {
      update.sort((a, b) =>
        isUpdateInRightOrder([a, b], pageOrderingRules) ? -1 : 1,
      )

      const middleIndex = Math.floor(update.length / 2)
      sum += update[middleIndex]
    }
  })

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `
        47|53
        97|13
        97|61
        97|47
        75|29
        61|13
        75|53
        29|13
        97|29
        53|29
        61|53
        97|53
        61|29
        47|13
        75|47
        97|75
        47|61
        75|61
        47|29
        75|13
        53|13

        75,47,61,53,29
        97,61,53,29,13
        75,29,13
        75,97,47,61,53
        61,13,29
        97,13,75,29,47
        `,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        47|53
        97|13
        97|61
        97|47
        75|29
        61|13
        75|53
        29|13
        97|29
        53|29
        61|53
        97|53
        61|29
        47|13
        75|47
        97|75
        47|61
        75|61
        47|29
        75|13
        53|13

        75,47,61,53,29
        97,61,53,29,13
        75,29,13
        75,97,47,61,53
        61,13,29
        97,13,75,29,47
        `,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
