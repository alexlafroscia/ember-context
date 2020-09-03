import { setOwner } from '@ember/application';
import { setComponentManager } from '@ember/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import ComponentManager from '../component-manager/context';

const KEY = Symbol('Provider Key');

class ContextProviderComponent {
  // Internal storage of `key` value to ensure it doesn't change
  [KEY] = undefined;

  get key() {
    return this[KEY];
  }
  set key(value) {
    assert('`key` argument for ContextProvider cannot change', typeof this[KEY] === 'undefined');

    this[KEY] = value;
  }

  // Track the `value` so that the consumer automatically re-render on change
  @tracked value;

  constructor(owner, args) {
    setOwner(owner);

    this.key = args.key;
    this.value = args.value;
  }
}

export default setComponentManager(
  (owner) => new ComponentManager(owner),
  ContextProviderComponent
);
