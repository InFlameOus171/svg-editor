import { Shape } from '../types/shapes';
import { typeOfShape } from './helper/typeguards';
import { Ellipse } from './Shapes/Ellipse';
import { Line } from './Shapes/Line';
import { Rectangle } from './Shapes/Rectangle';

const Pen = {
  draw: (context?: CanvasRenderingContext2D) => (shape: Shape) => {
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
        break;
    }
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
    path.rect(...rectangle.toPath2DRectParams());
    context?.stroke(path);
    context?.closePath();
  },

  drawEllipse: (shape: Ellipse, context?: CanvasRenderingContext2D) => {
    const path = new Path2D();
    path.ellipse(...shape.toPath2DParams(), 0, 0, 2 * Math.PI);
    context?.stroke(path);
    context?.closePath;
  },
};
Object.freeze(Pen);
export { Pen };
