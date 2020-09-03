import { assert } from '@ember/debug';
import { LATEST_INSTANCE_MAP } from '../component-manager/context';

const CONSUMER_TO_PROVIDER_MAP = new WeakMap();

export function getProviderFor(object, key) {
  let provider;

  // Set up an object -> key -> provider relationship if it doesn't already exist
  if (!CONSUMER_TO_PROVIDER_MAP.get(object)?.get(key)) {
    provider = LATEST_INSTANCE_MAP.get(key);
    assert(`A ContextProvider with key ${key} must be an ancestor`, provider);

    // Add a map for key -> provider for an object if we have not already
    if (!CONSUMER_TO_PROVIDER_MAP.has(object)) {
      CONSUMER_TO_PROVIDER_MAP.set(object, new Map());
    }

    CONSUMER_TO_PROVIDER_MAP.get(object).set(key, provider);
  } else {
    provider = CONSUMER_TO_PROVIDER_MAP.get(object).get(key);
  }

  return provider;
}
