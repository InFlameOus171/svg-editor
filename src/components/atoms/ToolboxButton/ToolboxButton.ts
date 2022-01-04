import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Tools_List } from '../../../util/helper/constants';
import { toolBoxButtonStyles } from './ToolboxButton.styles';

@customElement('toolbox-button')
export class ToolboxButton extends LitElement {
  @property({ type: Boolean })
  isSelected?: boolean = false;

  @property({ type: String })
  toolName: string = 'tool';

  @property({ type: String })
  icon?: string;

  @property({ type: String })
  class?: string;

  @property({ type: Number })
  buttonId?: Tools_List;

  @property()
  onClick?: (id: Tools_List) => void;

  static styles = [toolBoxButtonStyles];

  #handleClick() {
    if (this.buttonId) {
      this.onClick?.(this.buttonId);
    }
  }

  render() {
    console.log(this.isSelected);
    return html`<div class="tooltip">
      <span class="tooltiptext">${this.toolName}</span
      ><button
        class=${this.isSelected ? 'isSelected' : ''}
        @click=${this.#handleClick}
      >
        ${this.icon
          ? html`<img alt=${this.toolName} class=${
              this.class ?? 'tool-icon'
            }height="75px" width="75px" src=${this.icon}></img>`
          : this.toolName}
      </button>
    </div>`;
  }
}
