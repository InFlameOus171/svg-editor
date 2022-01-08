import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Editor } from '../../../util/Editor';
import { fonts } from '../../../util/helper/availableFonts.js';
import { Tools_List } from '../../../util/helper/constants.js';
import { handleUpdateSVGParameters } from '../../../util/helper/domUtil';
import {
  updateNextSiblingValue,
  updatePreviousSiblingValue,
} from '../../../util/helper/util';
import { Connection } from '../../../util/network';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';
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

  static styles = [layoutStyle, layoutHeaderStyle, layoutContentStyle];

  constructor() {
    super();
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
    const roomId = (this.shadowRoot?.getElementById('room') as HTMLInputElement)
      .value;
    const userName = (
      this.shadowRoot?.getElementById('user') as HTMLInputElement
    ).value;
    this.connection = new Connection(roomId, !!userName ? userName : undefined);
    this.connection.setChat(this.shadowRoot?.getElementById('chatbox'));
    this.editor?.setConnection(this.connection);
    this.shadowRoot
      ?.getElementById('message-field')
      ?.removeAttribute('disabled');
    this.shadowRoot
      ?.getElementById('send-message-button')
      ?.removeAttribute('disabled');
    document.title = document.title + ' | Room:' + roomId;
    this.hideConnectForm();
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
          <tool-box .tools=${tools}></tool-box>
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
