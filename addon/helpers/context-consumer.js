import Helper from '@ember/component/helper';
import { getProviderFor } from '../-private/get-provider-for';

export default class ContextConsumerHelper extends Helper {
  compute([key]) {
    const provider = getProviderFor(this, key);

    return provider.value;
  }
}
