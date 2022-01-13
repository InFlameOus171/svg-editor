import { __rest } from "tslib";
import { SVGParamFieldID, textPlaceHolder } from './constants';
import { hexToRGBA, normalizeColorCode } from './util';
export const inputFieldGetterGenerator = (fieldRoot) => (id) => {
    return fieldRoot === null || fieldRoot === void 0 ? void 0 : fieldRoot.querySelector('#' + id);
};
export const updateStyleInputFields = (self, params) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const getFieldByParamId = inputFieldGetterGenerator((_a = self.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('footer-input'));
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
export const getToolButton = (editor, tool) => {
    var _a, _b, _c;
    const toolBox = (_a = editor.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('tool-box');
    const toolBoxButton = (_b = toolBox === null || toolBox === void 0 ? void 0 : toolBox.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById('tool-box-button-' + tool);
    return (_c = toolBoxButton === null || toolBoxButton === void 0 ? void 0 : toolBoxButton.shadowRoot) === null || _c === void 0 ? void 0 : _c.getElementById(tool);
};
export const setIsButtonActive = (editor, tool, isActive = true) => {
    const toolButton = getToolButton(editor, tool);
    toolButton === null || toolButton === void 0 ? void 0 : toolButton.setAttribute('isactive', `${isActive}`);
};
export const setIsButtonDisabled = (editor, tool, isDisabled = true) => {
    const toolButton = getToolButton(editor, tool);
    if (isDisabled) {
        toolButton === null || toolButton === void 0 ? void 0 : toolButton.setAttribute('disabled', '');
    }
    else {
        toolButton === null || toolButton === void 0 ? void 0 : toolButton.removeAttribute('disabled');
    }
};
export const handleUpdateSVGParameters = (target) => {
    var _a, _b, _c, _d, _e;
    const getValueById = getElementValueByIdGenerator(target.shadowRoot);
    const fill = getValueById(SVGParamFieldID.FILL_COLOR);
    const fillOpacity = getValueById(SVGParamFieldID.FILL_OPACITY);
    const fontFamily = getValueById(SVGParamFieldID.TEXT_FONT_FAMILY);
    const fontSize = parseInt((_a = getValueById(SVGParamFieldID.TEXT_FONT_SIZE)) !== null && _a !== void 0 ? _a : '18');
    const lineCap = getValueById(SVGParamFieldID.LINE_CAP);
    const lineDash = ((_b = getValueById(SVGParamFieldID.LINE_DASH)) !== null && _b !== void 0 ? _b : '0')
        .split(',')
        .map(value => parseInt(value.trim()));
    const stroke = getValueById(SVGParamFieldID.STROKE_COLOR);
    const strokeOpacity = getValueById(SVGParamFieldID.STROKE_OPACITY);
    const strokeWidth = getValueById(SVGParamFieldID.STROKE_WIDTH);
    const text = getValueById(SVGParamFieldID.TEXT);
    const normalizedFill = hexToRGBA(fill !== null && fill !== void 0 ? fill : '#000000', fillOpacity);
    const normalizedStroke = hexToRGBA(stroke !== null && stroke !== void 0 ? stroke : '#000000', strokeOpacity);
    const first = [
        strokeWidth,
        normalizedStroke,
        normalizedFill,
        lineCap,
        lineDash,
        fontFamily,
        fontSize,
        text,
    ].sort();
    const _f = (_d = (_c = target.editor) === null || _c === void 0 ? void 0 : _c.getSVGParams()) !== null && _d !== void 0 ? _d : {}, { bBox } = _f, rest = __rest(_f, ["bBox"]);
    const second = Object.values(rest).sort();
    if (!first.every((value, index) => {
        JSON.stringify(value) === JSON.stringify(second[index]);
    })) {
        (_e = target.editor) === null || _e === void 0 ? void 0 : _e.setShapeParams(true, strokeWidth, normalizedStroke, normalizedFill, lineCap, lineDash, fontFamily, fontSize, text);
    }
};
export const getElementValueByIdGenerator = (shadowRoot) => (id) => {
    var _a;
    return (_a = shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.getElementById(id)) === null || _a === void 0 ? void 0 : _a.value;
};
export const measureText = (text, params, layer, measureContext) => {
    var _a, _b;
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    let context = (_b = (_a = layer === null || layer === void 0 ? void 0 : layer.getContext('2d')) !== null && _a !== void 0 ? _a : measureContext) !== null && _b !== void 0 ? _b : canvas.getContext('2d');
    if (!context) {
        return;
    }
    context.font = `${params.fontSize}px ${params.fontFamily}`;
    if (params.stroke) {
        context.strokeStyle = params.stroke;
    }
    if (params.lineDash) {
        context.setLineDash(params.lineDash);
    }
    if (params.lineCap) {
        context.lineCap = params.lineCap;
    }
    const size = context.measureText(text);
    const width = size.width;
    const height = size.fontBoundingBoxAscent + size.fontBoundingBoxDescent;
    document.body.removeChild(canvas);
    return { width, height };
};
//# sourceMappingURL=domUtil.js.map