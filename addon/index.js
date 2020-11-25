import { getProviderFor } from './-private/get-provider-for';

export function inject(key, { fallback }) {
  return function decorator() {
    return {
      get() {
        const provider = getProviderFor(this, key, fallback);

        return provider ? provider.value : fallback;
      },
    };
  };
}
