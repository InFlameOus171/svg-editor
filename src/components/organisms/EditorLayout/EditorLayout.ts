import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ShapeType, Tools_List } from '../../../types/shapes.js';
import { Editor } from '../../../util/Editor';
import { fonts } from '../../../util/helper/availableFonts.js';
import {
  updateNextSiblingValue,
  updatePreviousSiblingValue,
  updateStyleInputFields,
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
    updateStyleInputFields(this, {
      strokeWidth: '1',
      stroke: 'rgba(0,0,0,1)',
      fill: 'rgba(0,0,0,0)',
    });
    const canvas = this.shadowRoot?.getElementById(
      'drawzone'
    ) as HTMLCanvasElement;
    canvas.addEventListener('mousemove', (event: MouseEvent) => {
      var rect = canvas.getBoundingClientRect();
      const posV = this.shadowRoot?.getElementById('position');
      if (posV) {
        posV.innerHTML = `${event.clientX - rect.left} - ${
          event.clientY - rect.top
        }`;
      }
    });
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
    const fillOpacity = (
      this.shadowRoot?.getElementById('fill-opacity-input') as HTMLInputElement
    )?.value;
    const lineDash = (
      this.shadowRoot?.getElementById('line-dash-input') as HTMLInputElement
    )?.value
      .split(',')
      .map(value => parseInt(value.trim()));
    const lineCap = (
      this.shadowRoot?.getElementById('line-cap-input') as HTMLInputElement
    )?.value as CanvasLineCap;
    const fontSize = (
      this.shadowRoot?.getElementById(
        'text-font-size-input'
      ) as HTMLInputElement
    )?.valueAsNumber;
    const fontFamily = (
      this.shadowRoot?.getElementById(
        'text-font-family-input'
      ) as HTMLInputElement
    )?.value;
    const text = (
      this.shadowRoot?.getElementById('text-input') as HTMLInputElement
    )?.value;
    const strokeOpacity = (
      this.shadowRoot?.getElementById(
        'stroke-opacity-input'
      ) as HTMLInputElement
    )?.value;
    console.log(stroke, fill, strokeOpacity, lineDash, lineCap, strokeWidth);
    this.editor?.setStyles(
      strokeWidth,
      stroke,
      fill,
      fillOpacity,
      strokeOpacity,
      lineCap,
      lineDash,
      fontFamily,
      fontSize
    );
    this.editor?.applyStyles();
  };

  handleChangeText = (event: InputEvent) => {
    this.editor?.handleUpdateText();
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
        <fieldset id="footer-fields">
          <div id="footer-input">
            <div id="left-input-section">
              <div>
                <label>
                  Stroke width:
                  <input
                    type="number"
                    id="stroke-width-input"
                    @input="${this.handleApplyStyles}"
                  />
                </label>
                <label>
                  Line dash:
                  <input
                    type="text"
                    id="line-dash-input"
                    placeholder="3,3,3,12..."
                    @input=${this.handleApplyStyles}
                  />
                </label>
                <label>
                  Linecap:
                  <select
                    @input="${this.handleApplyStyles}"
                    id="line-cap-input"
                  >
                    <option value="round">Round edge</option>
                    <option value="butt">Flat edge</option>
                  </select>
                </label>
              </div>
              <div id="footer-input-fields">
                <div>
                  <label>
                    Color:
                    <input
                      type="color"
                      id="stroke-color-input"
                      @change="${this.handleApplyStyles}"
                    />
                  </label>
                  <label>
                    Opacity:
                    <input
                      type="range"
                      min="0"
                      step="0.1"
                      max="1"
                      @input=${(event: InputEvent) => {
                        updateNextSiblingValue(event);
                        this.handleApplyStyles();
                      }}
                    />
                    <input
                      id="stroke-opacity-input"
                      type="number"
                      @change=${(event: InputEvent) => {
                        updatePreviousSiblingValue(event);
                        this.handleApplyStyles();
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Fill:
                    <input
                      type="color"
                      id="fill-color-input"
                      @input="${this.handleApplyStyles}"
                    />
                  </label>
                  <label>
                    Opacity:
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      @input=${(event: InputEvent) => {
                        updateNextSiblingValue(event);
                        this.handleApplyStyles();
                      }}
                    />
                    <input
                      id="fill-opacity-input"
                      type="number"
                      @change=${(event: InputEvent) => {
                        updatePreviousSiblingValue(event);
                        this.handleApplyStyles();
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
            <fieldset id="right-input-section">
              <label
                >Font size:<input
                  type="number"
                  id="text-font-size-input"
                  @input=${this.handleApplyStyles}
              /></label>
              <label>
                Font family:
                <select
                  id="text-font-family-input"
                  @input=${this.handleApplyStyles}
                >
                  ${Array.from(fonts).map(
                    font => html`<option value=${font}>${font}</option>`
                  )}
                </select>
              </label>
              <label>
                Text:
                <input
                  type="text"
                  id="text-input"
                  @input=${this.handleChangeText}
                />
              </label>
            </fieldset>
          </div>
          <!-- <div id="footer-submit-button">
            <button @click=${this.handleApplyStyles}>Apply styles</button>
          </div> -->
        </fieldset>
        <div id="position"></div>
      </div>
    `;
  }
}
