import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { NullableString } from '../../../types/types.js';
import { Tools_List } from '../../../util/helper/constants.js';
import type { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';
import { toolBoxStyles } from './ToolBox.styles';
import { getButtonColumn } from './ToolBox.util';

@customElement('tool-box')
export class ToolBox extends LitElement {
  @property({
    type: Array,
    hasChanged: (
      value: IToolboxButtonProps[],
      oldValue: IToolboxButtonProps[]
    ) => {
      return JSON.stringify(value) !== JSON.stringify(oldValue);
    },
  })
  tools?: IToolboxButtonProps[] = [];

  @property()
  onChange?: () => Tools_List;

  @state()
  toolsLength = this.tools?.length;

  @property({ type: String })
  selectedTool?: NullableString;

  static styles = toolBoxStyles;

  // connectedCallback(): void {
  //   super.connectedCallback();
  //   this.requestUpdate();
  // }

  render() {
    return html`
      <div id="column-wrapper">${getButtonColumn(this.tools)}</div>
    `;
  }
}
