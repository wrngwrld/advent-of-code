import run from "aocrunner"

const processStones = (stones: number[], iterations: number): number => {
  let stoneMap = new Map()

  stones.forEach((stone) => {
    stoneMap.set(stone, (stoneMap.get(stone) || 0) + 1)
  })

  for (let i = 0; i < iterations; i++) {
    const newStoneMap = new Map()

    stoneMap.forEach((count, stone) => {
      if (stone === 0) {
        newStoneMap.set(1, (newStoneMap.get(1) || 0) + count)
      } else {
        const stoneStr = stone.toString()
        if (stoneStr.length % 2 === 0) {
          const mid = stoneStr.length / 2
          const part1 = Number(stoneStr.slice(0, mid))
          const part2 = Number(stoneStr.slice(mid))

          newStoneMap.set(part1, (newStoneMap.get(part1) || 0) + count)
          newStoneMap.set(part2, (newStoneMap.get(part2) || 0) + count)
        } else {
          const newStone = stone * 2024
          newStoneMap.set(newStone, (newStoneMap.get(newStone) || 0) + count)
        }
      }
    })

    stoneMap = newStoneMap
  }

  return Array.from(stoneMap.values()).reduce((sum, count) => sum + count, 0)
}

const part1 = (rawInput: string): number => {
  const input = rawInput.split(" ").map(Number)

  return processStones(input, 25)
}

const part2 = (rawInput: string): number => {
  const input = rawInput.split(" ").map(Number)

  return processStones(input, 75)
}

run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
