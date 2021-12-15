import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Tools_List } from '../../../types/shapes.js';
import { Editor } from '../../../util/Editor';
import {
  layoutContentStyle,
  layoutHeaderStyle,
  layoutStyle,
} from './EditorLayout.styles';
import { getToolboxButtonsProps } from './EditorLayout.util.js';

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

    if (canvas) {
      new ResizeObserver(this.updateResize).observe(canvas);
      this.editor = new Editor(
        canvas,
        previewLayer,
        [previewLayer.offsetLeft, previewLayer.offsetTop],
        this
      );
    }
  }

  static styles = [layoutStyle, layoutHeaderStyle, layoutContentStyle];

  @state()
  width: number = 0;
  @state()
  height: number = 0;
  @state()
  editor: Editor | null = null;
  @state()
  selectedElement: string | null = null;

  handleSelectTool = (tool: Tools_List | null) => {
    if (tool === null) {
      this.editor?.onUnselectTool();
    } else {
      this.editor?.onSelectTool(tool);
    }
  };

  tools = getToolboxButtonsProps(this.handleSelectTool);

  updateResize = () => {
    this.width = parseInt(getComputedStyle(this).getPropertyValue('width'));
    this.height = parseInt(getComputedStyle(this).getPropertyValue('height'));
  };

  render() {
    return html`
      <div id="content">
        <div id="draw-container">
          <canvas id="drawzone" height="1000px" width="1000px"></canvas>
          <canvas id="preview-layer" height="1000px" width="1000px"></canvas>
        </div>
        <tool-box .tools=${this.tools}></tool-box>
      </div>
      <editor-header
        .onSave=${this.editor?.onSave}
        .onSelectSvgFile=${this.editor?.importSVG}
      ></editor-header>
      <textarea rows="5" id="footer" disabled>
${JSON.stringify(this.selectedElement ?? '')}</textarea
      >
    `;
  }
}
