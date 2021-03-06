import type { ShapeType } from '../types/typeGuards.types';
import type { SVGParamsBase } from '../types/types';
import { typeOfShape } from './helper/typeguards';
import { Ellipse } from './shapes/Ellipse/Ellipse';
import { Freehand } from './shapes/Freehand/Freehand';
import { Line } from './shapes/Line/Line';
import { Path } from './shapes/Path/Path';
import { Rectangle } from './shapes/Rectangle/Rectangle';
import { TextShape } from './shapes/Text/Text';

const Pen = {
  draw: (
    shape: ShapeType,
    svgParams: Partial<SVGParamsBase> | undefined,
    context: CanvasRenderingContext2D
  ) => {
    const shapeType = typeOfShape(shape);
    switch (shapeType) {
      case 'Ellipse':
        Pen.drawEllipse(shape as Ellipse, context, svgParams);
        break;
      case 'Rectangle':
        Pen.drawRectangle(shape as Rectangle, context, svgParams);
        break;
      case 'Line':
        Pen.drawLine(shape as Line, context, svgParams);
        break;
      case 'Freehand':
        Pen.drawFreehand(shape as Freehand, context, svgParams);
        break;
      case 'Path':
        Pen.drawPath(shape as Path, context, svgParams);
        break;
      case 'TextShape':
        Pen.drawText(shape as TextShape, context, svgParams);
        break;
    }
  },

  setStyles: (
    pathConstructor: Path2D,
    styles: SVGParamsBase,
    context: CanvasRenderingContext2D
  ) => {
    const { fill, stroke, strokeWidth, transformMatrix, lineCap, lineDash } =
      styles;
    if (transformMatrix) {
      const newPath = new Path2D();
      newPath.addPath(pathConstructor, transformMatrix);
      pathConstructor = newPath;
    }
    if (lineDash) {
      context.setLineDash(lineDash);
    }
    if (lineCap) {
      context.lineCap = lineCap;
    }
    if (!stroke && !fill && !strokeWidth) {
      context.stroke(pathConstructor);
      context.fill(pathConstructor);
      return pathConstructor;
    }
    if (strokeWidth) {
      context.lineWidth = parseFloat(strokeWidth);
    }
    if (fill && fill !== 'none') {
      context.fillStyle = fill;
    }
    if (stroke && stroke !== 'null') {
      context.strokeStyle = stroke;
    }
    return pathConstructor;
  },

  drawPath: (
    path: Path,
    context?: CanvasRenderingContext2D | null,
    svgParams?: Partial<SVGParamsBase>
  ) => {
    let pathConstructor = new Path2D(path.toString());
    if (context) {
      const params = {
        ...path.getSvgParams(),
        ...svgParams,
      };
      pathConstructor = Pen.setStyles(pathConstructor, params, context);
      params.stroke && context.stroke(pathConstructor);
      params.fill && context.fill(pathConstructor);
      context.closePath();
    }
  },

  drawText: (
    textShape: TextShape,
    context?: CanvasRenderingContext2D | null,
    svgParams?: SVGParamsBase
  ) => {
    const { position, ...params } = textShape.toSVGTextParams();
    const { text, fontSize, fontFamily, ...rest } = svgParams ?? params;

    if (context && text) {
      if (rest.stroke) {
        context.strokeStyle = rest.stroke;
      }
      if (params.lineDash) {
        context.setLineDash(params.lineDash);
      }
      if (params.lineCap) {
        context.lineCap = params.lineCap;
      }
      if (params.strokeWidth) {
        context.lineWidth = parseInt(params.strokeWidth);
      }
      context.fillStyle = rest.fill ?? '#000000';
      context.font = (fontSize?.toString() ?? '12').concat(
        'px ',
        (fontFamily ?? 'Arial').toLowerCase()
      );
      context.fillText(text, ...position);
      context.strokeText(text, ...position);
      context?.closePath();
    }
  },

  drawFreehand: (
    freehand: Freehand,
    context?: CanvasRenderingContext2D | null,
    svgParams?: Partial<SVGParamsBase>
  ) => {
    let pathConstructor = new Path2D();
    const points = freehand.getPoints();
    const start = points[0];
    const rest = points.slice(1);
    const params = svgParams ?? freehand.getSvgParams();
    if (context) {
      Pen.setStyles(pathConstructor, params, context);
      pathConstructor.moveTo(...start);
      rest.forEach(point => {
        pathConstructor.lineTo(...point);
      });
      context?.stroke(pathConstructor);
      context?.closePath();
    }
  },

  drawLine: (
    line: Line,
    context?: CanvasRenderingContext2D | null,
    svgParams?: Partial<SVGParamsBase>
  ) => {
    let pathConstructor = new Path2D();
    if (context) {
      const params = svgParams ?? line.getSvgParams();
      Pen.setStyles(pathConstructor, params, context);
      const { fill, stroke } = params;
      pathConstructor.moveTo(...line.points[0]);
      pathConstructor.lineTo(...line.points[1]);
      stroke && context.stroke(pathConstructor);
      fill && context.fill(pathConstructor);
      context.closePath();
    }
  },

  drawRectangle: (
    rectangle: Rectangle,
    context?: CanvasRenderingContext2D | null,
    svgParams?: Partial<SVGParamsBase>
  ) => {
    let path = new Path2D();
    const { x, y, width, height, ...rest } = rectangle.toSvgRectParams();
    const values = [x, y, width, height].map(parseFloat) as [
      number,
      number,
      number,
      number
    ];
    if (context) {
      const params = svgParams ?? rest;
      path = Pen.setStyles(path, params, context);
      const { fill, stroke } = params;
      path.rect(...values);
      stroke && context.stroke(path);
      fill && context.fill(path);
      context.closePath();
    }
  },

  drawEllipse: (
    ellipse: Ellipse,
    context?: CanvasRenderingContext2D | null,
    svgParams?: Partial<SVGParamsBase>
  ) => {
    const path = new Path2D();
    const { cx, cy, rx, ry, ...rest } = ellipse.toSVGEllipseParams();
    const values = [cx, cy, rx, ry].map(parseFloat) as [
      number,
      number,
      number,
      number
    ];
    if (context) {
      const params = svgParams ?? rest;
      Pen.setStyles(path, params, context);
      const { fill, stroke } = params;

      path.ellipse(...values, 0, 0, 2 * Math.PI);
      stroke && context.stroke(path);
      fill && context.fill(path);
      context?.closePath;
    }
  },

  clearCanvas: (
    canvas: HTMLCanvasElement,
    canvasContext?: CanvasRenderingContext2D | null
  ) => {
    if (canvas) {
      let context: CanvasRenderingContext2D | null | undefined = canvasContext;
      if (!context) {
        context = canvas.getContext('2d');
      }
      context && context.clearRect(0, 0, canvas.width, canvas.height);
    }
  },
} as const;
Object.freeze(Pen);
export { Pen };
