import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('number-to-words', 'Integration | Component | number to words', {
  integration: true
});

test('it renders words correctly given integer input', function(assert) {
  assert.expect(7);

  this.set('number', 0);
  this.render(hbs`{{number-to-words number=number}}`);
  assert.equal(this.$().text().trim(), 'zero');

  this.set('number', 5);
  this.render(hbs`{{number-to-words number=number}}`);
  assert.equal(this.$().text().trim(), 'five');

  this.set('number', 13);
  assert.equal(this.$().text().trim(), 'thirteen');

  this.set('number', 107);
  assert.equal(this.$().text().trim(), 'one hundred and seven');

  this.set('number', 123);
  assert.equal(this.$().text().trim(), 'one hundred and twenty three');

  this.set('number', 123456);
  assert.equal(this.$().text().trim(), 'one hundred and twenty three thousand four hundred and fifty six');

  this.set('number', -123456);
  assert.equal(this.$().text().trim(), 'negative one hundred and twenty three thousand four hundred and fifty six');
});

test('it renders words correctly given eger input', function(assert) {
  assert.expect(4);

  this.set('number', '0');
  this.render(hbs`{{number-to-words number=number}}`);
  assert.equal(this.$().text().trim(), 'zero');

  this.set('number', '5');
  this.render(hbs`{{number-to-words number=number}}`);
  assert.equal(this.$().text().trim(), 'five');

  this.set('number', '123');
  assert.equal(this.$().text().trim(), 'one hundred and twenty three');

  this.set('number', '123456');
  assert.equal(this.$().text().trim(), 'one hundred and twenty three thousand four hundred and fifty six');
});
