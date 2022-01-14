import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { Editor } from '../../../util/Editor';
import { SVGParamFieldID } from '../../../util/helper/constants.js';
import { hexToRGBA } from '../../../util/helper/util';
import { Connection } from '../../../util/network';
import '../../atoms/MenuButton';
import '../../atoms/PositionInformation';
import '../../atoms/ToolboxButton';
import '../../molecules/ConnectionSection';
import '../../molecules/DialogSection';
import '../../molecules/DrawZone';
import '../../molecules/FooterFields';
import '../../molecules/ToolBox';
import { layoutContentStyle, layoutHeaderStyle, layoutStyle, } from './SVGEditor.styles';
import { getToolboxButtonsProps } from './SVGEditor.util';
let SVGEditor = class SVGEditor extends LitElement {
    constructor() {
        var _a, _b;
        super(...arguments);
        this.width = 0;
        this.height = 0;
        this.editor = null;
        this.chatLog = [];
        this.connectionStatus = (_b = (_a = this.connection) === null || _a === void 0 ? void 0 : _a.getStatus()) !== null && _b !== void 0 ? _b : 'disconnected';
        this.updateChatLog = (chatLog) => {
            this.chatLog = [...chatLog];
        };
        this.updateConnection = (status) => {
            this.connectionStatus = status;
        };
        this.handleSelectTool = (tool) => {
            var _a;
            (_a = this.editor) === null || _a === void 0 ? void 0 : _a.onSelectTool(tool);
        };
        this.handleJoinRoom = (data) => {
            const { userName, roomId } = data;
            if (this.editor && roomId && this.connection) {
                this.connection.connect(roomId, userName);
                this.editor.setConnection(this.connection);
                document.title = document.title + ' | Room:' + roomId;
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
        this.handleLeaveRoom = () => {
            var _a;
            (_a = this.connection) === null || _a === void 0 ? void 0 : _a.disconnect();
            document.title = 'SVG Editor';
        };
        this.updateResize = () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        };
    }
    firstUpdated() {
        this.updateResize();
    }
    updated(_changedProperties) {
        var _a, _b, _c;
        if (!this.editor && this.editor !== _changedProperties.get('editor')) {
            const drawZone = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('draw-zone');
            const drawLayer = (_b = drawZone === null || drawZone === void 0 ? void 0 : drawZone.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById('draw-layer');
            const previewLayer = (_c = drawZone === null || drawZone === void 0 ? void 0 : drawZone.shadowRoot) === null || _c === void 0 ? void 0 : _c.getElementById('preview-layer');
            console.log(drawLayer, previewLayer, drawZone === null || drawZone === void 0 ? void 0 : drawZone.shadowRoot);
            if (drawLayer && previewLayer) {
                new ResizeObserver(this.updateResize).observe(drawLayer);
                this.editor = new Editor(drawLayer, previewLayer, [previewLayer.offsetLeft, previewLayer.offsetTop], this);
                this.connection = new Connection(this.editor.deleteFromShapes, this.editor.updateShapes, this.editor.getAllShapes, this.editor.resetEditor, this.updateConnection, this.updateChatLog);
            }
        }
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        const tools = getToolboxButtonsProps((tools) => {
            this.handleSelectTool(tools);
            console.log(tools);
        });
        return html `
      <div id="content">
        <draw-zone
          id="draw-zone"
          .height=${this.height}
          .width=${this.width}
          .onPositionChange=${(position) => (this.position = position)}
        ></draw-zone>
        <div id="right-main-section">
          <tool-box id="tool-box" .tools=${tools}></tool-box>
          <connection-section
            .status=${this.connectionStatus}
            .onJoinRoom=${this.handleJoinRoom}
            .onLeaveRoom=${this.handleLeaveRoom}
            .onSendMessage=${(_a = this.connection) === null || _a === void 0 ? void 0 : _a.sendChatMessage}
            .userName=${(_c = (_b = this.connection) === null || _b === void 0 ? void 0 : _b.getUserName()) !== null && _c !== void 0 ? _c : 'user_' + nanoid(6)}
            .roomId=${(_e = (_d = this.connection) === null || _d === void 0 ? void 0 : _d.getRoom()) !== null && _e !== void 0 ? _e : ''}
            .chatLog=${this.chatLog}
          ></connection-section>
        </div>
      </div>
      <dialog-section
        .onSave=${(_f = this.editor) === null || _f === void 0 ? void 0 : _f.onSave}
        .onSelectSvgFile=${(_g = this.editor) === null || _g === void 0 ? void 0 : _g.importSVG}
      ></dialog-section>
      <div id="footer">
        <footer-fields
          .handleSVGParamChange=${this.handleSVGParamChange}
        ></footer-fields>
        <position-information .position=${this.position}></position-information>
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
], SVGEditor.prototype, "position", void 0);
__decorate([
    state()
], SVGEditor.prototype, "connection", void 0);
__decorate([
    state()
], SVGEditor.prototype, "chatLog", void 0);
__decorate([
    state()
], SVGEditor.prototype, "connectionStatus", void 0);
SVGEditor = __decorate([
    customElement('svg-editor')
], SVGEditor);
export { SVGEditor };
//# sourceMappingURL=SVGEditor.js.map