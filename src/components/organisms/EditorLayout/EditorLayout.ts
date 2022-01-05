import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Editor } from '../../../util/Editor';
import { fonts } from '../../../util/helper/availableFonts.js';
import { Tools_List } from '../../../util/helper/constants.js';
import {
  updateNextSiblingValue,
  updatePreviousSiblingValue,
} from '../../../util/helper/util';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';
import {
  layoutContentStyle,
  layoutHeaderStyle,
  layoutStyle,
} from './EditorLayout.styles';
import {
  getToolboxButtonsProps,
  handleUpdateSVGParameters,
} from './EditorLayout.util';

@customElement('svg-editor')
export class EditorLayout extends LitElement {
  @state()
  width: number = 0;
  @state()
  height: number = 0;
  @state()
  editor: Editor | null = null;

  static styles = [layoutStyle, layoutHeaderStyle, layoutContentStyle];

  async firstUpdated() {
    this.updateResize();
    const canvas = this.shadowRoot?.getElementById(
      'drawzone'
    ) as HTMLCanvasElement;
    canvas.addEventListener('mousemove', (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const position = this.shadowRoot?.getElementById('position');
      if (position) {
        position.innerHTML = `x:${event.clientX - rect.left} - y:${
          event.clientY - rect.top
        }`;
      }
    });
    canvas.addEventListener('mouseout', (event: MouseEvent) => {
      const position = this.shadowRoot?.getElementById('position');
      if (position) {
        position.innerHTML = '- - -';
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

  handleSelectTool = (tool: Tools_List | null) => {
    if (tool === null) {
      this.editor?.onUnselectTool();
    } else {
      this.editor?.onSelectTool(tool);
    }
  };

  updateResize = () => {
    this.width = parseInt(getComputedStyle(this).getPropertyValue('width'));
    this.height = parseInt(getComputedStyle(this).getPropertyValue('height'));
  };

  render() {
    const tools: IToolboxButtonProps[] = getToolboxButtonsProps(
      this.handleSelectTool
    );
    return html`
      <div id="content">
        <div id="draw-container">
          <canvas id="drawzone" height="760px" width="1000px"></canvas>
          <canvas id="preview-layer" height="760px" width="1000px"></canvas>
        </div>
        <tool-box .tools=${tools}></tool-box>
      </div>
      <dialog-section
        .onSave=${this.editor?.onSave}
        .onSelectSvgFile=${this.editor?.importSVG}
      ></dialog-section>
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
                    @input="${() => handleUpdateSVGParameters(this)}"
                  />
                </label>
                <label>
                  Line dash:
                  <input
                    type="text"
                    id="line-dash-input"
                    placeholder="3,3,3,12..."
                    @input=${() => handleUpdateSVGParameters(this)}
                  />
                </label>
                <label>
                  Linecap:
                  <select
                    @input="${() => handleUpdateSVGParameters(this)}"
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
                      @change="${() => handleUpdateSVGParameters(this)}"
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
                        handleUpdateSVGParameters(this);
                      }}
                    />
                    <input
                      id="stroke-opacity-input"
                      type="number"
                      @change=${(event: InputEvent) => {
                        updatePreviousSiblingValue(event);
                        handleUpdateSVGParameters(this);
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
                      @input="${() => handleUpdateSVGParameters(this)}"
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
                        handleUpdateSVGParameters(this);
                      }}
                    />
                    <input
                      id="fill-opacity-input"
                      type="number"
                      @change=${(event: InputEvent) => {
                        updatePreviousSiblingValue(event);
                        handleUpdateSVGParameters(this);
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
                  @input=${() => handleUpdateSVGParameters(this)}
              /></label>
              <label>
                Font family:
                <select
                  id="text-font-family-input"
                  @input=${() => handleUpdateSVGParameters(this)}
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
                  @input=${() => handleUpdateSVGParameters(this)}
                />
              </label>
            </fieldset>
          </div>
        </fieldset>
        <div id="position-container">
          <span id="position">- - -</span>
        </div>
      </div>
    `;
  }
}
