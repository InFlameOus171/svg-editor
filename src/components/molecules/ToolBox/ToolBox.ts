import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { NullableString } from '../../../types/types.js';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';
import { toolBoxStyles } from './ToolBox.styles';
import { getButtonColumn } from './ToolBox.util';

@customElement('tool-box')
export class ToolBox extends LitElement {
  @property({ type: Array })
  tools?: Array<any>;

  @property({ type: String })
  selectedTool?: NullableString;

  static styles = toolBoxStyles;

  render() {
    const toolCount = this.tools?.length ?? 0;
    const leftColumnInterval: [number, number] = [
      0,
      (toolCount + (toolCount % 2)) / 2,
    ];
    const rightColumnInterval: [number, number] = [
      (toolCount + (toolCount % 2)) / 2,
      toolCount,
    ];
    return html`
      <div class="col-0">
        ${getButtonColumn(leftColumnInterval, this.tools)}
      </div>
      <div class="col-1">
        ${getButtonColumn(rightColumnInterval, this.tools)}
      </div>
    `;
  }
}
