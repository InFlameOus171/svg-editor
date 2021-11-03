import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styles } from './styles';

@customElement('svg-editor')
export class SvgEditor extends LitElement {
  static styles = [styles];

  render() {
    return html`<editor-layout></editor-layout>`;
  }
}
