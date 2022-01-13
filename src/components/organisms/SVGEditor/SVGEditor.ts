import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { SVGParamsBase } from '../../../types/types';
import { Editor } from '../../../util/Editor';
import { getFonts } from '../../../util/helper/availableFonts.js';
import { SVGParamFieldID, Tools_List } from '../../../util/helper/constants.js';
import '../../atoms/ToolboxButton';
import '../../molecules/DialogSection';
import '../../molecules/ToolBox';
import {
  hexToRGBA,
  updateNextSiblingValue,
  updatePreviousSiblingValue,
} from '../../../util/helper/util';
import { Connection } from '../../../util/network';
import '../../atoms/MenuButton';
import type { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';
import {
  layoutContentStyle,
  layoutHeaderStyle,
  layoutStyle,
} from './SVGEditor.styles';
import { getToolboxButtonsProps } from './SVGEditor.util';

@customElement('svg-editor')
export class SVGEditor extends LitElement {
  @state()
  width: number = 0;
  @state()
  height: number = 0;
  @state()
  editor: Editor | null = null;
  @state()
  connection?: Connection;
  @state()
  availableFonts?: Set<string>;

  static styles = [layoutStyle, layoutHeaderStyle, layoutContentStyle];

  constructor() {
    super();
    getFonts().then(fonts => (this.availableFonts = fonts));
  }

  async firstUpdated() {
    this.updateResize();
    this.hideRoomInformation();

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
    this.editor?.onSelectTool(tool);
  };

  handleJoinRoom = () => {
    if (this.editor) {
      const roomId = (
        this.shadowRoot?.getElementById('room') as HTMLInputElement
      ).value;
      const userName = (
        this.shadowRoot?.getElementById('user') as HTMLInputElement
      ).value;
      this.connection = new Connection(
        roomId,
        !!userName ? userName : undefined,
        this.editor.deleteFromShapes,
        this.editor.updateShapes,
        this.editor.getAllShapes,
        this.editor.resetEditor
      );
      this.connection.setChat(this.shadowRoot?.getElementById('chatbox'));
      this.editor.setConnection(this.connection);
      this.shadowRoot
        ?.getElementById('message-field')
        ?.removeAttribute('disabled');
      this.shadowRoot
        ?.getElementById('send-message-button')
        ?.removeAttribute('disabled');
      document.title = document.title + ' | Room:' + roomId;
      this.hideConnectForm();
    }
  };

  handleSVGParamChange = (
    field: keyof SVGParamsBase,
    targetId: SVGParamFieldID
  ) => {
    let value;
    const fillFields = [
      SVGParamFieldID.FILL_COLOR,
      SVGParamFieldID.FILL_OPACITY,
    ];
    const strokeFields = [
      SVGParamFieldID.STROKE_COLOR,
      SVGParamFieldID.STROKE_OPACITY,
    ];
    const dualFields = [...fillFields, ...strokeFields];

    if (dualFields.includes(targetId)) {
      let opacity, color;
      if (strokeFields.includes(targetId)) {
        opacity = (
          this.shadowRoot?.getElementById(
            SVGParamFieldID.STROKE_OPACITY
          ) as HTMLInputElement
        )?.value;
        color = (
          this.shadowRoot?.getElementById(
            SVGParamFieldID.STROKE_COLOR
          ) as HTMLInputElement
        )?.value;
        value = hexToRGBA(color ?? '#000000', opacity);
      } else {
        opacity = (
          this.shadowRoot?.getElementById(
            SVGParamFieldID.FILL_OPACITY
          ) as HTMLInputElement
        )?.value;
        color = (
          this.shadowRoot?.getElementById(
            SVGParamFieldID.FILL_COLOR
          ) as HTMLInputElement
        )?.value;
        value = hexToRGBA(color ?? '#000000', opacity);
      }
    } else {
      if (SVGParamFieldID.LINE_DASH === targetId) {
        value = (
          this.shadowRoot?.getElementById(
            SVGParamFieldID.LINE_DASH
          ) as HTMLInputElement
        )?.value
          .trim()
          .split(/[\s,]+/)
          .filter(splitValue => !!splitValue)
          .map(lineDashValue => parseInt(lineDashValue));
        if (value.some(innerValue => !isFinite(innerValue))) {
          value = [0];
        }
      } else {
        value = (this.shadowRoot?.getElementById(targetId) as HTMLInputElement)
          ?.value;
      }
    }
    this.editor?.setShapeParam(field, value);
  };

  hideConnectForm = () => {
    const connectForm = this.shadowRoot?.getElementById('connect-form');
    if (connectForm) {
      connectForm.style.display = 'none';
    }
    const connectionInfo = this.shadowRoot?.getElementById('room-information');
    if (connectionInfo) {
      connectionInfo.style.display = 'flex';
    }
  };

  hideRoomInformation = () => {
    const connectForm = this.shadowRoot?.getElementById('connect-form');
    if (connectForm) {
      connectForm.style.display = 'flex';
    }
    const connectionInfo = this.shadowRoot?.getElementById('room-information');
    if (connectionInfo) {
      connectionInfo.style.display = 'none';
    }
  };

  handleLeaveRoom = () => {
    this.connection?.disconnect();
    this.shadowRoot
      ?.getElementById('message-field')
      ?.setAttribute('disabled', '');
    this.shadowRoot
      ?.getElementById('send-message-button')
      ?.setAttribute('disabled', '');
    document.title = 'SVG Editor';
    this.hideRoomInformation();
  };

  handleSendMessage = () => {
    const chatValue = (
      this.shadowRoot?.getElementById('message-field') as
        | HTMLInputElement
        | undefined
    )?.value;
    this.connection?.sendChatMessage(chatValue);
  };

  updateResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  };

  render() {
    const tools: IToolboxButtonProps[] = getToolboxButtonsProps(
      this.handleSelectTool
    );
    return html`
      <div id="content">
        <!-- Mobile view to be implemented  -->
        <!-- <menu-button></menu-button> -->
        <div id="draw-container">
          <canvas
            id="drawzone"
            height=${this.height}
            width=${this.width}
          ></canvas>
          <canvas
            id="preview-layer"
            height=${this.height}
            width=${this.width}
          ></canvas>
        </div>
        <div id="right-main-section">
          <tool-box id="tool-box" .tools=${tools}></tool-box>
          <span id="connection-section" status="disconnected">
            <div id="connection-info">
              <h3>Connection</h3>
              <div id="connect-form">
                <div>
                  <label
                    ><div id="username-form-label">Username:</div>
                    <input
                      id="user"
                      type="text"
                      maxlength="10"
                      placeholder=${Connection.userName ?? ''}
                  /></label>
                  <label
                    ><div id="connect-form-label">Room ID:</div>
                    <input id="room" type="text"
                  /></label>
                </div>
                <div id="connect-button-container">
                  <button @click=${this.handleJoinRoom}>Connect</button>
                </div>
              </div>
              <div id="room-information">
                <div>
                  Connected as ${Connection.userName} <br />
                  Room ID: ${this.connection?.getRoom()}
                </div>
                <div id="disconnect-button-container">
                  <button @click=${this.handleLeaveRoom}>Disconnect</button>
                </div>
              </div>
            </div>
            <div id="chat">
              <h3>Chat</h3>
              <div id="chatbox"></div>
              <div id="chat-form">
                <input
                  disabled
                  id="message-field"
                  type="text"
                  placeholder="Message..."
                />
                <button
                  id="send-message-button"
                  disabled
                  @click=${this.handleSendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </span>
        </div>
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
                    @input="${() =>
                      this.handleSVGParamChange(
                        'strokeWidth',
                        SVGParamFieldID.STROKE_WIDTH
                      )}"
                  />
                </label>
                <label>
                  Line dash:
                  <input
                    type="text"
                    id="line-dash-input"
                    placeholder="3,3,3,12..."
                    @input="${() =>
                      this.handleSVGParamChange(
                        'lineDash',
                        SVGParamFieldID.LINE_DASH
                      )}"
                  />
                </label>
                <label>
                  Linecap:
                  <select
                    @input="${() =>
                      this.handleSVGParamChange(
                        'lineCap',
                        SVGParamFieldID.LINE_CAP
                      )}"
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
                      @change=${() =>
                        this.handleSVGParamChange(
                          'stroke',
                          SVGParamFieldID.STROKE_COLOR
                        )}
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
                        this.handleSVGParamChange(
                          'stroke',
                          SVGParamFieldID.STROKE_OPACITY
                        );
                      }}
                    />
                    <input
                      id="stroke-opacity-input"
                      type="number"
                      @change=${(event: InputEvent) => {
                        updatePreviousSiblingValue(event);
                        this.handleSVGParamChange(
                          'stroke',
                          SVGParamFieldID.STROKE_OPACITY
                        );
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
                      @input=${() =>
                        this.handleSVGParamChange(
                          'fill',
                          SVGParamFieldID.FILL_COLOR
                        )}
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
                        this.handleSVGParamChange(
                          'fill',
                          SVGParamFieldID.FILL_OPACITY
                        );
                      }}
                    />
                    <input
                      id="fill-opacity-input"
                      type="number"
                      @change=${(event: InputEvent) => {
                        updatePreviousSiblingValue(event);
                        this.handleSVGParamChange(
                          'fill',
                          SVGParamFieldID.FILL_OPACITY
                        );
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
                  @input=${() =>
                    this.handleSVGParamChange(
                      'fontSize',
                      SVGParamFieldID.TEXT_FONT_SIZE
                    )}
              /></label>
              <label>
                Font family:
                <select
                  id="text-font-family-input"
                  @input=${() =>
                    this.handleSVGParamChange(
                      'fontFamily',
                      SVGParamFieldID.TEXT_FONT_FAMILY
                    )}
                >
                  ${this.availableFonts &&
                  Array.from(this.availableFonts).map(
                    font => html`<option value=${font}>${font}</option>`
                  )}
                </select>
              </label>
              <label>
                Text:
                <input
                  type="text"
                  id="text-input"
                  @input=${() =>
                    this.handleSVGParamChange('text', SVGParamFieldID.TEXT)}
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
