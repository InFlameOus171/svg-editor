var _SVGEditor_updateChatLog, _SVGEditor_updateConnection, _SVGEditor_handleSelectTool, _SVGEditor_handleJoinRoom, _SVGEditor_handleLeaveRoom, _SVGEditor_updateResize, _SVGEditor_handlePositionChange;
import { __classPrivateFieldGet, __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Editor } from '../../util/Editor';
import { Connection } from '../../util/network';
import { layoutStyle, layoutHeaderStyle, layoutContentStyle, } from '../templates/EditorTemplate/EditorTemplate.styles';
import '../templates/EditorTemplate';
let SVGEditor = class SVGEditor extends LitElement {
    constructor() {
        var _a, _b;
        super();
        this.width = 0;
        this.height = 0;
        this.editor = null;
        this.chatLog = [];
        this.connectionStatus = (_b = (_a = this.connection) === null || _a === void 0 ? void 0 : _a.getStatus()) !== null && _b !== void 0 ? _b : 'disconnected';
        _SVGEditor_updateChatLog.set(this, (chatLog) => {
            this.chatLog = [...chatLog];
        });
        _SVGEditor_updateConnection.set(this, (status) => {
            this.connectionStatus = status;
        });
        _SVGEditor_handleSelectTool.set(this, (tool) => {
            var _a;
            (_a = this.editor) === null || _a === void 0 ? void 0 : _a.onSelectTool(tool);
        });
        _SVGEditor_handleJoinRoom.set(this, (data) => {
            const { userName, roomId } = data;
            if (this.editor && roomId && this.connection) {
                this.connection.connect(roomId, userName);
                document.title = document.title + ' | Room:' + roomId;
            }
        });
        _SVGEditor_handleLeaveRoom.set(this, () => {
            var _a;
            (_a = this.connection) === null || _a === void 0 ? void 0 : _a.disconnect();
            document.title = 'SVG Editor';
        });
        _SVGEditor_updateResize.set(this, () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        });
        _SVGEditor_handlePositionChange.set(this, (position) => (this.position = position));
        this.isLoading = true;
    }
    firstUpdated() {
        __classPrivateFieldGet(this, _SVGEditor_updateResize, "f").call(this);
    }
    updated(_changedProperties) {
        var _a, _b, _c, _d, _e;
        const svgEditor = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('editor');
        if (!this.editor && this.editor !== _changedProperties.get('editor')) {
            const drawZone = (_b = svgEditor.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById('draw-zone');
            const drawLayer = (_c = drawZone === null || drawZone === void 0 ? void 0 : drawZone.shadowRoot) === null || _c === void 0 ? void 0 : _c.getElementById('draw-layer');
            const previewLayer = (_d = drawZone === null || drawZone === void 0 ? void 0 : drawZone.shadowRoot) === null || _d === void 0 ? void 0 : _d.getElementById('preview-layer');
            if (drawLayer && previewLayer) {
                new ResizeObserver(__classPrivateFieldGet(this, _SVGEditor_updateResize, "f")).observe(drawLayer);
                const footerFields = (_e = svgEditor.shadowRoot) === null || _e === void 0 ? void 0 : _e.querySelector('footer-fields');
                this.editor = new Editor(drawLayer, previewLayer, [previewLayer.offsetLeft, previewLayer.offsetTop], svgEditor, footerFields);
                this.connection = new Connection(this.editor.deleteFromShapes, this.editor.updateShapes, this.editor.getAllShapes, this.editor.resetEditor, __classPrivateFieldGet(this, _SVGEditor_updateConnection, "f"), __classPrivateFieldGet(this, _SVGEditor_updateChatLog, "f"), this.editor.setConnection);
            }
        }
        if (this.editor && this.connection) {
            this.isLoading = false;
        }
    }
    render() {
        return html `<editor-template
      id="editor"
      .width=${this.width}
      .height=${this.height}
      .chatLog=${this.chatLog}
      .connection=${this.connection}
      .editor=${this.editor}
      .connectionStatus=${this.connectionStatus}
      .position=${this.position}
      .onJoinRoom=${__classPrivateFieldGet(this, _SVGEditor_handleJoinRoom, "f")}
      .onLeaveRoom=${__classPrivateFieldGet(this, _SVGEditor_handleLeaveRoom, "f")}
      .onMousePositionChange=${__classPrivateFieldGet(this, _SVGEditor_handlePositionChange, "f")}
      .onSelectTool=${__classPrivateFieldGet(this, _SVGEditor_handleSelectTool, "f")}
    ></editor-template>`;
    }
};
_SVGEditor_updateChatLog = new WeakMap(), _SVGEditor_updateConnection = new WeakMap(), _SVGEditor_handleSelectTool = new WeakMap(), _SVGEditor_handleJoinRoom = new WeakMap(), _SVGEditor_handleLeaveRoom = new WeakMap(), _SVGEditor_updateResize = new WeakMap(), _SVGEditor_handlePositionChange = new WeakMap();
SVGEditor.styles = [layoutStyle, layoutHeaderStyle, layoutContentStyle];
__decorate([
    state()
], SVGEditor.prototype, "isLoading", void 0);
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