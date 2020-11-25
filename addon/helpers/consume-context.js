import Helper from '@ember/component/helper';
import { getProviderFor } from '../-private/get-provider-for';

export default class ContextConsumerHelper extends Helper {
  compute([key], { fallback }) {
    const provider = getProviderFor(this, key, fallback);

    return provider ? provider.value : fallback;
  }
}
