import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';
import { LATEST_INSTANCE_MAP } from '../component-manager/context';

export default helper(function contextConsumer([key]) {
  const provider = LATEST_INSTANCE_MAP.get(key);

  assert(`A ContextProvider with key ${key} must be an ancestor`, provider);

  return provider.value;
});
