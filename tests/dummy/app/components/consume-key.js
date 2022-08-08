import Component from '@glimmer/component';
import { inject as context } from 'ember-context';

export default class ConsumeKeyComponent extends Component {
  @context('key', { fallback: 'fallback-value' }) value;
}
