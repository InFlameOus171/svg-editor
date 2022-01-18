import { FooterFields } from '.';
import { SVGParamsBase } from '../../../types/types';
import {
  SVGParamFieldID,
  textPlaceHolder,
} from '../../../util/helper/constants';
import { normalizeColorCode } from '../../../util/helper/util';

export const updateNextSiblingValue = (event: InputEvent) => {
  if ((event.target as HTMLInputElement)?.nextElementSibling)
    (
      (event.target as HTMLInputElement).nextElementSibling as HTMLInputElement
    ).value = (event.currentTarget as HTMLInputElement)?.value;
};

export const updatePreviousSiblingValue = (event: InputEvent) => {
  if ((event.target as HTMLInputElement)?.previousElementSibling)
    (
      (event.target as HTMLInputElement)
        .previousElementSibling as HTMLInputElement
    ).value = (event.currentTarget as HTMLInputElement)?.value;
};

export const inputFieldGetterGenerator =
  (fieldRoot?: HTMLElement | null) => (id: SVGParamFieldID) => {
    return fieldRoot?.querySelector('#' + id) as HTMLInputElement | null;
  };

export const updateStyleInputFields = (
  inputFieldRef: FooterFields,
  params: SVGParamsBase
) => {
  const getFieldByParamId = inputFieldGetterGenerator(
    inputFieldRef.shadowRoot?.getElementById('footer-input')
  );
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
  const textFontFamilyInput = getFieldByParamId(
    SVGParamFieldID.TEXT_FONT_FAMILY
  );
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
    lineCapInput.value = params.lineCap ?? 'butt';
  }
  if (lineDashInput) {
    lineDashInput.value = params.lineDash?.join(',') ?? '0';
  }
  if (strokeColorInput) {
    strokeColorInput.value = strokeColor.colorCode;
  }
  if (strokeOpacityInput) {
    strokeOpacityInput.value = strokeColor.opacity;
    strokeOpacityInput.dispatchEvent(new Event('change'));
  }
  if (strokeWidthInput) {
    strokeWidthInput.value = params.strokeWidth ?? '0';
  }
  if (textFontFamilyInput) {
    textFontFamilyInput.value = params.fontFamily ?? 'Arial';
  }
  if (textFontSizeInput) {
    textFontSizeInput.value = params.fontSize?.toString() ?? '18';
  }
  if (textInput) {
    textInput.value = params.text ?? textPlaceHolder;
  }
};
