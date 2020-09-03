import { assert } from '@ember/debug';
import { LATEST_INSTANCE_MAP } from './component-manager/context';

export function inject(key) {
  return function decorator() {
    return {
      get() {
        const provider = LATEST_INSTANCE_MAP.get(key);

        assert(`A ContextProvider with key ${key} must be an ancestor`, provider);

        return provider.value;
      },
    };
  };
}
