import { Shape } from '../types/shapes';
import { typeOfShape } from './helper/typeguards';
import { Ellipsis } from './Shapes/Ellipsis';
import { Line } from './Shapes/Line';
import { Rectangle } from './Shapes/Rectangle';

const Pen = {
  draw: (context?: CanvasRenderingContext2D) => (shape: Shape) => {
    const shapeType = typeOfShape(shape);
    switch (shapeType) {
      case 'Ellipsis':
        Pen.drawOval(shape as Ellipsis, context);
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
    context?.beginPath();
    context?.moveTo(...line.points[0]);
    context?.lineTo(...line.points[1]);
    context?.stroke();
    context?.closePath();
  },

  drawRectangle: (rectangle: Rectangle, context?: CanvasRenderingContext2D) => {
    console.log(rectangle.edges);
    rectangle.edges.forEach(edge => Pen.drawLine(edge, context));
  },

  drawOval: (shape: Ellipsis, context?: CanvasRenderingContext2D) => {
    context?.beginPath();
    const { center, radiusX, radiusY } = shape;
    context?.ellipse(center[0], center[1], radiusX, radiusY, 0, 0, 2 * Math.PI);
    context?.stroke();
    context?.closePath();
  },
};
Object.freeze(Pen);
export { Pen };
