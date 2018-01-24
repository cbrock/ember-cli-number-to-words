import Component from '@ember/component';
import layout from '../templates/components/number-to-words';
import { computed } from '@ember/object';

const UP_TO_TWENTY = [
  null, 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];

const TENS = [
  null, null, 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

const SCALES = [
  null, 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion','decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quattuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'
];

function toWords (num) {
  // TODO handle leading zeroes
  if (typeof num !== 'number') {
    num = Number(num, 10);
    if (!Number.isInteger(num)) {
      throw new TypeError('Argument is not a number, and cannot be converted to one');
    }
  }

  if (num === 0) {
    return 'zero';
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

  // TODO: Determine if additional "and" is needed?

  let combined = [];
  words.forEach((chunk, i) => {
    if (chunk !== 0) {
      combined.unshift(chunk, SCALES[i]);
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
  } else if (tens !== 0) {
    words.push(UP_TO_TWENTY[tensUnits]);
  }

  return words.join(' ');
}


export default Component.extend({
  layout,
  number: 123,
  words: computed('number', function() {
    // TODO import `ember-cli-string-helpers` to access `htmlSafe()`
    return toWords(this.get('number'));
  })
});