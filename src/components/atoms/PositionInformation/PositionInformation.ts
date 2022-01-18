import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Coordinates } from '../../../types/types';
import { positionInformationStyles } from './PositionInformation.styles';

@customElement('position-information')
export class PositionInformation extends LitElement {
  @property({ type: Array })
  position?: Coordinates;

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
