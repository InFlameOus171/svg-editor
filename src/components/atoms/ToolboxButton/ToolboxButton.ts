import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Tools_List } from '../../../util/helper/constants';
import { toolBoxButtonStyles } from './ToolboxButton.styles';

@customElement('toolbox-button')
export class ToolboxButton extends LitElement {
  @property({ type: String })
  toolName: string = 'tool';

  @property({ type: Array })
  icon?: [string, string];

  @property({ type: String })
  class?: string;

  @property({ type: String })
  buttonId?: Tools_List;

  @property({ type: Boolean })
  disabled?: boolean;

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
      <button
        id=${this.buttonId ?? this.toolName + Date.now().toString()}
        @click=${this.#handleClick}
        .disabled=${this.disabled ?? false}
      >
        ${this.icon
          ? html`
          <img
          alt=${this.toolName}
          class=${(this.class ?? '') + 'tool-icon'}
          onerror=${`this.onerror = null; this.src="public/images/${this.icon[1]}"`}
          src=${this.icon[0] + this.icon[1]}>
          </img>`
          : this.toolName}
      </button>
      <span id="tooltiptext"> ${this.toolName} </span>
    </div>`;
  }
}
