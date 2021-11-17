import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { NullableNumber, NullableString } from '../../../types/types.js';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';
import { Editor } from '../../../util/Editor';
import {
  layoutContentStyle,
  layoutHeaderStyle,
  layoutStyle,
} from './EditorLayout.styles';

@customElement('editor-layout')
export class EditorLayout extends LitElement {
  static styles = [layoutStyle, layoutHeaderStyle, layoutContentStyle];
  constructor() {
    super();
    const element = this.shadowRoot?.getElementById(
      'drawzone'
    ) as unknown as SVGRectElement;
    if (element) {
      new ResizeObserver(this.updateResize).observe(element);
      this.editor = new Editor(element);
    }
  }

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

  randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  createRectangle = () => {
    var element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect'
    );
    element.setAttribute('x', (Math.random() * (this.width ?? 0)).toString());
    element.setAttribute('y', (Math.random() * (this.height ?? 0)).toString());
    element.setAttribute('width', (Math.random() * 100).toString());
    element.setAttribute('height', (Math.random() * 100).toString());
    element.style.stroke = 'black';
    element.style.fill = this.randomColor();
    const ed = new Editor(
      this.shadowRoot?.getElementById('drawzone') as unknown as SVGRectElement
    );
    ed.addElement(element);
  };

  @state()
  tools: IToolboxButtonProps[] = [
    {
      title: 'Tool 0',
      onClick: this.createRectangle,
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

  @state()
  width: NullableNumber = null;

  @state()
  height: NullableNumber = null;

  editor: Editor | null = null;

  private openFile = (file: string) => {
    this.openedFile = file;
  };

  updateResize = () => {
    this.width = parseFloat(getComputedStyle(this).getPropertyValue('width'));
    this.height = parseFloat(getComputedStyle(this).getPropertyValue('height'));
  };

  render() {
    return html`
      <editor-header .onSelectSvgFile=${this.openFile}></editor-header>
      <div id="content">
        <tool-box
          .selectedTool=${this.selectedTool}
          .tools=${this.tools}
        ></tool-box>
        <!-- @TODO: add command pattern for different selectable tools -->
        <!-- <svg id="drawzone" @click=this.selectedTool.executeAction></svg> -->
        <div id="connection-info">connection-info</div>
      </div>
      <div id="footer">current position: ${this.xPos} - ${this.yPos}</div>
    `;
  }
}
