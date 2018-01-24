import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('number-to-words', 'Integration | Component | number to words', {
  integration: true
});

test('it renders words correct for well-formatted input', function(assert) {
  assert.expect(3);

  this.set('number', 0);
  this.render(hbs`{{number-to-words number=number}}`);
  assert.equal(this.$().text().trim(), 'zero');

  this.set('number', 123);
  assert.equal(this.$().text().trim(), 'one hundred and twenty three');

  this.set('number', 123456);
  assert.equal(this.$().text().trim(), 'one hundred and twenty three thousand four hundred and fifty six');
});
