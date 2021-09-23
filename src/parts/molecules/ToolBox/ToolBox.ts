import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { toolBoxStyles } from './ToolBox.styles';
import { IToolBoxProps } from './ToolBox.types';
import { getButtonColumn } from './ToolBox.util';

@customElement('tool-box')
export class ToolBox extends LitElement {
  @property({ type: Object }) props: IToolBoxProps = {};

  static styles = toolBoxStyles;

  constructor(props: IToolBoxProps) {
    super();
    this.props = props;
  }

  render() {
    const { tools } = this.props;
    const toolCount = tools?.length ?? 0;
    const leftColumnInterval: [number, number] = [
      0,
      (toolCount + (toolCount % 2)) / 2,
    ];
    const rightColumnInterval: [number, number] = [
      (toolCount + (toolCount % 2)) / 2,
      toolCount,
    ];
    return html`
      <div class="vertical-indicator"></div>
      <div class="col-0">${getButtonColumn(leftColumnInterval, tools)}</div>
      <div class="col-1">${getButtonColumn(rightColumnInterval, tools)}</div>
    `;
  }
}
