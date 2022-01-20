import { SVGParamFieldID, textPlaceHolder } from '../../helper/constants';
export const paramFieldStateHandler = (footerFields) => ({
    setAreFieldsEnabled: (fieldNames, isEnabled = true) => {
        fieldNames.forEach(fieldName => {
            var _a, _b, _c, _d;
            const doesInputRangeTwoFields = [
                SVGParamFieldID.STROKE_OPACITY,
                SVGParamFieldID.FILL_OPACITY,
            ].includes(fieldName);
            const paramField = (_b = (_a = footerFields === null || footerFields === void 0 ? void 0 : footerFields.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('footer-input')) === null || _b === void 0 ? void 0 : _b.querySelector('#' + fieldName);
            if (isEnabled) {
                paramField === null || paramField === void 0 ? void 0 : paramField.removeAttribute('disabled');
                if (doesInputRangeTwoFields) {
                    (_c = paramField === null || paramField === void 0 ? void 0 : paramField.previousElementSibling) === null || _c === void 0 ? void 0 : _c.removeAttribute('disabled');
                }
            }
            else {
                paramField === null || paramField === void 0 ? void 0 : paramField.setAttribute('disabled', '');
                if (doesInputRangeTwoFields) {
                    (_d = paramField === null || paramField === void 0 ? void 0 : paramField.previousElementSibling) === null || _d === void 0 ? void 0 : _d.setAttribute('disabled', '');
                }
            }
        });
    },
});
export const setTextParamsSourceVisibility = (footerFields, isVisible) => {
    var _a;
    const source = (_a = footerFields === null || footerFields === void 0 ? void 0 : footerFields.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('right-input-section');
    if (source) {
        source.style.visibility = isVisible ? 'visible' : 'hidden';
        isVisible
            ? source.removeAttribute('disabled')
            : source.setAttribute('disabled', '');
    }
};
export const getTextFromSource = (svgEditor) => {
    var _a, _b, _c, _d;
    const source = (_a = svgEditor === null || svgEditor === void 0 ? void 0 : svgEditor.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('right-input-section');
    const text = (_c = (_b = source === null || source === void 0 ? void 0 : source.querySelector('#text-input')) === null || _b === void 0 ? void 0 : _b.getAttribute('value')) !== null && _c !== void 0 ? _c : textPlaceHolder;
    (_d = source === null || source === void 0 ? void 0 : source.querySelector('#text-input')) === null || _d === void 0 ? void 0 : _d.setAttribute('value', text);
    return text;
};
//# sourceMappingURL=TextTool.util.js.map