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
    const { fill, stroke, strokeWidth, transformMatrix } = styles;
    if (transformMatrix) {
      console.log(transformMatrix);
      const newPath = new Path2D();
      newPath.addPath(pathConstructor, transformMatrix);
      pathConstructor = newPath;
    }
    if (!stroke && !fill && !strokeWidth) {
      context.stroke(pathConstructor);
      // context.fill(pathConstructor);
      return;
    }
    if (stroke) {
      context.strokeStyle = stroke;
    }
    if (strokeWidth) {
      context.lineWidth = parseFloat(strokeWidth);
    }
    if (fill && fill !== 'none') {
      console.log(fill);
      const fillColor = normalizeColorCode(fill);
      console.log(fillColor);
      context.fillStyle = fillColor.colorCode;
      context.globalAlpha = parseInt(fillColor.opacity);
      context.fill(pathConstructor);
      context.globalAlpha = 0;
    }
    if (stroke || strokeWidth) {
      if (stroke && stroke !== 'null') {
        const strokeColor = normalizeColorCode(stroke);
        context.strokeStyle = strokeColor.colorCode;
        context.globalAlpha = parseInt(strokeColor.opacity);
      }
      context.stroke(pathConstructor);
      context.globalAlpha = 1;
    }
  },

  drawPath: (
    path: Path,
    context?: CanvasRenderingContext2D,
    svgParams?: Partial<SVGParamsBase>
  ) => {
    let pathConstructor = new Path2D();
    pathConstructor.addPath(new Path2D(path.toString()));

    if (context) {
      Pen.applyStyles(
        pathConstructor,
        {
          ...path.getsvgParams(),
          ...svgParams,
        },
        context
      );
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
    const { fill, stroke, strokeWidth, transformMatrix } = {
      ...freehand.getsvgParams(),
      ...svgParams,
    };
    if (context) {
      Pen.applyStyles(
        pathConstructor,
        {
          ...freehand.getsvgParams(),
          ...svgParams,
        },
        context
      );
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
    const path = new Path2D();
    if (context) {
      Pen.applyStyles(
        path,
        {
          ...line.getsvgParams(),
          ...svgParams,
        },
        context
      );
      path.moveTo(...line.points[0]);
      path.lineTo(...line.points[1]);
      context.stroke(path);
      context.closePath();
    }
  },

  drawRectangle: (
    rectangle: Rectangle,
    context?: CanvasRenderingContext2D,
    svgParams?: Partial<SVGParamsBase>
  ) => {
    const path = new Path2D();
    const values = Object.values(rectangle.toPathParams()) as [
      number,
      number,
      number,
      number
    ];
    if (context) {
      const params = {
        ...rectangle.getsvgParams(),
        ...svgParams,
      };
      Pen.applyStyles(
        path,
        {
          ...rectangle.getsvgParams(),
          ...svgParams,
        },
        context
      );
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
        ...ellipse.getsvgParams(),
        ...svgParams,
      };
      Pen.applyStyles(
        path,
        {
          ...ellipse.getsvgParams(),
          ...svgParams,
        },
        context
      );
      const { fill, stroke } = params;

      path.ellipse(...values, 0, 0, 2 * Math.PI);
      stroke && context.stroke(path);
      fill && context.fill(path);
      context?.closePath;
    }
  },

  clearCanvas: (
    canvas: HTMLCanvasElement,
    canvasContext: CanvasRenderingContext2D
  ) => {
    if (canvas) {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    }
  },
};
Object.freeze(Pen);
export { Pen };
