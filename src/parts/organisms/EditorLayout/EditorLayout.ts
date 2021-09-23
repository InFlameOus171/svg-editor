import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';
import {
  layoutContentStyle,
  layoutHeaderStyle,
  layoutStyle,
  responsiveStyles,
} from './EditorLayout.styles';
import { IEditorLayoutState } from './EditorLayout.types';
import { generateTools } from './EditorLayout.util';

@customElement('editor-layout')
export class EditorLayout extends LitElement {
  static styles = [
    layoutStyle,
    layoutHeaderStyle,
    layoutContentStyle,
    responsiveStyles,
  ];

  state: IEditorLayoutState = { selectedTool: null };

  render() {
    const tools: IToolboxButtonProps[] = generateTools(id => {
      this.state.selectedTool = id;
    });

    return html`
      <div id="header">Header</div>
      <div id="content">
        <tool-box .props=${{ tools }}></tool-box>
        <div id="drawzone">drawzone</div>
        <div id="connection-info">connection-info</div>
      </div>
      <div id="footer">footer</div>
    `;
  }
}
