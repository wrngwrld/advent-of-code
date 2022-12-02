const fs = require('fs');

var totalScore = 0;

const lines = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .map((x) => x.split(' '));

lines.forEach((line) => {
  switch (line[0]) {
    case 'A':
      switch (line[1]) {
        case 'X':
          totalScore += 4;
          break;
        case 'Y':
          totalScore += 8;
          break;
        case 'Z':
          totalScore += 3;
          break;
      }
      break;
    case 'B':
      switch (line[1]) {
        case 'X':
          totalScore += 1;
          break;
        case 'Y':
          totalScore += 5;
          break;
        case 'Z':
          totalScore += 9;
          break;
      }
      break;
    case 'C':
      switch (line[1]) {
        case 'X':
          totalScore += 7;
          break;
        case 'Y':
          totalScore += 2;
          break;
        case 'Z':
          totalScore += 6;
          break;
      }
      break;
  }
});

console.log(`Total score (Part 1): ${totalScore}`);

totalScore = 0;

lines.forEach((line) => {
  switch (line[0]) {
    case 'A':
      switch (line[1]) {
        case 'X':
          totalScore += 3;
          break;
        case 'Y':
          totalScore += 4;
          break;
        case 'Z':
          totalScore += 8;
          break;
      }
      break;
    case 'B':
      switch (line[1]) {
        case 'X':
          totalScore += 1;
          break;
        case 'Y':
          totalScore += 5;
          break;
        case 'Z':
          totalScore += 9;
          break;
      }
      break;
    case 'C':
      switch (line[1]) {
        case 'X':
          totalScore += 2;
          break;
        case 'Y':
          totalScore += 6;
          break;
        case 'Z':
          totalScore += 7;
          break;
      }
      break;
  }
});

console.log(`Total score (Part 2): ${totalScore}`);
