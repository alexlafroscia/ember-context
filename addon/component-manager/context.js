import { getOwner, setOwner } from '@ember/application';
import { capabilities } from '@ember/component';
import { assert } from '@ember/debug';

export const LATEST_INSTANCE_MAP = new Map();

export default class ContextComponentManager {
  capabilities = capabilities('3.13', {
    destructor: true,
    asyncLifecycleCallbacks: false,
    updateHook: true,
  });

  constructor(owner) {
    setOwner(this, owner);
  }

  createComponent(ComponentClass, { named: { key, value } }) {
    const instance = new ComponentClass(getOwner(this), { key, value });

    LATEST_INSTANCE_MAP.set(key, instance);

    return instance;
  }

  updateComponent(component, { named: { key, value } }) {
    assert('`key` argument for ContextProvider cannot change', component.key === key);

    component.value = value;
  }

  destroyComponent(/* component */) {
    // Nothing to clean up
  }

  getContext(/* component */) {
    // No context necessary; no template for component
  }
}
