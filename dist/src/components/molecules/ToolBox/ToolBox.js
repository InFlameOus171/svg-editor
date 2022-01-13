import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { toolBoxStyles } from './ToolBox.styles';
import { getButtonColumn } from './ToolBox.util';
let ToolBox = class ToolBox extends LitElement {
    constructor() {
        var _a;
        super(...arguments);
        this.tools = [];
        this.toolsLength = (_a = this.tools) === null || _a === void 0 ? void 0 : _a.length;
    }
    connectedCallback() {
        super.connectedCallback();
        this.requestUpdate();
    }
    render() {
        return html `
      <div id="column-wrapper">${getButtonColumn(this.tools)}</div>
    `;
    }
};
ToolBox.styles = toolBoxStyles;
__decorate([
    property({
        type: Array,
        hasChanged: (value, oldValue) => {
            return JSON.stringify(value) !== JSON.stringify(oldValue);
        },
    })
], ToolBox.prototype, "tools", void 0);
__decorate([
    property()
], ToolBox.prototype, "onChange", void 0);
__decorate([
    state()
], ToolBox.prototype, "toolsLength", void 0);
__decorate([
    property({ type: String })
], ToolBox.prototype, "selectedTool", void 0);
ToolBox = __decorate([
    customElement('tool-box')
], ToolBox);
export { ToolBox };
//# sourceMappingURL=ToolBox.js.map