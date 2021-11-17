import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { NullableNumber, NullableString } from '../../../types/types.js';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';
import { Editor, Tools_List } from '../../../util/Editor';
import {
  layoutContentStyle,
  layoutHeaderStyle,
  layoutStyle,
} from './EditorLayout.styles';
import { Tool } from '../../../util/Tool.js';

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
    }
  }
  private handleSelectTool = (id: string) => {
    this.tools = this.tools.map(tool => {
      if (tool.id === id) {
        return { ...tool, isSelected: !tool.isSelected };
      } else {
        return { ...tool, isSelected: false };
      }
    });
  };

  randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  createRectangle = () => {
    const element = document.createElementNS(
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

  @property({ type: Number })
  mouseX: number = 0;

  @property({ type: Number })
  mouseY: number = 0;

  mousemove = (event: any) => {
    this.editor?.useSelectedTool(event);
  };

  checkForEditor = () => {
    if (!this.editor) {
      this.editor = new Editor(
        this.shadowRoot?.getElementById('drawzone') as unknown as SVGRectElement
      );
    }
  };

  handleSelectResize = () => {
    this.checkForEditor();
    this.editor?.selectTool(this, Tools_List.RESIZE);
  };

  @state()
  tools: IToolboxButtonProps[] = [
    {
      title: 'Create Rectangle',
      onClick: this.createRectangle,
      id: '0',
      isSelected: false,
    },
    {
      title: 'Resize',
      onClick: this.handleSelectResize,
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
  private selectedTool: Tool | null = null;

  @state()
  private openedFile?: string = '';

  @state()
  width: NullableNumber = null;

  @state()
  height: NullableNumber = null;

  editor: Editor | null = null;

  private openFile = (file: Document) => {
    this.checkForEditor();
    this.editor?.setSVG(file);
  };

  updateResize = () => {
    this.width = parseFloat(getComputedStyle(this).getPropertyValue('width'));
    this.height = parseFloat(getComputedStyle(this).getPropertyValue('height'));
  };

  render() {
    return html`
      <editor-header .onSelectSvgFile=${this.openFile}></editor-header>
      <div id="content">
        <tool-box .tools=${this.tools}></tool-box>
        <svg
          height="1000"
          width="1000"
          viewBox="0 0 1000 1000"
          id="drawzone"
          @mousemove=${this.mousemove}
          @mouseup=${this.editor?.deselectTool}
        ></svg>
        <div id="connection-info">connection-info</div>
      </div>
      <div id="footer">current position: ${this.mouseX} - ${this.mouseY}</div>
    `;
  }
}
