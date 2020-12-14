import { getProviderFor } from './-private/get-provider-for';

export function inject(key, opts) {
  return function decorator() {
    return {
      get() {
        const fallback = opts ? opts.fallback : null;
        const provider = getProviderFor(this, key, fallback);

        return provider ? provider.value : fallback;
      },
    };
  };
}
