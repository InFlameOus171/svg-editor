var _FooterFields_handleSVGParamChange;
import { __classPrivateFieldGet, __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getFonts } from '../../../util/helper/availableFonts';
import { SVGParamFieldID } from '../../../util/helper/constants';
import { hexToRGBA } from '../../../util/helper/util';
import { footerFieldsStyles } from './FooterFields.styles';
import { updateNextSiblingValue, updatePreviousSiblingValue, } from './FooterFields.util';
let FooterFields = class FooterFields extends LitElement {
    constructor() {
        super();
        _FooterFields_handleSVGParamChange.set(this, (field, targetId) => {
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
            (_o = this.onSVGParamChange) === null || _o === void 0 ? void 0 : _o.call(this, field, value);
        });
        getFonts().then(fonts => (this.availableFonts = fonts));
    }
    render() {
        return html ` <fieldset id="footer-input">
      <div id="left-input-section">
        <div>
          <label>
            Stroke width:
            <input
              type="number"
              id="stroke-width-input"
              @input="${() => {
            var _a;
            return (_a = __classPrivateFieldGet(this, _FooterFields_handleSVGParamChange, "f")) === null || _a === void 0 ? void 0 : _a.call(this, 'strokeWidth', SVGParamFieldID.STROKE_WIDTH);
        }}"
            />
          </label>
          <label>
            Line dash:
            <input
              type="text"
              id="line-dash-input"
              placeholder="3,3,3,12..."
              @input="${() => {
            var _a;
            return (_a = __classPrivateFieldGet(this, _FooterFields_handleSVGParamChange, "f")) === null || _a === void 0 ? void 0 : _a.call(this, 'lineDash', SVGParamFieldID.LINE_DASH);
        }}"
            />
          </label>
          <label>
            Linecap:
            <select
              @input="${() => {
            var _a;
            return (_a = __classPrivateFieldGet(this, _FooterFields_handleSVGParamChange, "f")) === null || _a === void 0 ? void 0 : _a.call(this, 'lineCap', SVGParamFieldID.LINE_CAP);
        }}"
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
                @change=${() => {
            var _a;
            return (_a = __classPrivateFieldGet(this, _FooterFields_handleSVGParamChange, "f")) === null || _a === void 0 ? void 0 : _a.call(this, 'stroke', SVGParamFieldID.STROKE_COLOR);
        }}
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
            var _a;
            updateNextSiblingValue(event);
            (_a = __classPrivateFieldGet(this, _FooterFields_handleSVGParamChange, "f")) === null || _a === void 0 ? void 0 : _a.call(this, 'stroke', SVGParamFieldID.STROKE_OPACITY);
        }}
              />
              <input
                id="stroke-opacity-input"
                type="number"
                @change=${(event) => {
            var _a;
            updatePreviousSiblingValue(event);
            (_a = __classPrivateFieldGet(this, _FooterFields_handleSVGParamChange, "f")) === null || _a === void 0 ? void 0 : _a.call(this, 'stroke', SVGParamFieldID.STROKE_OPACITY);
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
                @input=${() => {
            var _a;
            return (_a = __classPrivateFieldGet(this, _FooterFields_handleSVGParamChange, "f")) === null || _a === void 0 ? void 0 : _a.call(this, 'fill', SVGParamFieldID.FILL_COLOR);
        }}
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
            var _a;
            updateNextSiblingValue(event);
            (_a = __classPrivateFieldGet(this, _FooterFields_handleSVGParamChange, "f")) === null || _a === void 0 ? void 0 : _a.call(this, 'fill', SVGParamFieldID.FILL_OPACITY);
        }}
              />
              <input
                id="fill-opacity-input"
                type="number"
                @change=${(event) => {
            var _a;
            updatePreviousSiblingValue(event);
            (_a = __classPrivateFieldGet(this, _FooterFields_handleSVGParamChange, "f")) === null || _a === void 0 ? void 0 : _a.call(this, 'fill', SVGParamFieldID.FILL_OPACITY);
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
            @input=${() => {
            var _a;
            return (_a = __classPrivateFieldGet(this, _FooterFields_handleSVGParamChange, "f")) === null || _a === void 0 ? void 0 : _a.call(this, 'fontSize', SVGParamFieldID.TEXT_FONT_SIZE);
        }}
        /></label>
        <label>
          Font family:
          <select
            id="text-font-family-input"
            @input=${() => {
            var _a;
            return (_a = __classPrivateFieldGet(this, _FooterFields_handleSVGParamChange, "f")) === null || _a === void 0 ? void 0 : _a.call(this, 'fontFamily', SVGParamFieldID.TEXT_FONT_FAMILY);
        }}
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
            @input=${() => { var _a; return (_a = __classPrivateFieldGet(this, _FooterFields_handleSVGParamChange, "f")) === null || _a === void 0 ? void 0 : _a.call(this, 'text', SVGParamFieldID.TEXT); }}
          />
        </label>
      </fieldset>
    </fieldset>`;
    }
};
_FooterFields_handleSVGParamChange = new WeakMap();
FooterFields.styles = [footerFieldsStyles];
__decorate([
    state()
], FooterFields.prototype, "availableFonts", void 0);
__decorate([
    property()
], FooterFields.prototype, "onSVGParamChange", void 0);
FooterFields = __decorate([
    customElement('footer-fields')
], FooterFields);
export { FooterFields };
//# sourceMappingURL=FooterFields.js.map