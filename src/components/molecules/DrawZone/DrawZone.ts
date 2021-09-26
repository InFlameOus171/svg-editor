import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { drawZoneStyles } from './DrawZone.styles';

@customElement('draw-zone')
export class DrawZone extends LitElement {
  static styles = [drawZoneStyles];

  render() {
    return html`DrawZone`;
  }
}
