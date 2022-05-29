import { getOwner, setOwner } from '@ember/application';
import { capabilities } from '@ember/component';
import { isEqual } from '@ember/utils';
import { assert } from '@ember/debug';

export const LATEST_INSTANCE_MAP = new Map();
export const LAST_CONTEXT_VALUE = new WeakMap();

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
    LAST_CONTEXT_VALUE.set(instance, key);

    return instance;
  }

  updateComponent(component, { named: { key, value } }) {
    assert('`key` argument for ContextProvider cannot change', component.key === key);

    const lastValue = LAST_CONTEXT_VALUE.get(component);

    if (!isEqual(lastValue, value)) {
      LAST_CONTEXT_VALUE.set(component, value);
      component.value = value;
    }
  }

  destroyComponent(component) {
    const { key } = component;

    // Delete the entry from the map if the component is within it
    if (LATEST_INSTANCE_MAP.get(key) === component) {
      LATEST_INSTANCE_MAP.delete(key);
    }
  }

  getContext(/* component */) {
    // No context necessary; no template for component
  }
}
