import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';
import {
  layoutContentStyle,
  layoutHeaderStyle,
  layoutStyle,
} from './EditorLayout.styles';
import { generateTools } from './EditorLayout.util';

@customElement('editor-layout')
export class EditorLayout extends LitElement {
  static styles = [layoutStyle, layoutHeaderStyle, layoutContentStyle];

  @state()
  xPos: number | null = null;

  @state()
  yPos: number | null = null;

  @state()
  selectedTool: string | null = null;

  #handlePositionChange = (value: {
    xPosition: number | null;
    yPosition: number | null;
  }) => {
    this.xPos = value.xPosition;
    this.yPos = value.yPosition;
  };

  render() {
    const tools: IToolboxButtonProps[] = generateTools(id => {
      this.selectedTool = id;
    });

    return html`
      <div id="header">Header</div>
      <div id="content">
        <tool-box .props=${{ tools }}></tool-box>
        <draw-zone
          .onPositionChange=${this.#handlePositionChange}
          .mouseX=${this.xPos}
          .mouseY=${this.yPos}
        ></draw-zone>
        <div id="connection-info">connection-info</div>
      </div>
      <div id="footer">current position: ${this.xPos} - ${this.yPos}</div>
    `;
  }
}
