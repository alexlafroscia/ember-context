import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';
import { LATEST_INSTANCE_MAP } from '../component-manager/context';

export default class ContextConsumerHelper extends Helper {
  provider = undefined;

  compute([key]) {
    if (!this.provider) {
      this.provider = LATEST_INSTANCE_MAP.get(key);
      assert(`A ContextProvider with key ${key} must be an ancestor`, this.provider);
    }

    return this.provider.value;
  }
}
