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
  stroke: 'rgba(255,0,0,1)',
  lineDash: [10, 10],
  strokeWidth: '5',
};

export const textPlaceHolder: string = 'Input text...';
