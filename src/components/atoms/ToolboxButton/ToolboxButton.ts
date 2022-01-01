import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { toolBoxButtonStyles } from './ToolboxButton.styles';

@customElement('toolbox-button')
export class ToolboxButton extends LitElement {
  @property({ type: Boolean })
  isSelected?: boolean;

  @property({ type: String })
  toolName?: string;

  @property({ type: String })
  icon?: string;

  @property({ type: String })
  buttonId?: string;

  @property()
  onClick?: (id: string) => void;

  static styles = [toolBoxButtonStyles];

  #handleClick() {
    if (this.buttonId) {
      this.onClick?.(this.buttonId);
    }
  }

  render() {
    return html`<button
      class=${this.isSelected ? 'isSelected' : ''}
      @click=${this.#handleClick}
    >
      ${this.icon
        ? html`<img height="75px" width="75px" src=${this.icon}>${this.title}</img>`
        : this.toolName}
    </button>`;
  }
}
