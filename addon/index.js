import { assert } from '@ember/debug';
import { LATEST_INSTANCE_MAP } from './component-manager/context';

const CONSUMER_TO_PROVIDER_MAP = new WeakMap();

export function inject(key) {
  return function decorator() {
    return {
      get() {
        let provider;

        if (!CONSUMER_TO_PROVIDER_MAP.get(this)?.get(key)) {
          provider = LATEST_INSTANCE_MAP.get(key);
          assert(`A ContextProvider with key ${key} must be an ancestor`, provider);

          if (!CONSUMER_TO_PROVIDER_MAP.has(this)) {
            CONSUMER_TO_PROVIDER_MAP.set(this, new Map());
          }

          CONSUMER_TO_PROVIDER_MAP.get(this).set(key, provider);
        } else {
          provider = CONSUMER_TO_PROVIDER_MAP.get(this).get(key);
        }

        return provider.value;
      },
    };
  };
}
