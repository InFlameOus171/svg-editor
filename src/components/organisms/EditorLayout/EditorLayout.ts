import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { NullableNumber, NullableString } from '../../../types/types.js';
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

  private handleSelectTool = (id: string) => {
    this.selectedTool = id;
    this.tools = this.tools.map(tool => {
      if (tool.id === id) {
        return { ...tool, isSelected: !tool.isSelected };
      } else {
        return { ...tool, isSelected: false };
      }
    });
  };

  @state()
  tools: IToolboxButtonProps[] = [
    {
      title: 'Tool 0',
      onClick: this.handleSelectTool,
      id: '0',
      isSelected: false,
    },
    {
      title: 'Tool 1',
      onClick: this.handleSelectTool,
      id: '1',
      isSelected: false,
    },
    {
      title: 'Tool 2',
      onClick: this.handleSelectTool,
      id: '2',
      isSelected: false,
    },
    {
      title: 'Tool 3',
      onClick: this.handleSelectTool,
      id: '3',
      isSelected: false,
    },
    {
      title: 'Tool 4',
      onClick: this.handleSelectTool,
      id: '4',
      isSelected: false,
    },
    {
      title: 'Tool 5',
      onClick: this.handleSelectTool,
      id: '5',
      isSelected: false,
    },
    {
      title: 'Tool 6',
      onClick: this.handleSelectTool,
      id: '6',
      isSelected: false,
    },
  ];

  @state()
  private xPos: NullableNumber = null;

  @state()
  private yPos: NullableNumber = null;

  @state()
  private selectedTool: NullableString = null;

  @state()
  private openedFile?: string = '';

  private handlePositionChange = (value: {
    xPosition: NullableNumber;
    yPosition: NullableNumber;
  }) => {
    this.xPos = value.xPosition;
    this.yPos = value.yPosition;
  };

  private openFile = (file: string) => {
    this.openedFile = file;
  };

  render() {
    return html`
      <editor-header .onSelectSvgFile=${this.openFile}></editor-header>
      <div id="content">
        <tool-box
          .selectedTool=${this.selectedTool}
          .tools=${this.tools}
        ></tool-box>
        <draw-zone
          .onPositionChange=${this.handlePositionChange}
          .mouseX=${this.xPos}
          .mouseY=${this.yPos}
          .openedFile=${this.openedFile}
        ></draw-zone>
        <div id="connection-info">connection-info</div>
      </div>
      <div id="footer">current position: ${this.xPos} - ${this.yPos}</div>
    `;
  }
}
