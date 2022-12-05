const fs = require('fs');

var totalSum = 0;

const lines = fs.readFileSync('input.txt', { encoding: 'utf-8' }).trim().split('\n');

lines.forEach((line) => {
  const partOne = line.slice(0, line.length / 2).split('');
  const partTwo = line.slice(line.length / 2, line.length).split('');

  totalSum += findSimilar(partOne, partTwo);
});

function findSimilar(partOne, partTwo) {
  var similar = 0;
  partOne.every((char) => {
    if (partTwo.includes(char)) {
      if (char == char.toUpperCase()) {
        similar = char.charCodeAt(0) - 38;
      } else {
        similar = char.charCodeAt(0) - 96;
      }

      return false;
    }

    return true;
  });

  return similar;
}

console.log(`Total sum (Part 1): ${totalSum}`);

function groupByThree(array) {
  var groups = [],
    i;
  for (i = 0; i < array.length; i += 3) {
    groups.push(array.slice(i, i + 3));
  }
  return groups;
}

var totalSumThree = 0;

groupByThree(lines).map((group) => {
  group = group.map((line) => {
    return line.split('');
  });

  totalSumThree += findSimilarInThree(group[0], group[1], group[2]);
});

function findSimilarInThree(partOne, partTwo, partThree) {
  var similar = 0;
  partOne.every((char) => {
    if (partTwo.includes(char)) {
      if (partThree.includes(char)) {
        if (char == char.toUpperCase()) {
          similar = char.charCodeAt(0) - 38;
        } else {
          similar = char.charCodeAt(0) - 96;
        }

        return false;
      }
    }

    return true;
  });

  return similar;
}

console.log(`Total sum (Part 2): ${totalSumThree}`);
