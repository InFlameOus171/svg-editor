import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { toolBoxStyles } from './ToolBox.styles';
let ToolBox = class ToolBox extends LitElement {
    constructor() {
        super(...arguments);
        this.tools = [];
    }
    render() {
        var _a;
        return html `
      <div id="column-wrapper">
        ${(_a = this.tools) === null || _a === void 0 ? void 0 : _a.map(tool => html `
            <span class="row">
              <toolbox-button
                id=${'tool-box-button-' + tool.buttonId}
                .onClick=${tool.onClick}
                .buttonId=${tool.buttonId}
                .toolName=${tool.toolName}
                .icon=${tool.icon}
                .disabled=${tool.disabled}
              >
              </toolbox-button>
            </span>
          `)}
      </div>
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
ToolBox = __decorate([
    customElement('tool-box')
], ToolBox);
export { ToolBox };
//# sourceMappingURL=ToolBox.js.map