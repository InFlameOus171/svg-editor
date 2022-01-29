import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { drawZoneStyles } from './DrawZone.styles';
let DrawZone = class DrawZone extends LitElement {
    constructor() {
        super(...arguments);
        this.height = 0;
        this.width = 0;
    }
    firstUpdated(_changedProperties) {
        var _a;
        const drawLayer = (_a = this === null || this === void 0 ? void 0 : this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('draw-layer');
        drawLayer.addEventListener('mousemove', (event) => {
            var _a;
            const rect = drawLayer.getBoundingClientRect();
            (_a = this.onPositionChange) === null || _a === void 0 ? void 0 : _a.call(this, [
                event.clientX - rect.left,
                event.clientY - rect.top,
            ]);
        });
        drawLayer.addEventListener('mouseout', (event) => {
            var _a;
            (_a = this.onPositionChange) === null || _a === void 0 ? void 0 : _a.call(this, [0, 0]);
        });
    }
    render() {
        return html `<canvas
        id="draw-layer"
        height=${this.height}
        width=${this.width}
      ></canvas>
      <canvas
        id="preview-layer"
        height=${this.height}
        width=${this.width}
      ></canvas>`;
    }
};
DrawZone.styles = [drawZoneStyles];
__decorate([
    property({ type: Number })
], DrawZone.prototype, "height", void 0);
__decorate([
    property({ type: Number })
], DrawZone.prototype, "width", void 0);
__decorate([
    property({ type: String })
], DrawZone.prototype, "onPositionChange", void 0);
DrawZone = __decorate([
    customElement('draw-zone')
], DrawZone);
export { DrawZone };
//# sourceMappingURL=DrawZone.js.map