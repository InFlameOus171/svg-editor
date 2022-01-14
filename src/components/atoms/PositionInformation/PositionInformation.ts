import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { positionInformationStyles } from './PositionInformation.styles';

@customElement('position-information')
export class PositionInformation extends LitElement {
  @property({ type: Array })
  position?: [number, number];

  static styles = [positionInformationStyles];

  render = () => {
    return html`<span id="position"
      >${'x: ' +
      (this.position?.[0] ?? 0) +
      ' - y: ' +
      (this.position?.[1] ?? 0)}</span
    >`;
  };
}
