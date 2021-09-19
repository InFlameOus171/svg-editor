import { html, LitElement } from 'lit';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';
import { layoutStyle } from './EditorLayout.styles';
import { IEditorLayoutState } from './EditorLayout.types';
import { getButtonColumn, generateTools } from './EditorLayout.util';

export class EditorLayout extends LitElement {
  static styles = layoutStyle;

  state: IEditorLayoutState = { selectedTool: null };

  render() {
    const tools: IToolboxButtonProps[] = generateTools(id => {
      this.state.selectedTool = id;
    });
    const toolCount = tools.length;
    const leftColumnInterval: [number, number] = [
      0,
      (toolCount + (toolCount % 2)) / 2,
    ];
    const rightColumnInterval: [number, number] = [
      (toolCount + (toolCount % 2)) / 2,
      toolCount,
    ];

    return html`
      <div id="layout">
        <div id="header">Header</div>
        <div id="toolbox">
          <div class="col-0">${getButtonColumn(tools, leftColumnInterval)}</div>
          <div class="col-1">
            ${getButtonColumn(tools, rightColumnInterval)}
          </div>
        </div>
        <div id="drawzone">drawzone</div>
        <div id="connection-info">connection-info</div>
        <div id="footer">footer</div>
      </div>
    `;
  }
}
