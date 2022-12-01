const fs = require("fs");

var numOfInc = 0;

const lines = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x))
  .map((x) => parseInt(x));

for (let i = 1; i < lines.length; i++) {
  let previous = lines[i - 1];
  let current = lines[i];

  if (current > previous) {
    numOfInc++;
  }
}

console.log(numOfInc);

numOfInc = 0;

for (let i = 3; i < lines.length; i++) {
  let previous = lines[i - 1] + lines[i - 2] + lines[i - 3];
  let current = lines[i] + lines[i - 1] + lines[i - 2];

  if (current > previous) {
    numOfInc++;
  }
}

console.log(numOfInc);
