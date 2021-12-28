import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ShapeType, Tools_List } from '../../../types/shapes.js';
import { PenConfiguration } from '../../../types/types.js';
import { Editor } from '../../../util/Editor';
import {
  updateNextSiblingValue,
  updatePreviousSiblingValue,
} from '../../../util/helper/util.js';
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

  handleApplyStyles = () => {
    const strokeWidth = (
      this.shadowRoot?.getElementById('stroke-width-input') as HTMLInputElement
    )?.value;
    const stroke = (
      this.shadowRoot?.getElementById('stroke-color-input') as HTMLInputElement
    )?.value;
    const fill = (
      this.shadowRoot?.getElementById('fill-color-input') as HTMLInputElement
    )?.value;
    this.editor?.applyStyles(strokeWidth, stroke, fill);
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
      <div id="footer">
        <fieldset disabled id="footer-fields">
          <label>
            Stroke width:
            <input type="number" id="stroke-width-input" />
          </label>
          <div>
            <label>
              Color:
              <input type="color" id="stroke-color-input" />
            </label>
            <label>
              Opacity:
              <input type="range" @input=${updateNextSiblingValue} />
              <input
                id="stroke-opacity-input"
                type="number"
                @change=${updatePreviousSiblingValue}
              />
            </label>
          </div>
          <div>
            <label>
              Fill:
              <input type="color" id="fill-color-input" />
            </label>
            <label>
              Opacity:
              <input type="range" @input=${updateNextSiblingValue} />
              <input
                id="fill-opacity-input"
                type="number"
                @change=${updatePreviousSiblingValue}
              />
            </label>
          </div>
          <button @click=${this.handleApplyStyles}>Apply styles</button>
        </fieldset>
      </div>
    `;
  }
}
