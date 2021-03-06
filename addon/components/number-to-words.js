import Component from '@ember/component';
import layout from '../templates/components/number-to-words';
import { computed } from '@ember/object';
import { UP_TO_TWENTY, TENS, SCALES } from '../lib/number-names'

function toWords (num) {
  // TODO handle leading zeroes
  if (typeof num !== 'number') {
    num = Number(num);
    if (!Number.isInteger(num)) {
      throw new TypeError('Argument is not a number, and cannot be converted to one');
    }
  }

  if (num === 0) {
    return 'zero';
  }

  if (num > 0 && num < 20) {
    return UP_TO_TWENTY[num];
  }

  // handle negative numbers
  // if `isNegative`, we'll add the word "negative" to the resulting string
  const isNegative = Math.sign(num) === -1;
  num = isNegative ? Math.abs(num) : num;

  // break up `num` into 3 digit chunks
  let chunks = [];
  while (num) {
    chunks.push(num % 1000);
    num = Math.floor(num / 1000);
  }

  // process each `chunk`
  const words = chunks.map(chunk => chunkToWords(chunk));

  const combined = [];
  // for numbers like `10001` we need to insert an additional "and" during the thousands cycle
  let andFlag = chunks[0] > 0 && chunks[0] < 100;
  words.forEach((chunk, i) => {
    if (chunk !== 0) {
      combined.unshift(chunk, SCALES[i]);
      if (andFlag && words.length > 1) {
        combined.unshift('and');
        andFlag = false;
      }
    }
  });

  if (isNegative) {
    combined.unshift('negative');
  }
  return combined.join(' ');
}

function chunkToWords (num) {
  const words = [];
  const hundreds = Math.floor(num / 100);
  const tensUnits = num % 100;

  if (hundreds !== 0) {
    words.push(UP_TO_TWENTY[hundreds], 'hundred');
    if (tensUnits !== 0) {
      words.push('and');
    }
  }

  const tens = Math.floor(tensUnits / 10);
  const units = tensUnits % 10;

  if (tens >= 2) {
    words.push(TENS[tens]);
    if (units !== 0) {
      words.push(UP_TO_TWENTY[units]);
    }
  } else if (tensUnits !== 0) {
    words.push(UP_TO_TWENTY[tensUnits]);
  }

  return words.join(' ');
}


export default Component.extend({
  layout,
  number: null,
  words: computed('number', function() {
    // TODO import `ember-cli-string-helpers` to access `htmlSafe()`
    return toWords(this.get('number'));
  })
});