import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Coordinates } from '../../../types/types';
import { drawZoneStyles } from './DrawZone.styles';

@customElement('draw-zone')
export class DrawZone extends LitElement {
  @property({ type: Number })
  height: number = 0;

  @property({ type: Number })
  width: number = 0;

  @property({ type: String })
  onPositionChange?: (position?: Coordinates) => void;

  protected firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    const drawLayer = this?.shadowRoot?.getElementById(
      'draw-layer'
    ) as HTMLCanvasElement;

    const previewLayer = this?.shadowRoot?.getElementById('preview-layer') as
      | HTMLCanvasElement
      | undefined;

    drawLayer.addEventListener('mousemove', (event: MouseEvent) => {
      const rect = drawLayer.getBoundingClientRect();
      this.onPositionChange?.([
        event.clientX - rect.left,
        event.clientY - rect.top,
      ]);
    });

    drawLayer.addEventListener('mouseout', (event: MouseEvent) => {
      const rect = drawLayer.getBoundingClientRect();
      this.onPositionChange?.([0, 0]);
    });
  }

  static styles = [drawZoneStyles];
  render() {
    return html`<canvas
        id="draw-layer"
        height=${this.height}
        width=${this.width}
      ></canvas>
      <canvas
        id="preview-layer"
        height=${this.height}
        width=${this.width}
      ></canvas>`;
  }
}
