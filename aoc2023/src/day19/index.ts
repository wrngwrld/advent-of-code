import run from "aocrunner";

interface Workflow {
  name: string;
  rules: Rule[];
  endTarget: string;
}

interface Rule {
  valName: string;
  operation: (typeof operations)[">" | "<"];
  ruleValue: number;
  target: string;
}

const operations = {
  ">": (a: number, b: number) => a > b,
  "<": (a: number, b: number) => a < b,
};

interface Task {
  x: number;
  m: number;
  a: number;
  s: number;
  [key: string]: number;
}

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");

  const workFlowInput = input.slice(0, input.indexOf(""));
  const taskInput = input.slice(input.indexOf("") + 1);

  const workflows: Workflow[] = [];

  workFlowInput.forEach((line) => {
    let workflow: Workflow = {
      name: "",
      rules: [],
      endTarget: "",
    };

    workflow.name = line.split("{")[0].trim();
    line = line.split("{")[1].split("}")[0].trim();
    const rules = line.split(",");

    rules.forEach((rule) => {
      if (rule.includes(">")) {
        const valName = rule.split(">")[0].trim();
        const ruleValue = parseInt(rule.split(">")[1].trim());
        const operation = operations[">"];
        const target = rule.split(":")[1].trim();

        const newRule: Rule = {
          valName,
          operation,
          ruleValue,
          target: target,
        };

        workflow.rules.push(newRule);
      } else if (rule.includes("<")) {
        const valName = rule.split("<")[0].trim();
        const ruleValue = parseInt(rule.split("<")[1].trim());
        const operation = operations["<"];
        const target = rule.split(":")[1].trim();

        const newRule: Rule = {
          valName,
          operation,
          ruleValue,
          target: target,
        };

        workflow.rules.push(newRule);
      } else {
        workflow.endTarget = rule;
      }
    });

    workflows.push(workflow);
  });

  let accepted: Task[] = [];

  taskInput.forEach((line) => {
    line = line.split("{")[1].split("}")[0].trim();
    const task = line.split(",");

    const taskObj: Task = {
      x: parseInt(task[0].split("=")[1].trim()),
      m: parseInt(task[1].split("=")[1].trim()),
      a: parseInt(task[2].split("=")[1].trim()),
      s: parseInt(task[3].split("=")[1].trim()),
    };

    let nextWorkflow = "in";

    while (nextWorkflow) {
      if (nextWorkflow === "R") {
        break;
      }

      if (nextWorkflow === "A") {
        accepted.push(taskObj);
        break;
      }

      const workflow = workflows.find(
        (workflow) => workflow.name === nextWorkflow,
      );

      let newNextWorkflow = "";

      workflow?.rules.forEach((workflowRule) => {
        if (newNextWorkflow === "") {
          if (
            workflowRule.operation(
              taskObj[workflowRule.valName],
              workflowRule.ruleValue,
            )
          ) {
            newNextWorkflow = workflowRule.target;
          }
        }
      });

      if (newNextWorkflow === "") {
        newNextWorkflow = workflow?.endTarget ?? "";
      }
      nextWorkflow = newNextWorkflow;
    }
  });

  let sum = 0;

  accepted.forEach((task) => {
    let taskSum = task.x + task.m + task.a + task.s;
    sum += taskSum;
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
