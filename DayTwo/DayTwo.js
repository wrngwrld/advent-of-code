const fs = require("fs");

const lines = fs.readFileSync("input.txt", { encoding: "utf-8" }).split("\n");

let horizontal = 0;
let depth = 0;

lines.forEach((line) => {
  let splitLine = line.split(" ");

  switch (splitLine[0]) {
    case "forward":
      horizontal = +horizontal + +splitLine[1];

      break;
    case "down":
      depth = +depth + +splitLine[1];

      break;
    case "up":
      depth = +depth - +splitLine[1];

      break;
  }
});

let answer = horizontal * depth;

console.log(answer);

horizontal = 0;
depth = 0;
let aim = 0;

lines.forEach((line) => {
  let splitLine = line.split(" ");

  switch (splitLine[0]) {
    case "forward":
      horizontal = +horizontal + +splitLine[1];
      depth = +depth + +aim * +splitLine[1];

      break;
    case "down":
      aim = +aim + +splitLine[1];

      break;
    case "up":
      aim = +aim - +splitLine[1];

      break;
  }
});

answer = horizontal * depth;

console.log(answer);
