import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { toolBoxButtonStyles } from './ToolboxButton.styles';

@customElement('toolbox-button')
export class ToolboxButton extends LitElement {
  @property({ type: Boolean })
  isSelected?: boolean;

  @property({ type: String })
  buttonId?: string;

  @property()
  onClick?: (id: string) => void;

  static styles = [toolBoxButtonStyles];

  private handleClick() {
    if (this.buttonId) {
      this.onClick?.(this.buttonId);
    }
  }

  render() {
    return html`<button
      class=${this.isSelected ? 'isSelected' : ''}
      @click=${this.handleClick}
    >
      ${this.title}
    </button>`;
  }
}
