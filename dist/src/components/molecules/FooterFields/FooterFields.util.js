import { SVGParamFieldID, textPlaceHolder, } from '../../../util/helper/constants';
import { normalizeColorCode } from '../../../util/helper/util';
export const updateNextSiblingValue = (event) => {
    var _a, _b;
    if ((_a = event.target) === null || _a === void 0 ? void 0 : _a.nextElementSibling)
        event.target.nextElementSibling.value = (_b = event.currentTarget) === null || _b === void 0 ? void 0 : _b.value;
};
export const updatePreviousSiblingValue = (event) => {
    var _a, _b;
    if ((_a = event.target) === null || _a === void 0 ? void 0 : _a.previousElementSibling)
        event.target
            .previousElementSibling.value = (_b = event.currentTarget) === null || _b === void 0 ? void 0 : _b.value;
};
export const inputFieldGetterGenerator = (fieldRoot) => (id) => {
    return fieldRoot === null || fieldRoot === void 0 ? void 0 : fieldRoot.querySelector('#' + id);
};
export const updateStyleInputFields = (inputFieldRef, params) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const getFieldByParamId = inputFieldGetterGenerator((_a = inputFieldRef.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('footer-input'));
    const defaultColor = { colorCode: '#000000', opacity: '1' };
    const strokeColor = params.stroke
        ? normalizeColorCode(params.stroke)
        : defaultColor;
    const fillColor = params.fill
        ? normalizeColorCode(params.fill)
        : defaultColor;
    const fillColorInput = getFieldByParamId(SVGParamFieldID.FILL_COLOR);
    const fillOpacityInput = getFieldByParamId(SVGParamFieldID.FILL_OPACITY);
    const lineCapInput = getFieldByParamId(SVGParamFieldID.LINE_CAP);
    const lineDashInput = getFieldByParamId(SVGParamFieldID.LINE_DASH);
    const strokeColorInput = getFieldByParamId(SVGParamFieldID.STROKE_COLOR);
    const strokeOpacityInput = getFieldByParamId(SVGParamFieldID.STROKE_OPACITY);
    const strokeWidthInput = getFieldByParamId(SVGParamFieldID.STROKE_WIDTH);
    const textFontFamilyInput = getFieldByParamId(SVGParamFieldID.TEXT_FONT_FAMILY);
    const textFontSizeInput = getFieldByParamId(SVGParamFieldID.TEXT_FONT_SIZE);
    const textInput = getFieldByParamId(SVGParamFieldID.TEXT);
    if (fillColorInput) {
        fillColorInput.value = fillColor.colorCode;
    }
    if (fillOpacityInput) {
        fillOpacityInput.value = fillColor.opacity;
        fillOpacityInput.dispatchEvent(new Event('change'));
    }
    if (lineCapInput) {
        lineCapInput.value = (_b = params.lineCap) !== null && _b !== void 0 ? _b : 'butt';
    }
    if (lineDashInput) {
        lineDashInput.value = (_d = (_c = params.lineDash) === null || _c === void 0 ? void 0 : _c.join(',')) !== null && _d !== void 0 ? _d : '0';
    }
    if (strokeColorInput) {
        strokeColorInput.value = strokeColor.colorCode;
    }
    if (strokeOpacityInput) {
        strokeOpacityInput.value = strokeColor.opacity;
        strokeOpacityInput.dispatchEvent(new Event('change'));
    }
    if (strokeWidthInput) {
        strokeWidthInput.value = (_e = params.strokeWidth) !== null && _e !== void 0 ? _e : '0';
    }
    if (textFontFamilyInput) {
        textFontFamilyInput.value = (_f = params.fontFamily) !== null && _f !== void 0 ? _f : 'Arial';
    }
    if (textFontSizeInput) {
        textFontSizeInput.value = (_h = (_g = params.fontSize) === null || _g === void 0 ? void 0 : _g.toString()) !== null && _h !== void 0 ? _h : '18';
    }
    if (textInput) {
        textInput.value = (_j = params.text) !== null && _j !== void 0 ? _j : textPlaceHolder;
    }
};
//# sourceMappingURL=FooterFields.util.js.map