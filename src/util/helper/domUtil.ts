import { SVGEditor } from '../../components/organisms/SVGEditor';
import type { SVGParamsBase } from '../../types/types';
import { SVGParamFieldID, textPlaceHolder, Tools_List } from './constants';
import { hexToRGBA, normalizeColorCode } from './util';

export const inputFieldGetterGenerator =
  (fieldRoot?: HTMLElement | null) => (id: SVGParamFieldID) => {
    return fieldRoot?.querySelector('#' + id) as HTMLInputElement | null;
  };

export const updateStyleInputFields = (
  self: SVGEditor,
  params: SVGParamsBase
) => {
  const getFieldByParamId = inputFieldGetterGenerator(
    self.shadowRoot?.getElementById('footer-input')
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

export const getToolButton = (editor: SVGEditor, tool: Tools_List) => {
  const toolBox = editor.shadowRoot?.getElementById('tool-box');
  const toolBoxButton = toolBox?.shadowRoot?.getElementById(
    'tool-box-button-' + tool
  );
  return toolBoxButton?.shadowRoot?.getElementById(tool);
};

export const setIsButtonActive = (
  editor: SVGEditor,
  tool: Tools_List,
  isActive: boolean = true
) => {
  const toolButton = getToolButton(editor, tool);
  toolButton?.setAttribute('isactive', `${isActive}`);
};

export const setIsButtonDisabled = (
  editor: SVGEditor,
  tool: Tools_List,
  isDisabled: boolean = true
) => {
  const toolButton = getToolButton(editor, tool);
  if (isDisabled) {
    toolButton?.setAttribute('disabled', '');
  } else {
    toolButton?.removeAttribute('disabled');
  }
};

export const handleUpdateSVGParameters = (target: SVGEditor) => {
  const getValueById = getElementValueByIdGenerator(target.shadowRoot);
  const fill = getValueById(SVGParamFieldID.FILL_COLOR);
  const fillOpacity = getValueById(SVGParamFieldID.FILL_OPACITY);
  const fontFamily = getValueById(SVGParamFieldID.TEXT_FONT_FAMILY);
  const fontSize = parseInt(
    getValueById(SVGParamFieldID.TEXT_FONT_SIZE) ?? '18'
  );
  const lineCap = getValueById(SVGParamFieldID.LINE_CAP) as CanvasLineCap;
  const lineDash = (getValueById(SVGParamFieldID.LINE_DASH) ?? '0')
    .split(',')
    .map(value => parseInt(value.trim()));
  const stroke = getValueById(SVGParamFieldID.STROKE_COLOR);
  const strokeOpacity = getValueById(SVGParamFieldID.STROKE_OPACITY);
  const strokeWidth = getValueById(SVGParamFieldID.STROKE_WIDTH);
  const text = getValueById(SVGParamFieldID.TEXT);
  const normalizedFill = hexToRGBA(fill ?? '#000000', fillOpacity);
  const normalizedStroke = hexToRGBA(stroke ?? '#000000', strokeOpacity);
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
  const { bBox, ...rest } = target.editor?.getSVGParams() ?? {};
  const second = Object.values(rest).sort();
  if (
    !first.every((value, index) => {
      JSON.stringify(value) === JSON.stringify(second[index]);
    })
  ) {
    target.editor?.setShapeParams(
      true,
      strokeWidth,
      normalizedStroke,
      normalizedFill,
      lineCap,
      lineDash,
      fontFamily,
      fontSize,
      text
    );
  }
};

export const getElementValueByIdGenerator =
  (shadowRoot?: ShadowRoot | null) => (id: SVGParamFieldID) => {
    return (shadowRoot?.getElementById(id) as HTMLInputElement | undefined)
      ?.value;
  };

export const measureText = (
  text: string,
  params: SVGParamsBase,
  layer?: HTMLCanvasElement | null,
  measureContext?: CanvasRenderingContext2D | null
) => {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  let context =
    layer?.getContext('2d') ?? measureContext ?? canvas.getContext('2d');
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
