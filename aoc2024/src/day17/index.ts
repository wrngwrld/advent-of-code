import run from "aocrunner"

interface Instruction {
  opcode: number
  operand: number
}

interface Program {
  registerA: number
  registerB: number
  registerC: number
  instructions: Instruction[]
}

const parseInput = (rawInput: string) => {
  const lines = rawInput.trim().split("\n")

  const registerA = Number(lines[0].split(": ")[1])
  const registerB = Number(lines[1].split(": ")[1])
  const registerC = Number(lines[2].split(": ")[1])

  let instructions: Instruction[] = []

  const numbers = lines[4].split(": ")[1].split(",")

  for (let i = 0; i < numbers.length; i += 2) {
    instructions.push({
      opcode: Number(numbers[i]),
      operand: Number(numbers[i + 1]),
    })
  }

  return {
    registerA,
    registerB,
    registerC,
    instructions,
  }
}

const getComboOperands = (
  instruction: Instruction,
  { registerA, registerB, registerC }: Program,
): number => {
  switch (instruction.operand) {
    case 0:
    case 1:
    case 2:
    case 3:
      return instruction.operand
    case 4:
      return registerA
    case 5:
      return registerB
    case 6:
      return registerC
    default:
      return 0
  }
}

const part1 = (rawInput: string): string => {
  const program = parseInput(rawInput)
  let instructionPointer = 0
  let output = ""

  while (instructionPointer < program.instructions.length) {
    const instruction = program.instructions[instructionPointer]
    let operand = 0

    switch (instruction.opcode) {
      case 0:
        operand = getComboOperands(instruction, program)
        program.registerA = Math.floor(program.registerA / Math.pow(2, operand))
        break
      case 1:
        program.registerB ^= instruction.operand
        break
      case 2:
        operand = getComboOperands(instruction, program)
        program.registerB = operand % 8
        break
      case 3:
        if (program.registerA !== 0) {
          instructionPointer = instruction.operand
          continue
        }
        break
      case 4:
        program.registerB ^= program.registerC
        break
      case 5:
        operand = getComboOperands(instruction, program)
        const outputValue = operand % 8
        output += output.length > 0 ? `,${outputValue}` : `${outputValue}`
        break
      case 6:
        operand = getComboOperands(instruction, program)
        program.registerB = Math.floor(program.registerA / Math.pow(2, operand))
        break
      case 7:
        operand = getComboOperands(instruction, program)
        program.registerC = Math.floor(program.registerA / Math.pow(2, operand))
        break
    }

    instructionPointer++
  }

  return output
}

run({
  part1: {
    tests: [
      {
        input: `
          Register A: 729
          Register B: 0
          Register C: 0

          Program: 0,1,5,4,3,0
        `,
        expected: "4,6,3,5,6,3,5,2,1,0",
      },
    ],
    solution: part1,
  },
  trimTestInputs: true,
  onlyTests: false,
})
