import { getProviderFor } from './-private/get-provider-for';

export function inject(key) {
  return function decorator() {
    return {
      get() {
        const provider = getProviderFor(this, key);

        return provider.value;
      },
    };
  };
}
