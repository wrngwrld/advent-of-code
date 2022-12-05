const fs = require('fs');

const lines = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n\n')
  .map((x) => x.split('\n'))
  .map((x) => x.reduce((a, b) => parseInt(a) + parseInt(b)))
  .sort((a, b) => a - b);

sumTopThree = lines[lines.length - 1] + lines[lines.length - 2] + lines[lines.length - 3];

console.log(`Top elve: ${lines[lines.length - 1]} calories`);
console.log(`Top three elves: ${sumTopThree} calories`);
