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
  stroke: 'red',
  lineDash: [10, 10],
  strokeWidth: '5',
};
