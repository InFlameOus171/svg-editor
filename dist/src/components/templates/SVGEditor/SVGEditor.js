import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import '../../atoms/DrawZone';
import '../../atoms/MenuButton';
import '../../atoms/PositionInformation';
import '../../atoms/ToolboxButton';
import '../../molecules/ConnectionSection';
import '../../molecules/DialogSection';
import '../../molecules/FooterFields';
import '../../molecules/ToolBox';
import { layoutContentStyle, layoutHeaderStyle, layoutStyle, } from './SVGEditor.styles';
import { getToolboxButtonsProps } from './SVGEditor.util';
let SVGEditor = class SVGEditor extends LitElement {
    constructor(props) {
        var _a, _b;
        super();
        this.width = 0;
        this.height = 0;
        this.editor = null;
        this.chatLog = [];
        this.connectionStatus = (_b = (_a = this.connection) === null || _a === void 0 ? void 0 : _a.getStatus()) !== null && _b !== void 0 ? _b : 'disconnected';
        this.onSelectTool = props.onSelectTool;
        this.onMousePositionChange = props.onMousePositionChange;
        this.onLeaveRoom = props.onLeaveRoom;
        this.onJoinRoom = props.onJoinRoom;
        this.width = props.width;
        this.height = props.height;
        this.editor = props.editor;
        this.position = props.position;
        this.connection = props.connection;
        this.chatLog = props.chatLog;
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const tools = getToolboxButtonsProps((tools) => {
            this.onSelectTool(tools);
        });
        return html `
      <div id="content">
        <draw-zone
          id="draw-zone"
          .height=${this.height}
          .width=${this.width}
          .onPositionChange=${this.onMousePositionChange}
        ></draw-zone>
        <div id="right-main-section">
          <tool-box id="tool-box" .tools=${tools}></tool-box>
          <connection-section
            .status=${this.connectionStatus}
            .onJoinRoom=${this.onJoinRoom}
            .onLeaveRoom=${this.onLeaveRoom}
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
          .onSVGParamChange=${(_h = this.editor) === null || _h === void 0 ? void 0 : _h.setShapeParam}
        ></footer-fields>
        <position-information .position=${this.position}></position-information>
      </div>
    `;
    }
};
SVGEditor.styles = [layoutStyle, layoutHeaderStyle, layoutContentStyle];
__decorate([
    property({ type: Object })
], SVGEditor.prototype, "onSelectTool", void 0);
__decorate([
    property({ type: Object })
], SVGEditor.prototype, "onJoinRoom", void 0);
__decorate([
    property({ type: Object })
], SVGEditor.prototype, "onLeaveRoom", void 0);
__decorate([
    property({ type: Object })
], SVGEditor.prototype, "onMousePositionChange", void 0);
__decorate([
    property({ type: Number })
], SVGEditor.prototype, "width", void 0);
__decorate([
    property({ type: Number })
], SVGEditor.prototype, "height", void 0);
__decorate([
    property({ type: Object })
], SVGEditor.prototype, "editor", void 0);
__decorate([
    property({ type: Array })
], SVGEditor.prototype, "position", void 0);
__decorate([
    property({ type: Object })
], SVGEditor.prototype, "connection", void 0);
__decorate([
    property({ type: Array })
], SVGEditor.prototype, "chatLog", void 0);
__decorate([
    property({ type: String })
], SVGEditor.prototype, "connectionStatus", void 0);
SVGEditor = __decorate([
    customElement('editor-template')
], SVGEditor);
export { SVGEditor };
//# sourceMappingURL=SVGEditor.js.map