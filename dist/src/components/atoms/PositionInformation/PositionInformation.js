import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { positionInformationStyles } from './PositionInformation.styles';
let PositionInformation = class PositionInformation extends LitElement {
    constructor() {
        super(...arguments);
        this.render = () => {
            var _a, _b, _c, _d;
            return html `<span id="position"
      >${'x: ' +
                ((_b = (_a = this.position) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : 0) +
                ' - y: ' +
                ((_d = (_c = this.position) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : 0)}</span
    >`;
        };
    }
};
PositionInformation.styles = [positionInformationStyles];
__decorate([
    property({ type: Array })
], PositionInformation.prototype, "position", void 0);
PositionInformation = __decorate([
    customElement('position-information')
], PositionInformation);
export { PositionInformation };
//# sourceMappingURL=PositionInformation.js.map