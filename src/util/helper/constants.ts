import { SVGParamsBase } from '../../types/types';

export const acceptedTags = [
  'circle',
  'ellipse',
  'rect',
  'polyline',
  'line',
  'path',
];

export const highlightStyle: SVGParamsBase = {
  stroke: 'rgba(255,0,0,.4)',
  lineDash: [12],
  strokeWidth: '5',
};

export const textPlaceHolder: string = 'Input text...';

export enum Tools_List {
  DRAW,
  LINE,
  RECT,
  ELLIPSE,
  SELECT,
  TEXT,
  MOVE,
  DELETE,
}

export enum SVGParamFieldID {
  TEXT_FONT_FAMILY = 'text-font-family-input',
  TEXT_FONT_SIZE = 'text-font-size-input',
  TEXT = 'text-input',
  STROKE_WIDTH = 'stroke-width-input',
  STROKE_COLOR = 'stroke-color-input',
  STROKE_OPACITY = 'stroke-opacity-input',
  FILL_COLOR = 'fill-color-input',
  FILL_OPACITY = 'fill-opacity-input',
  LINE_CAP = 'line-cap-input',
  LINE_DASH = 'line-dash-input',
}
