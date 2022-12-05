const fs = require('fs');

var total = 0;
var total2 = 0;

const lines = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .map((x) => x.split(','))
  .map((x) => {
    x[0] = x[0].split('-');
    x[1] = x[1].split('-');

    var shifts = {
      elveOne: {
        start: parseInt(x[0][0]),
        end: parseInt(x[0][1]),
      },
      elveTwo: {
        start: parseInt(x[1][0]),
        end: parseInt(x[1][1]),
      },
    };

    if (
      (shifts.elveOne.start >= shifts.elveTwo.start && shifts.elveOne.end <= shifts.elveTwo.end) ||
      (shifts.elveOne.start <= shifts.elveTwo.start && shifts.elveOne.end >= shifts.elveTwo.end)
    ) {
      total += 1;
    }

    if (
      (shifts.elveOne.start >= shifts.elveTwo.start && shifts.elveOne.start <= shifts.elveTwo.end) ||
      (shifts.elveOne.end >= shifts.elveTwo.start && shifts.elveOne.end <= shifts.elveTwo.end) ||
      (shifts.elveTwo.start >= shifts.elveOne.start && shifts.elveTwo.start <= shifts.elveOne.end) ||
      (shifts.elveTwo.end >= shifts.elveOne.start && shifts.elveTwo.end <= shifts.elveOne.end)
    ) {
      total2 += 1;
    }
  });

console.log(`Total (Part 1): ${total}`);
console.log(`Total (Part 2): ${total2}`);
