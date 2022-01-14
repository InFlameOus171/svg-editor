import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getFonts } from '../../../util/helper/availableFonts';
import { SVGParamFieldID } from '../../../util/helper/constants';
import { updateNextSiblingValue, updatePreviousSiblingValue, } from '../../../util/helper/util';
import { footerFieldsStyles } from './FooterFields.styles';
let FooterFields = class FooterFields extends LitElement {
    constructor() {
        super();
        getFonts().then(fonts => (this.availableFonts = fonts));
    }
    render() {
        return html ` <fieldset id="footer-fields">
      <div id="footer-input">
        <div id="left-input-section">
          <div>
            <label>
              Stroke width:
              <input
                type="number"
                id="stroke-width-input"
                @input="${() => {
            var _a;
            return (_a = this.handleSVGParamChange) === null || _a === void 0 ? void 0 : _a.call(this, 'strokeWidth', SVGParamFieldID.STROKE_WIDTH);
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
            return (_a = this.handleSVGParamChange) === null || _a === void 0 ? void 0 : _a.call(this, 'lineDash', SVGParamFieldID.LINE_DASH);
        }}"
              />
            </label>
            <label>
              Linecap:
              <select
                @input="${() => {
            var _a;
            return (_a = this.handleSVGParamChange) === null || _a === void 0 ? void 0 : _a.call(this, 'lineCap', SVGParamFieldID.LINE_CAP);
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
            return (_a = this.handleSVGParamChange) === null || _a === void 0 ? void 0 : _a.call(this, 'stroke', SVGParamFieldID.STROKE_COLOR);
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
            (_a = this.handleSVGParamChange) === null || _a === void 0 ? void 0 : _a.call(this, 'stroke', SVGParamFieldID.STROKE_OPACITY);
        }}
                />
                <input
                  id="stroke-opacity-input"
                  type="number"
                  @change=${(event) => {
            var _a;
            updatePreviousSiblingValue(event);
            (_a = this.handleSVGParamChange) === null || _a === void 0 ? void 0 : _a.call(this, 'stroke', SVGParamFieldID.STROKE_OPACITY);
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
            return (_a = this.handleSVGParamChange) === null || _a === void 0 ? void 0 : _a.call(this, 'fill', SVGParamFieldID.FILL_COLOR);
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
            (_a = this.handleSVGParamChange) === null || _a === void 0 ? void 0 : _a.call(this, 'fill', SVGParamFieldID.FILL_OPACITY);
        }}
                />
                <input
                  id="fill-opacity-input"
                  type="number"
                  @change=${(event) => {
            var _a;
            updatePreviousSiblingValue(event);
            (_a = this.handleSVGParamChange) === null || _a === void 0 ? void 0 : _a.call(this, 'fill', SVGParamFieldID.FILL_OPACITY);
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
            return (_a = this.handleSVGParamChange) === null || _a === void 0 ? void 0 : _a.call(this, 'fontSize', SVGParamFieldID.TEXT_FONT_SIZE);
        }}
          /></label>
          <label>
            Font family:
            <select
              id="text-font-family-input"
              @input=${() => {
            var _a;
            return (_a = this.handleSVGParamChange) === null || _a === void 0 ? void 0 : _a.call(this, 'fontFamily', SVGParamFieldID.TEXT_FONT_FAMILY);
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
              @input=${() => { var _a; return (_a = this.handleSVGParamChange) === null || _a === void 0 ? void 0 : _a.call(this, 'text', SVGParamFieldID.TEXT); }}
            />
          </label>
        </fieldset>
      </div>
    </fieldset>`;
    }
};
FooterFields.styles = [footerFieldsStyles];
__decorate([
    state()
], FooterFields.prototype, "availableFonts", void 0);
__decorate([
    property()
], FooterFields.prototype, "handleSVGParamChange", void 0);
FooterFields = __decorate([
    customElement('footer-fields')
], FooterFields);
export { FooterFields };
//# sourceMappingURL=FooterFields.js.map