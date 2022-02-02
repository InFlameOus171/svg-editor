import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { Tools_List } from '../../../util/helper/constants';
import {
  drawIconStyle,
  iconStyles,
  toolBoxButtonStyles,
} from './ToolboxButton.styles';
import {
  ToolboxButtonClickFunction,
  ToolboxButtonPropsType,
} from './ToolboxButton.types';
@customElement('toolbox-button')
export class ToolboxButton extends LitElement {
  @property({ type: String })
  buttonId?: Tools_List;

  @property()
  onClick?: ToolboxButtonClickFunction;

  @property({ type: String })
  toolName?: string;

  @property({ type: String })
  icon?: string;

  @property({ type: Boolean })
  disabled?: boolean;

  static styles = [toolBoxButtonStyles, ...iconStyles];

  constructor(props: ToolboxButtonPropsType) {
    super();
    if (props) {
      this.buttonId = props.buttonId;
      this.onClick = props.onClick;
      this.toolName = props.toolName;
      this.icon = props.icon;
      this.disabled = props.disabled;
    }
  }

  firstUpdated() {
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

  render() {
    return html` <div class="tooltip" id="button-tooltip">
      <label>
        ${this.icon
          ? html` <div class=${this.icon + ' icon'}></div>`
          : this.toolName}
        <button
          id=${this.buttonId ?? this.toolName + Date.now().toString()}
          @click=${() => this.buttonId && this.onClick?.(this.buttonId)}
          .disabled=${this.disabled ?? false}
        ></button>
      </label>
      <span id="tooltiptext"> ${this.toolName} </span>
    </div>`;
  }
}
