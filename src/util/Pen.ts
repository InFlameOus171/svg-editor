import { ShapeType } from '../types/shapes';
import { SVGParamsBase } from '../types/types';
import { decimalNumberRegExpGlobal } from './helper/regularExpressions';
import { typeOfShape } from './helper/typeguards';
import { normalizeColorCode } from './helper/util';
import { Ellipse } from './Shapes/Ellipse';
import { Freehand } from './Shapes/Freehand';
import { Line } from './Shapes/Line';
import { Path } from './Shapes/Path';
import { Rectangle } from './Shapes/Rectangle';

const Pen = {
  generatePen: (context?: CanvasRenderingContext2D) => {
    return {
      draw: (shape: ShapeType, svgParams?: Partial<SVGParamsBase>) => {
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
        }
      },
    };
  },

  draw: (
    shape: ShapeType,
    svgParams?: Partial<SVGParamsBase>,
    context?: CanvasRenderingContext2D
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
    }
  },

  setStyles: (
    pathConstructor: Path2D,
    context: CanvasRenderingContext2D,
    svgParams: Partial<SVGParamsBase>
  ) => {
    const { fill, stroke, strokeWidth, transformMatrix } = svgParams;
    if (fill) {
      context.fillStyle = fill;
    }
    if (stroke) {
      context.strokeStyle = stroke;
    }
    if (strokeWidth) {
      context.lineWidth = parseFloat(strokeWidth);
    }
    if (transformMatrix) {
      pathConstructor.addPath(new Path2D(), transformMatrix);
    }
    context.lineWidth = strokeWidth ? parseFloat(strokeWidth) : 1;
    if (stroke && stroke !== 'null') {
      context.strokeStyle = stroke;
    }
    if (fill && fill !== 'none') {
      context.fillStyle = fill;
      context.fill(pathConstructor);
    }
    if (stroke || strokeWidth) {
      context.stroke(pathConstructor);
    }
    if (!stroke && !fill && !strokeWidth) {
      context.stroke(pathConstructor);
      context.fill(pathConstructor);
    }
  },

  applyStyles: (
    pathConstructor: Path2D,
    styles: SVGParamsBase,
    context: CanvasRenderingContext2D
  ) => {
    console.log(styles);
    const { fill, stroke, strokeWidth, transformMatrix, lineCap } = styles;
    if (transformMatrix) {
      const newPath = new Path2D();
      newPath.addPath(pathConstructor, transformMatrix);
      pathConstructor = newPath;
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
    context?: CanvasRenderingContext2D,
    svgParams?: Partial<SVGParamsBase>
  ) => {
    console.log(path.getSvgParams(), path.toString(), svgParams);
    let pathConstructor = new Path2D(path.toString());
    if (context) {
      const params = {
        ...path.getSvgParams(),
        ...svgParams,
      };
      pathConstructor = Pen.applyStyles(pathConstructor, params, context);
      console.log(params.stroke, params.fill);
      console.log(context.strokeStyle, context.fillStyle);
      params.stroke && context.stroke(pathConstructor);
      params.fill && context.fill(pathConstructor);
      context.closePath();
    }
  },

  drawFreehand: (
    freehand: Freehand,
    context?: CanvasRenderingContext2D,
    svgParams?: Partial<SVGParamsBase>
  ) => {
    let pathConstructor = new Path2D();
    const points = freehand.getPoints();
    const start = points[0];
    const rest = points.slice(1);
    const params = {
      ...freehand.getSvgParams(),
      ...svgParams,
    };
    if (context) {
      Pen.applyStyles(pathConstructor, params, context);
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
    context?: CanvasRenderingContext2D,
    svgParams?: Partial<SVGParamsBase>
  ) => {
    let pathConstructor = new Path2D();
    if (context) {
      const params = {
        ...line.getSvgParams(),
        ...svgParams,
      };
      Pen.applyStyles(pathConstructor, params, context);
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
    context?: CanvasRenderingContext2D,
    svgParams?: Partial<SVGParamsBase>
  ) => {
    let path = new Path2D();
    const values = Object.values(rectangle.toPathParams()) as [
      number,
      number,
      number,
      number
    ];
    if (context) {
      const params = {
        ...rectangle.getSvgParams(),
        ...svgParams,
      };
      Pen.applyStyles(path, params, context);
      const { fill, stroke } = params;
      path.rect(...values);
      stroke && context.stroke(path);
      fill && context.fill(path);
      context.closePath();
    }
  },

  drawEllipse: (
    ellipse: Ellipse,
    context?: CanvasRenderingContext2D,
    svgParams?: Partial<SVGParamsBase>
  ) => {
    const path = new Path2D();
    const values = Object.values(ellipse.toPathParams()) as [
      number,
      number,
      number,
      number
    ];
    if (context) {
      const params = {
        ...ellipse.getSvgParams(),
        ...svgParams,
      };
      Pen.applyStyles(path, params, context);
      const { fill, stroke } = params;

      path.ellipse(...values, 0, 0, 2 * Math.PI);
      stroke && context.stroke(path);
      fill && context.fill(path);
      context?.closePath;
    }
  },

  clearCanvas: (
    canvas: HTMLCanvasElement,
    canvasContext?: CanvasRenderingContext2D
  ) => {
    if (canvas) {
      let context: CanvasRenderingContext2D | null | undefined = canvasContext;
      if (!context) {
        context = canvas.getContext('2d');
      }
      context && context.clearRect(0, 0, canvas.width, canvas.height);
    }
  },
};
Object.freeze(Pen);
export { Pen };
