import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import '../../atoms/DrawZone';
import '../../atoms/PositionInformation';
import '../../atoms/ToolboxButton';
import '../../molecules/ConnectionSection';
import '../../molecules/DialogSection';
import '../../molecules/FooterFields';
import '../../molecules/ToolBox';
import { layoutContentStyle, layoutHeaderStyle, layoutStyle, } from './EditorTemplate.styles';
import { getToolboxButtonsProps } from './EditorTemplate.util';
let EditorTemplate = class EditorTemplate extends LitElement {
    constructor(props) {
        var _a, _b;
        super();
        this.width = 0;
        this.height = 0;
        this.editor = null;
        this.chatLog = [];
        this.connectionStatus = (_b = (_a = this.connection) === null || _a === void 0 ? void 0 : _a.getStatus()) !== null && _b !== void 0 ? _b : 'disconnected';
        if (props) {
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
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const tools = getToolboxButtonsProps((tools) => {
            var _a;
            (_a = this.onSelectTool) === null || _a === void 0 ? void 0 : _a.call(this, tools);
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
        .onSelectSvgFile=${(_g = this.editor) === null || _g === void 0 ? void 0 : _g.onImportSVG}
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
EditorTemplate.styles = [layoutStyle, layoutHeaderStyle, layoutContentStyle];
__decorate([
    property({ type: Object })
], EditorTemplate.prototype, "onSelectTool", void 0);
__decorate([
    property({ type: Object })
], EditorTemplate.prototype, "onJoinRoom", void 0);
__decorate([
    property({ type: Object })
], EditorTemplate.prototype, "onLeaveRoom", void 0);
__decorate([
    property({ type: Object })
], EditorTemplate.prototype, "onMousePositionChange", void 0);
__decorate([
    property({ type: Number })
], EditorTemplate.prototype, "width", void 0);
__decorate([
    property({ type: Number })
], EditorTemplate.prototype, "height", void 0);
__decorate([
    property({ type: Object })
], EditorTemplate.prototype, "editor", void 0);
__decorate([
    property({ type: Array })
], EditorTemplate.prototype, "position", void 0);
__decorate([
    property({ type: Object })
], EditorTemplate.prototype, "connection", void 0);
__decorate([
    property({ type: Array })
], EditorTemplate.prototype, "chatLog", void 0);
__decorate([
    property({ type: String })
], EditorTemplate.prototype, "connectionStatus", void 0);
EditorTemplate = __decorate([
    customElement('editor-template')
], EditorTemplate);
export { EditorTemplate };
//# sourceMappingURL=EditorTemplate.js.map