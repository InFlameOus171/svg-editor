import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Tools_List } from '../../../util/helper/constants';
import { toolBoxButtonStyles } from './ToolboxButton.styles';

@customElement('toolbox-button')
export class ToolboxButton extends LitElement {
  @property({ type: String })
  toolName: string = 'tool';

  @property({ type: String })
  icon?: string;

  @property({ type: String })
  class?: string;

  @property({ type: String })
  buttonId?: Tools_List;

  @property()
  onClick?: (id: Tools_List) => void;

  static styles = [toolBoxButtonStyles];

  async firstUpdated() {
    const tooltip = this.shadowRoot?.getElementById('button-tooltip');

    if (tooltip) {
      const toolTipText = tooltip.querySelector(
        '#tooltiptext'
      ) as HTMLElement | null;
      tooltip?.addEventListener('mousemove', (event: MouseEvent) => {
        if (tooltip.matches(':hover')) {
          const x = event.clientX;
          const y = event.clientY;
          if (toolTipText) {
            toolTipText.style.top = y + 20 + 'px';
            toolTipText.style.left = x + 15 + 'px';
          }
        }
      });
    }
  }

  #handleClick() {
    if (this.buttonId) {
      this.onClick?.(this.buttonId);
    }
  }

  render() {
    return html` <div class="tooltip" id="button-tooltip">
      <button id=${this.id} @click=${this.#handleClick}>
        ${this.icon
          ? html`
          <img 
          alt=${this.toolName} 
          class=${this.class ?? 'tool-icon'}
          height="75px" 
          width="75px" 
          src=${this.icon}>
          </img>`
          : this.toolName}
      </button>
      <span id="tooltiptext"> ${this.toolName} </span>
    </div>`;
  }
}
