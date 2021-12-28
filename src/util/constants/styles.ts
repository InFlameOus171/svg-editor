import { SupportedStyle } from '../../types/globalStyles.types';

export const supportedStyles = [
  'fill',
  'stroke',
  'stroke-width',
  'fill-rule',
  'clip-rule',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
] as const;

export const canvasRenderingContextStylesMap: Record<
  SupportedStyle,
  keyof CanvasRenderingContextStylesTypes
> = {
  fill: 'fillStyle',
  stroke: 'strokeStyle',
  'stroke-width': 'lineWidth',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'stroke-linecap': 'lineCap',
  'stroke-linejoin': 'lineJoin',
  'stroke-miterlimit': 'miterLimit',
};

export type CanvasRenderingContextStylesTypes = {
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  fill: string;
  fillRule: string;
  clipRule: string;
  lineCap: CanvasLineCap;
  lineJoin: CanvasLineJoin;
  miterLimit: number;
};
