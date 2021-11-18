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

@customElement('editor-layout')
export class EditorLayout extends LitElement {
  async firstUpdated() {
    this.updateResize();
    const canvas = this.shadowRoot?.getElementById(
      'drawzone'
    ) as HTMLCanvasElement;
    const previewLayer = this.shadowRoot?.getElementById(
      'preview-layer'
    ) as HTMLCanvasElement;
    if (previewLayer) console.log(previewLayer);
    if (canvas) {
      console.log(this.height, this.width);
      console.log('drin');
      console.log(canvas);
      new ResizeObserver(this.updateResize).observe(canvas);
      this.editor = new Editor(
        canvas,
        previewLayer,
        { x: previewLayer.offsetLeft, y: previewLayer.offsetTop },
        this
      );
    }
  }

  // connectedCallback(): void {
  //   super.connectedCallback();

  // }

  static styles = [layoutStyle, layoutHeaderStyle, layoutContentStyle];
  @state()
  width: number = 0;
  @state()
  height: number = 0;

  @state()
  editor: Editor | null = null;

  handleSelectTool = () => {
    console.log('selected');
  };

  handleSelectDraw = () => {
    this.editor?.selectTool(Tools_List.DRAW);
  };
  handleSelectLine = () => {
    this.editor?.selectTool(Tools_List.LINE);
  };

  deselectTool = () => {
    this.editor?.deselectTool();
  };

  tools: IToolboxButtonProps[] = [
    {
      title: 'Draw Tool',
      onClick: this.handleSelectDraw,
      id: '0',
      isSelected: false,
    },
    {
      title: 'Line Tool',
      onClick: this.handleSelectLine,
      id: '1',
      isSelected: false,
    },
    {
      title: 'Deselect',
      onClick: this.deselectTool,
      id: '2',
      isSelected: false,
    },
  ];

  updateResize = () => {
    this.width = parseInt(getComputedStyle(this).getPropertyValue('width'));
    this.height = parseInt(getComputedStyle(this).getPropertyValue('height'));
  };

  render() {
    return html`
      <div id="content">
        <div id="draw-container">
          <canvas
            id="drawzone"
            height=${window.innerHeight / 1.5}
            width=${window.innerHeight / 1.5}
          ></canvas>
          <canvas
            id="preview-layer"
            height=${window.innerHeight / 1.5}
            width=${window.innerHeight / 1.5}
          ></canvas>
        </div>
        <tool-box .tools=${this.tools}></tool-box>

        <!-- <div id="connection-info">connection-info</div> -->
      </div>

      <editor-header></editor-header>

      <div id="footer"></div>
    `;
  }
}
