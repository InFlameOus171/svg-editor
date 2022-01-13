import { __awaiter, __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Editor } from '../../../util/Editor';
import { getFonts } from '../../../util/helper/availableFonts.js';
import { SVGParamFieldID } from '../../../util/helper/constants.js';
import '../../atoms/ToolboxButton';
import '../../molecules/DialogSection';
import '../../molecules/ToolBox';
import { hexToRGBA, updateNextSiblingValue, updatePreviousSiblingValue, } from '../../../util/helper/util';
import { Connection } from '../../../util/network';
import '../../atoms/MenuButton';
import { layoutContentStyle, layoutHeaderStyle, layoutStyle, } from './SVGEditor.styles';
import { getToolboxButtonsProps } from './SVGEditor.util';
let SVGEditor = class SVGEditor extends LitElement {
    constructor() {
        super();
        this.width = 0;
        this.height = 0;
        this.editor = null;
        this.handleSelectTool = (tool) => {
            var _a;
            (_a = this.editor) === null || _a === void 0 ? void 0 : _a.onSelectTool(tool);
        };
        this.handleJoinRoom = () => {
            var _a, _b, _c, _d, _e, _f, _g;
            if (this.editor) {
                const roomId = ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('room')).value;
                const userName = ((_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById('user')).value;
                this.connection = new Connection(roomId, !!userName ? userName : undefined, this.editor.deleteFromShapes, this.editor.updateShapes, this.editor.getAllShapes, this.editor.resetEditor);
                this.connection.setChat((_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.getElementById('chatbox'));
                this.editor.setConnection(this.connection);
                (_e = (_d = this.shadowRoot) === null || _d === void 0 ? void 0 : _d.getElementById('message-field')) === null || _e === void 0 ? void 0 : _e.removeAttribute('disabled');
                (_g = (_f = this.shadowRoot) === null || _f === void 0 ? void 0 : _f.getElementById('send-message-button')) === null || _g === void 0 ? void 0 : _g.removeAttribute('disabled');
                document.title = document.title + ' | Room:' + roomId;
                this.hideConnectForm();
            }
        };
        this.handleSVGParamChange = (field, targetId) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
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
                    opacity = (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(SVGParamFieldID.STROKE_OPACITY)) === null || _b === void 0 ? void 0 : _b.value;
                    color = (_d = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.getElementById(SVGParamFieldID.STROKE_COLOR)) === null || _d === void 0 ? void 0 : _d.value;
                    value = hexToRGBA(color !== null && color !== void 0 ? color : '#000000', opacity);
                }
                else {
                    opacity = (_f = (_e = this.shadowRoot) === null || _e === void 0 ? void 0 : _e.getElementById(SVGParamFieldID.FILL_OPACITY)) === null || _f === void 0 ? void 0 : _f.value;
                    color = (_h = (_g = this.shadowRoot) === null || _g === void 0 ? void 0 : _g.getElementById(SVGParamFieldID.FILL_COLOR)) === null || _h === void 0 ? void 0 : _h.value;
                    value = hexToRGBA(color !== null && color !== void 0 ? color : '#000000', opacity);
                }
            }
            else {
                if (SVGParamFieldID.LINE_DASH === targetId) {
                    value = (_k = (_j = this.shadowRoot) === null || _j === void 0 ? void 0 : _j.getElementById(SVGParamFieldID.LINE_DASH)) === null || _k === void 0 ? void 0 : _k.value.trim().split(/[\s,]+/).filter(splitValue => !!splitValue).map(lineDashValue => parseInt(lineDashValue));
                    if (value.some(innerValue => !isFinite(innerValue))) {
                        value = [0];
                    }
                }
                else {
                    value = (_m = (_l = this.shadowRoot) === null || _l === void 0 ? void 0 : _l.getElementById(targetId)) === null || _m === void 0 ? void 0 : _m.value;
                }
            }
            (_o = this.editor) === null || _o === void 0 ? void 0 : _o.setShapeParam(field, value);
        };
        this.hideConnectForm = () => {
            var _a, _b;
            const connectForm = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('connect-form');
            if (connectForm) {
                connectForm.style.display = 'none';
            }
            const connectionInfo = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById('room-information');
            if (connectionInfo) {
                connectionInfo.style.display = 'flex';
            }
        };
        this.hideRoomInformation = () => {
            var _a, _b;
            const connectForm = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('connect-form');
            if (connectForm) {
                connectForm.style.display = 'flex';
            }
            const connectionInfo = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById('room-information');
            if (connectionInfo) {
                connectionInfo.style.display = 'none';
            }
        };
        this.handleLeaveRoom = () => {
            var _a, _b, _c, _d, _e;
            (_a = this.connection) === null || _a === void 0 ? void 0 : _a.disconnect();
            (_c = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById('message-field')) === null || _c === void 0 ? void 0 : _c.setAttribute('disabled', '');
            (_e = (_d = this.shadowRoot) === null || _d === void 0 ? void 0 : _d.getElementById('send-message-button')) === null || _e === void 0 ? void 0 : _e.setAttribute('disabled', '');
            document.title = 'SVG Editor';
            this.hideRoomInformation();
        };
        this.handleSendMessage = () => {
            var _a, _b, _c;
            const chatValue = (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('message-field')) === null || _b === void 0 ? void 0 : _b.value;
            (_c = this.connection) === null || _c === void 0 ? void 0 : _c.sendChatMessage(chatValue);
        };
        this.updateResize = () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        };
        getFonts().then(fonts => (this.availableFonts = fonts));
    }
    firstUpdated() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.updateResize();
            this.hideRoomInformation();
            const canvas = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('drawzone');
            canvas.addEventListener('mousemove', (event) => {
                var _a;
                const rect = canvas.getBoundingClientRect();
                const position = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('position');
                if (position) {
                    position.innerHTML = `x:${event.clientX - rect.left} - y:${event.clientY - rect.top}`;
                }
            });
            canvas.addEventListener('mouseout', (event) => {
                var _a;
                const position = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('position');
                if (position) {
                    position.innerHTML = '- - -';
                }
            });
            const previewLayer = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById('preview-layer');
            if (canvas) {
                new ResizeObserver(this.updateResize).observe(canvas);
                this.editor = new Editor(canvas, previewLayer, [previewLayer.offsetLeft, previewLayer.offsetTop], this);
            }
        });
    }
    render() {
        var _a, _b, _c, _d;
        const tools = getToolboxButtonsProps(this.handleSelectTool);
        return html `
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
                      placeholder=${(_a = Connection.userName) !== null && _a !== void 0 ? _a : ''}
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
                  Room ID: ${(_b = this.connection) === null || _b === void 0 ? void 0 : _b.getRoom()}
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
        .onSave=${(_c = this.editor) === null || _c === void 0 ? void 0 : _c.onSave}
        .onSelectSvgFile=${(_d = this.editor) === null || _d === void 0 ? void 0 : _d.importSVG}
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
                    @input="${() => this.handleSVGParamChange('strokeWidth', SVGParamFieldID.STROKE_WIDTH)}"
                  />
                </label>
                <label>
                  Line dash:
                  <input
                    type="text"
                    id="line-dash-input"
                    placeholder="3,3,3,12..."
                    @input="${() => this.handleSVGParamChange('lineDash', SVGParamFieldID.LINE_DASH)}"
                  />
                </label>
                <label>
                  Linecap:
                  <select
                    @input="${() => this.handleSVGParamChange('lineCap', SVGParamFieldID.LINE_CAP)}"
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
                      @change=${() => this.handleSVGParamChange('stroke', SVGParamFieldID.STROKE_COLOR)}
                    />
                  </label>
                  <label>
                    Opacity:
                    <input
                      type="range"
                      min="0"
                      step="0.1"
                      max="1"
                      @input=${(event) => {
            updateNextSiblingValue(event);
            this.handleSVGParamChange('stroke', SVGParamFieldID.STROKE_OPACITY);
        }}
                    />
                    <input
                      id="stroke-opacity-input"
                      type="number"
                      @change=${(event) => {
            updatePreviousSiblingValue(event);
            this.handleSVGParamChange('stroke', SVGParamFieldID.STROKE_OPACITY);
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
                      @input=${() => this.handleSVGParamChange('fill', SVGParamFieldID.FILL_COLOR)}
                    />
                  </label>
                  <label>
                    Opacity:
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      @input=${(event) => {
            updateNextSiblingValue(event);
            this.handleSVGParamChange('fill', SVGParamFieldID.FILL_OPACITY);
        }}
                    />
                    <input
                      id="fill-opacity-input"
                      type="number"
                      @change=${(event) => {
            updatePreviousSiblingValue(event);
            this.handleSVGParamChange('fill', SVGParamFieldID.FILL_OPACITY);
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
                  @input=${() => this.handleSVGParamChange('fontSize', SVGParamFieldID.TEXT_FONT_SIZE)}
              /></label>
              <label>
                Font family:
                <select
                  id="text-font-family-input"
                  @input=${() => this.handleSVGParamChange('fontFamily', SVGParamFieldID.TEXT_FONT_FAMILY)}
                >
                  ${this.availableFonts &&
            Array.from(this.availableFonts).map(font => html `<option value=${font}>${font}</option>`)}
                </select>
              </label>
              <label>
                Text:
                <input
                  type="text"
                  id="text-input"
                  @input=${() => this.handleSVGParamChange('text', SVGParamFieldID.TEXT)}
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
};
SVGEditor.styles = [layoutStyle, layoutHeaderStyle, layoutContentStyle];
__decorate([
    state()
], SVGEditor.prototype, "width", void 0);
__decorate([
    state()
], SVGEditor.prototype, "height", void 0);
__decorate([
    state()
], SVGEditor.prototype, "editor", void 0);
__decorate([
    state()
], SVGEditor.prototype, "connection", void 0);
__decorate([
    state()
], SVGEditor.prototype, "availableFonts", void 0);
SVGEditor = __decorate([
    customElement('svg-editor')
], SVGEditor);
export { SVGEditor };
//# sourceMappingURL=SVGEditor.js.map