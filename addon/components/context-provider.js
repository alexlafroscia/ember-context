import { setOwner } from '@ember/application';
import { setComponentManager } from '@ember/component';
import { tracked } from '@glimmer/tracking';
import ComponentManager from '../component-manager/context';

class ContextProviderComponent {
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
