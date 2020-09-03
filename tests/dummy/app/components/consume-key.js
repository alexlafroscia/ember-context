import Component from '@glimmer/component';
import { inject as context } from '@alexlafroscia/ember-context';

export default class ConsumeKeyComponent extends Component {
  @context('key') value;
}
