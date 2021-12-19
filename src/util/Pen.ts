import { ShapeType } from '../types/shapes';
import { typeOfShape } from './helper/typeguards';
import { Ellipse } from './Shapes/Ellipse';
import { Freehand } from './Shapes/Freehand';
import { Line } from './Shapes/Line';
import { Path } from './Shapes/Path';
import { Rectangle } from './Shapes/Rectangle';

const Pen = {
  generatePen: (context?: CanvasRenderingContext2D) => {
    return {
      draw: (shape: ShapeType) => {
        const shapeType = typeOfShape(shape);
        switch (shapeType) {
          case 'Ellipse':
            Pen.drawEllipse(shape as Ellipse, context);
            break;
          case 'Rectangle':
            Pen.drawRectangle(shape as Rectangle, context);
            break;
          case 'Line':
            Pen.drawLine(shape as Line, context);
            break;
          case 'Freehand':
            Pen.drawFreehand(shape as Freehand, context);
            break;
          case 'Path':
            Pen.drawPath(shape as Path, context);
        }
      },
    };
  },

  drawPath: (path: Path, context?: CanvasRenderingContext2D) => {
    const pathConstructor = new Path2D();
    pathConstructor.moveTo(path.offset[0], path.offset[1]);
    pathConstructor.addPath(new Path2D(path.toString()));
    if (context) {
      const { fill, stroke, strokeWidth } = path.getStyleAttributes();
      if (stroke && stroke !== 'null') {
        context.strokeStyle = stroke;
      }
      if (fill) {
        context.fillStyle = fill;
        context.fill(pathConstructor);
      }
      if (strokeWidth) {
        context.lineWidth = parseFloat(strokeWidth);
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

  drawFreehand: (freehand: Freehand, context?: CanvasRenderingContext2D) => {
    const path = new Path2D();
    const points = freehand.getPoints();
    const start = points[0];
    const rest = points.slice(1);
    path.moveTo(...start);
    rest.forEach(point => {
      path.lineTo(...point);
    });
    context?.stroke(path);
    context?.closePath();
  },

  drawLine: (line: Line, context?: CanvasRenderingContext2D) => {
    const path = new Path2D();
    path.moveTo(...line.points[0]);
    path.lineTo(...line.points[1]);
    context?.stroke(path);
    context?.closePath();
  },

  drawRectangle: (rectangle: Rectangle, context?: CanvasRenderingContext2D) => {
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

  drawEllipse: (ellipse: Ellipse, context?: CanvasRenderingContext2D) => {
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
