import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ShapeType } from '../../../types/shapes.js';
import { Editor } from '../../../util/Editor';
import { fonts } from '../../../util/helper/availableFonts.js';
import { Tools_List } from '../../../util/helper/constants.js';
import {
  updateNextSiblingValue,
  updatePreviousSiblingValue,
  updateStyleInputFields,
} from '../../../util/helper/util.js';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types.js';
import {
  layoutContentStyle,
  layoutHeaderStyle,
  layoutStyle,
} from './EditorLayout.styles';
import {
  getToolboxButtonsProps,
  handleUpdateSVGParameters,
} from './EditorLayout.util.js';

@customElement('editor-layout')
export class EditorLayout extends LitElement {
  @state()
  width: number = 0;
  @state()
  height: number = 0;
  @state()
  editor: Editor | null = null;
  @state()
  selectedElement: string | null = null;

  async firstUpdated() {
    this.updateResize();
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

  handleSelectTool = (tool: Tools_List | null) => {
    if (tool === null) {
      this.editor?.onUnselectTool();
    } else {
      this.editor?.onSelectTool(tool);
      const index = this.tools?.findIndex(
        currentTool => currentTool.id === tool
      );
      if (!!index && index > 0) {
        const currentTools = this.tools;
        this.tools = undefined;
        if (currentTools) {
          currentTools[index] = { ...currentTools[index], isSelected: true };
          this.tools = currentTools;
        }
      }
    }
  };

  @state({
    hasChanged: (
      value: IToolboxButtonProps[],
      oldValue: IToolboxButtonProps[]
    ) => {
      console.log(JSON.stringify(value) !== JSON.stringify(oldValue));
      return JSON.stringify(value) !== JSON.stringify(oldValue);
    },
  })
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
          <canvas id="drawzone" height="1000px" width="1000px"></canvas>
          <canvas id="preview-layer" height="1000px" width="1000px"></canvas>
        </div>
        <tool-box .tools=${tools}></tool-box>
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
        <div id="position"></div>
      </div>
    `;
  }
}
