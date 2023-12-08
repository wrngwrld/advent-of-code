import run from "aocrunner";
import { log } from "console";

interface Node {
  name: string;
  instructions: string[];
}

const parseNode = (node: string): Node => {
  const [name, instructions] = node.split(" = ");
  return {
    name,
    instructions: instructions
      .split(",")
      .map((instruction) => instruction.replace(/[()]/g, "").trim()),
  };
};

const findStartingIndexes = (nodes: Node[]): number[] => {
  return nodes.reduce((indexes, node, index) => {
    if (node.name.endsWith("A")) {
      indexes.push(index);
    }
    return indexes;
  }, [] as number[]);
};

const gcd = (a: number, b: number): number => {
  if (b === 0) return a;

  return gcd(b, a % b);
};

const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

const lcmOfArray = (arr: number[]): number => {
  let result = arr[0];

  for (let i = 1; i < arr.length; i++) {
    result = lcm(result, arr[i]);
  }

  return result;
};

const getNodeInstructions = (node: Node, direction: string) =>
  node.instructions[direction === "L" ? 0 : 1];

const findNodeIndex = (nodes: Node[], nodeName: string) =>
  nodes.findIndex((n) => n.name === nodeName);

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const directions = input.split("\n\n")[0].split("");
  const nodes: Node[] = input.split("\n\n")[1].split("\n").map(parseNode);

  let steps = 0;
  let currentNodeIndex = findNodeIndex(nodes, "AAA");
  let found = false;
  let directionIndex = 0;

  while (!found) {
    const currentNode = nodes[currentNodeIndex];
    const nodeInstructions = getNodeInstructions(
      currentNode,
      directions[directionIndex],
    );

    currentNodeIndex = findNodeIndex(nodes, nodeInstructions);

    found = nodeInstructions === "ZZZ";

    directionIndex = (directionIndex + 1) % directions.length;

    steps++;
  }

  return steps;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const directions = input.split("\n\n")[0].split("");
  const nodes: Node[] = input.split("\n\n")[1].split("\n").map(parseNode);

  let startingIndexes = findStartingIndexes(nodes);
  let foundNodes: boolean[] = Array(startingIndexes.length).fill(false);
  let stepsToFindNodes: number[] = Array(startingIndexes.length).fill(0);
  let directionIndex = 0;

  while (foundNodes.filter(Boolean).length < startingIndexes.length) {
    startingIndexes.forEach((startIndex, index) => {
      if (!foundNodes[index]) {
        const currentNode = nodes[startIndex];
        const nodeInstructions = getNodeInstructions(
          currentNode,
          directions[directionIndex],
        );

        startingIndexes[index] = findNodeIndex(nodes, nodeInstructions);

        foundNodes[index] = nodeInstructions.endsWith("Z");

        stepsToFindNodes[index] += 1;
      }
    });

    directionIndex = (directionIndex + 1) % directions.length;
  }

  return lcmOfArray(stepsToFindNodes);
};

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
