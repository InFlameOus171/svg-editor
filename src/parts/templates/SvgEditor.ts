import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('svg-editor')
export class SvgEditor extends LitElement {
  render() {
    return html`<editor-layout></editor-layout> `;
  }
}
