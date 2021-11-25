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

  drawOval: (shape: Ellipsis, context?: CanvasRenderingContext2D) => {
    context?.beginPath();
    const { center, radiusX, radiusY } = shape;
    context?.ellipse(center[0], center[1], radiusX, radiusY, 0, 0, 2 * Math.PI);
    context?.stroke();
    context?.closePath();
  },
};
