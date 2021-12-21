import { ShapeType } from '../types/shapes';
import { SVGParamsBase } from '../types/types';
import { decimalNumberRegExpGlobal } from './helper/regularExpressions';
import { typeOfShape } from './helper/typeguards';
import { Ellipse } from './Shapes/Ellipse';
import { Freehand } from './Shapes/Freehand';
import { Line } from './Shapes/Line';
import { Path } from './Shapes/Path';
import { Rectangle } from './Shapes/Rectangle';

const Pen = {
  generatePen: (context?: CanvasRenderingContext2D) => {
    return {
      draw: (shape: ShapeType, styleAttributes?: Partial<SVGParamsBase>) => {
        const shapeType = typeOfShape(shape);
        switch (shapeType) {
          case 'Ellipse':
            Pen.drawEllipse(shape as Ellipse, context, styleAttributes);
            break;
          case 'Rectangle':
            Pen.drawRectangle(shape as Rectangle, context, styleAttributes);
            break;
          case 'Line':
            Pen.drawLine(shape as Line, context, styleAttributes);
            break;
          case 'Freehand':
            Pen.drawFreehand(shape as Freehand, context, styleAttributes);
            break;
          case 'Path':
            Pen.drawPath(shape as Path, context, styleAttributes);
        }
      },
    };
  },

  setStyles: (
    pathConstructor: Path2D,
    context: CanvasRenderingContext2D,
    styleAttributes: Partial<SVGParamsBase>
  ) => {
    const {
      fill,
      stroke,
      strokeWidth,
      matrix,
      scale,
      translate,
      skewX,
      skewY,
      rotate,
    } = styleAttributes;
    if (fill) {
      context.fillStyle = fill;
    }
    if (stroke) {
      context.strokeStyle = stroke;
    }
    if (strokeWidth) {
      context.lineWidth = parseFloat(strokeWidth);
    }
    if (matrix) {
      const matrixValues = matrix.match(decimalNumberRegExpGlobal);
      if (matrixValues) {
        const domMatrix = new DOMMatrix(matrixValues.map(parseFloat));
        pathConstructor.addPath(new Path2D(), domMatrix);
      }
    }
    context.lineWidth = strokeWidth ? parseFloat(strokeWidth) : 1;
    if (stroke && stroke !== 'null') {
      context.strokeStyle = stroke;
    }
    if (scale) {
      const coordinates = scale.match(decimalNumberRegExpGlobal);
      const x = coordinates?.[0] ?? '1';
      const y = coordinates?.[1] ?? '1';
      if (x && y) {
        context.scale(parseFloat(x), parseFloat(y));
      }
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

  drawPath: (
    path: Path,
    context?: CanvasRenderingContext2D,
    styleAttributes?: Partial<SVGParamsBase>
  ) => {
    const pathConstructor = new Path2D();
    pathConstructor.moveTo(path.offset[0], path.offset[1]);
    pathConstructor.addPath(new Path2D(path.toString()));

    if (context) {
      const {
        fill,
        stroke,
        strokeWidth,
        matrix,
        scale,
        translate,
        skewX,
        skewY,
        rotate,
      } = { ...path.getStyleAttributes(), ...styleAttributes };
      if (fill) {
        context.fillStyle = fill;
      }
      if (stroke) {
        context.strokeStyle = stroke;
      }
      if (strokeWidth) {
        context.lineWidth = parseFloat(strokeWidth);
      }
      if (matrix) {
        const matrixValues = matrix.match(decimalNumberRegExpGlobal);
        if (matrixValues) {
          const domMatrix = new DOMMatrix(matrixValues.map(parseFloat));
          pathConstructor.addPath(new Path2D(), domMatrix);
        }
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
      context.closePath();
    }
  },

  drawFreehand: (
    freehand: Freehand,
    context?: CanvasRenderingContext2D,
    styleAttributes?: Partial<SVGParamsBase>
  ) => {
    const path = new Path2D();
    const points = freehand.getPoints();
    const start = points[0];
    const rest = points.slice(1);
    const {
      fill,
      stroke,
      strokeWidth,
      matrix,
      scale,
      translate,
      skewX,
      skewY,
      rotate,
    } = { ...freehand.getStyleAttributes(), ...styleAttributes };
    if (context) {
      if (fill) {
        context.fillStyle = fill;
      }
      if (stroke) {
        context.strokeStyle = stroke;
      }
      if (strokeWidth) {
        context.lineWidth = parseFloat(strokeWidth);
      }
      console.log(matrix);
      if (matrix) {
        const matrixValues = decimalNumberRegExpGlobal.exec(matrix);
        if (matrixValues) {
          console.log(matrixValues);
        }
        return;
        // const domMatrix = new DOMMatrix(matrixValues);
        // path.addPath(new Path2D(), matrix);
      }
      path.moveTo(...start);
      rest.forEach(point => {
        path.lineTo(...point);
      });
      context?.stroke(path);
      context?.closePath();
    }
  },

  drawLine: (
    line: Line,
    context?: CanvasRenderingContext2D,
    styleAttributes?: Partial<SVGParamsBase>
  ) => {
    const path = new Path2D();
    path.moveTo(...line.points[0]);
    path.lineTo(...line.points[1]);
    context?.stroke(path);
    context?.closePath();
  },

  drawRectangle: (
    rectangle: Rectangle,
    context?: CanvasRenderingContext2D,
    styleAttributes?: Partial<SVGParamsBase>
  ) => {
    const path = new Path2D();
    const values = Object.values(rectangle.toPathParams()) as [
      number,
      number,
      number,
      number
    ];
    path.rect(...values);
    context?.stroke(path);
    context?.closePath();
  },

  drawEllipse: (
    ellipse: Ellipse,
    context?: CanvasRenderingContext2D,
    styleAttributes?: Partial<SVGParamsBase>
  ) => {
    const path = new Path2D();
    const values = Object.values(ellipse.toPathParams()) as [
      number,
      number,
      number,
      number
    ];
    path.ellipse(...values, 0, 0, 2 * Math.PI);
    context?.stroke(path);
    context?.closePath;
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
