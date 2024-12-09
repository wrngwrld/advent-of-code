import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const getDiskMap = (input: string[]) => {
  const diskMap = []
  let fileId = 0

  for (let i = 0; i < input.length; i += 2) {
    const fileLength = parseInt(input[i])

    const freeSpaceLength = parseInt(input[i + 1])

    for (let j = 0; j < fileLength; j++) {
      diskMap.push(fileId)
    }

    for (let j = 0; j < freeSpaceLength; j++) {
      diskMap.push(".")
    }

    fileId++
  }

  return diskMap
}

const calculateChecksum = (diskMap: (number | string)[]) => {
  let checksum = 0

  for (let i = 0; i < diskMap.length; i++) {
    if (diskMap[i] !== ".") {
      checksum += i * (diskMap[i] as number)
    }
  }

  return checksum
}

const findLeftmostSpan = (
  diskMap: (number | string)[],
  length: number,
): number | null => {
  for (let i = 0; i <= diskMap.length - length; i++) {
    if (diskMap.slice(i, i + length).every((block) => block === ".")) {
      return i
    }
  }
  return null
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("")

  const diskMap = getDiskMap(input)

  for (let i: number = diskMap.length - 1; i > 0; i--) {
    if (diskMap[i] !== ".") {
      const numberToMove = diskMap[i] as number

      const firstFreeSpaceIndex = diskMap.indexOf(".")

      if (firstFreeSpaceIndex > i) {
        break
      }

      diskMap[firstFreeSpaceIndex] = numberToMove
      diskMap[i] = "."
    }
  }

  return calculateChecksum(diskMap)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("")

  const diskMap = getDiskMap(input)

  for (let i: number = diskMap.length - 1; i > 0; i--) {
    if (diskMap[i] !== ".") {
      const numberToMove = diskMap[i]

      let fileSize = 0
      let running = true
      let index = i

      while (running) {
        if (diskMap[index] === numberToMove) {
          fileSize++
          index--
        } else {
          running = false
        }
      }

      i -= fileSize - 1

      const leftmostSpan = findLeftmostSpan(diskMap, fileSize)

      if (leftmostSpan !== null && leftmostSpan < i) {
        for (let i = 0; i < fileSize; i++) {
          diskMap[leftmostSpan + i] = numberToMove
          diskMap[index + i + 1] = "."
        }
      }
    }
  }

  return calculateChecksum(diskMap)
}

run({
  part1: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 1928,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 2858,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
