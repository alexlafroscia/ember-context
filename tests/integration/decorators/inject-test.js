import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Decorators | inject', function (hooks) {
  setupRenderingTest(hooks);

  test('can inject a value from a consumer', async function (assert) {
    this.set('value', '1');

    await render(hbs`
      <ContextProvider @key="key" @value={{this.value}}>
        <ConsumeKey />
      </ContextProvider>
    `);

    assert.dom().hasText('1', 'Consumer retrieved the value from the Provider');

    this.set('value', '2');
    await settled();

    assert.dom().hasText('2', 'Consumer emits new value when Provider is updated');
  });

  test('can inject a fallback value from a consumer', async function (assert) {
    await render(hbs`
      <ConsumeKey />
    `);

    // `fallback-value` is the fallback value set in the `consume-key` component for these tests
    assert.dom().hasText('fallback-value', 'Consumer retrieved the value from the Provider');
  });

  test('can handle adjacent instances of a provider with the same key', async function (assert) {
    this.set('first', 'a');
    this.set('second', 'b');

    await render(hbs`
      <ContextProvider @key="key" @value={{this.first}}>
        <div data-test-first>
          <ConsumeKey />
        </div>
      </ContextProvider>

      <ContextProvider @key="key" @value={{this.second}}>
        <div data-test-second>
          <ConsumeKey />
        </div>
      </ContextProvider>
    `);

    assert.dom('[data-test-first]').hasText('a');
    assert.dom('[data-test-second]').hasText('b');

    this.set('first', 'c');
    await settled();

    assert.dom('[data-test-first]').hasText('c', 'First instance reads new value');
    assert.dom('[data-test-second]').hasText('b', 'Second instance still reads original value');
  });
});
