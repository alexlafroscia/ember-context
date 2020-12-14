import Helper from '@ember/component/helper';
import { getProviderFor } from '../-private/get-provider-for';

export default class ContextConsumerHelper extends Helper {
  compute([key], opts) {
    const fallback = opts ? opts.fallback : null;
    const provider = getProviderFor(this, key, fallback);

    return provider ? provider.value : fallback;
  }
}
