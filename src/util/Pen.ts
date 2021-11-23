import { isCircle } from './helper/typeguards';
import { Circle } from './Shapes/Circle';
import { Ellipsis } from './Shapes/Ellipsis';
import { Line } from './Shapes/Line';
import { Rectangle } from './Shapes/Rectangle';

export const Pen = {
  drawLine: (line: Line, context?: CanvasRenderingContext2D) => {
    context?.beginPath();
    context?.moveTo(...line.points[0]);
    context?.lineTo(...line.points[1]);
    context?.stroke();
    context?.closePath();
  },

  drawRectangle: (rectangle: Rectangle, context?: CanvasRenderingContext2D) => {
    rectangle.edges.forEach(edge => Pen.drawLine(edge, context));
  },

  drawOval: (shape: Ellipsis | Circle, context?: CanvasRenderingContext2D) => {
    context?.beginPath();
    if (isCircle(shape)) {
      const { center, radius } = shape;
      context?.arc(center[0], center[1], radius, 0, 2 * Math.PI);
    } else {
      const { center, radiusX, radiusY } = shape;
      context?.ellipse(
        center[0],
        center[1],
        radiusX,
        radiusY,
        0,
        0,
        2 * Math.PI
      );
    }
    context?.stroke();
    context?.closePath();
  },
};
