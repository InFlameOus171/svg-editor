import { SVGParamsBase } from '../../types/types';

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
