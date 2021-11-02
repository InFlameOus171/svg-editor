import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { drawZoneStyles } from './DrawZone.styles';

@customElement('draw-zone')
export class DrawZone extends LitElement {
  static styles = [drawZoneStyles];

  @property()
  onPositionChange:
    | ((value: { xPosition: number | null; yPosition: number | null }) => void)
    | undefined;

  @state()
  width = 0;

  @state()
  height = 0;

  @property({ type: Number })
  mouseX: number | null = null;

  @property({ type: Number })
  mouseY: number | null = null;

  setCurrentMousePosition = (event: MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const xPosition = event.clientX - rect.left;
    const yPosition = event.clientY - rect.top;
    this.onPositionChange?.({ xPosition, yPosition });
  };

  cancelDrawMode = () => {
    this.mouseX = null;
    this.mouseY = null;
  };

  #updateResize = () => {
    this.width = parseFloat(getComputedStyle(this).getPropertyValue('width'));
    this.height = parseFloat(getComputedStyle(this).getPropertyValue('height'));
  };

  constructor() {
    super();
    new ResizeObserver(this.#updateResize).observe(this);
  }

  render() {
    return html`<div
      id="drawzone"
      @mousemove=${this.setCurrentMousePosition}
      @mouseout=${this.cancelDrawMode}
      @blur=${this.cancelDrawMode}
    >
      <p>${this.width}_${this.height}</p>
      <p>${this.mouseX}_${this.mouseY}</p>
    </div>`;
  }
}
