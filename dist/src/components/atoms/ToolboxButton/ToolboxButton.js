import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { toolBoxButtonStyles } from './ToolboxButton.styles';
let ToolboxButton = class ToolboxButton extends LitElement {
    constructor(props) {
        super();
        if (props) {
            this.buttonId = props.buttonId;
            this.onClick = props.onClick;
            this.toolName = props.toolName;
            this.icon = props.icon;
            this.disabled = props.disabled;
        }
    }
    firstUpdated() {
        var _a;
        const tooltip = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('button-tooltip');
        if (tooltip) {
            const toolTipText = tooltip.querySelector('#tooltiptext');
            tooltip === null || tooltip === void 0 ? void 0 : tooltip.addEventListener('mousemove', (event) => {
                if (tooltip.matches(':hover')) {
                    const x = event.clientX;
                    const y = event.clientY;
                    if (toolTipText) {
                        toolTipText.style.top = y + 20 + 'px';
                        toolTipText.style.left = x + 15 + 'px';
                    }
                }
            });
        }
    }
    render() {
        var _a, _b, _c, _d;
        return html ` <div class="tooltip" id="button-tooltip">
      <button
        id=${(_a = this.buttonId) !== null && _a !== void 0 ? _a : this.toolName + Date.now().toString()}
        @click=${() => { var _a; return this.buttonId && ((_a = this.onClick) === null || _a === void 0 ? void 0 : _a.call(this, this.buttonId)); }}
        .disabled=${(_b = this.disabled) !== null && _b !== void 0 ? _b : false}
      >
        ${this.icon
            ? html `
          <img
          alt=${(_c = this.toolName) !== null && _c !== void 0 ? _c : 'tool'}
          class=${((_d = this.className) !== null && _d !== void 0 ? _d : '') + 'tool-icon'}
          onerror=${`this.onerror = null; this.src="public/images/${this.icon[1]}"`}
          src=${this.icon[0] + this.icon[1]}>
          </img>`
            : this.toolName}
      </button>
      <span id="tooltiptext"> ${this.toolName} </span>
    </div>`;
    }
};
ToolboxButton.styles = [toolBoxButtonStyles];
__decorate([
    property({ type: String })
], ToolboxButton.prototype, "buttonId", void 0);
__decorate([
    property()
], ToolboxButton.prototype, "onClick", void 0);
__decorate([
    property({ type: String })
], ToolboxButton.prototype, "toolName", void 0);
__decorate([
    property({ type: Array })
], ToolboxButton.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], ToolboxButton.prototype, "disabled", void 0);
ToolboxButton = __decorate([
    customElement('toolbox-button')
], ToolboxButton);
export { ToolboxButton };
//# sourceMappingURL=ToolboxButton.js.map