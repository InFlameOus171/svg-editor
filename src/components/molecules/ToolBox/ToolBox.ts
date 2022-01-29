import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ToolboxButtonPropsType } from '../../atoms/ToolboxButton/ToolboxButton.types';
import { toolBoxStyles } from './ToolBox.styles';

@customElement('tool-box')
export class ToolBox extends LitElement {
  @property({
    type: Array,
    hasChanged: (
      value: ToolboxButtonPropsType[],
      oldValue: ToolboxButtonPropsType[]
    ) => {
      return JSON.stringify(value) !== JSON.stringify(oldValue);
    },
  })
  tools?: ToolboxButtonPropsType[] = [];

  static styles = toolBoxStyles;

  render() {
    return html`
      <div id="column-wrapper">
        ${this.tools?.map(
          tool => html`
            <span class="row">
              <toolbox-button
                id=${'tool-box-button-' + tool.buttonId}
                .onClick=${tool.onClick}
                .buttonId=${tool.buttonId}
                .toolName=${tool.toolName}
                .icon=${tool.icon}
                .disabled=${tool.disabled}
              >
              </toolbox-button>
            </span>
          `
        )}
      </div>
    `;
  }
}
