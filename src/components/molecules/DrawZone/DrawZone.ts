import { SVG } from '@svgdotjs/svg.js';
import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { NullableNumber } from '../../../types/types';
import { drawZoneStyles } from './DrawZone.styles';

@customElement('draw-zone')
export class DrawZone extends LitElement {
  constructor() {
    super();
    new ResizeObserver(this.#updateResize).observe(this);
  }

  static styles = [drawZoneStyles];

  @property({ type: Number })
  mouseX: NullableNumber = null;

  @property({ type: Number })
  mouseY: NullableNumber = null;

  @state()
  width: NullableNumber = null;

  @state()
  height: NullableNumber = null;

  @property()
  onPositionChange:
    | ((value: {
        xPosition: NullableNumber;
        yPosition: NullableNumber;
      }) => void)
    | undefined;

  @property()
  openedFile?: string = '';

  setCurrentMousePosition = (event: MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const xPosition = event.clientX - rect.left;
    const yPosition = event.clientY - rect.top;
    this.onPositionChange?.({ xPosition, yPosition });
  };

  cancelDrawMode = () => {
    this.onPositionChange?.({ xPosition: null, yPosition: null });
  };

  #updateResize = () => {
    this.width = parseFloat(getComputedStyle(this).getPropertyValue('width'));
    this.height = parseFloat(getComputedStyle(this).getPropertyValue('height'));
  };

  updated = (changedProperties: PropertyValues) => {
    if (changedProperties.has('openedFile')) {
      const containerElement = this.shadowRoot?.getElementById('drawzone');
      if (this.openedFile && containerElement) {
        if (containerElement.innerHTML) {
          containerElement.innerHTML = '';
        }
        const svgData = SVG(containerElement);
        svgData.svg(this.openedFile);
      }
    }
  };

  render() {
    return html`<div
      id="drawzone"
      @mousemove=${this.setCurrentMousePosition}
      @mouseout=${this.cancelDrawMode}
      @blur=${this.cancelDrawMode}
    ></div>`;
  }
}
