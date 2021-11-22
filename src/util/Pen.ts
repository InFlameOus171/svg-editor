import { Coordinates } from '../types/types';
import {
  calculateDistanceBetweenPoints,
  generateEllipsis,
} from './helper/coordinates';
import { isCircle } from './helper/typeguards';
import { Circle } from './Shapes/Circle';
import { Ellipsis } from './Shapes/Ellipsis';

export const Pen = {
  drawLine: (
    startCoordinates: [number, number],
    endCoordinates: [number, number],
    context?: CanvasRenderingContext2D
  ) => {
    context?.beginPath();
    context?.moveTo(...startCoordinates);
    context?.lineTo(...endCoordinates);
    context?.stroke();
    context?.closePath();
  },

  drawRectangle: (
    startCoordinates: [number, number],
    endCoordinates: [number, number],
    context?: CanvasRenderingContext2D
  ) => {
    context?.beginPath();
    context?.moveTo(...startCoordinates);
    context?.lineTo(endCoordinates[0], startCoordinates[1]);
    context?.stroke();
    context?.moveTo(endCoordinates[0], startCoordinates[1]);
    context?.lineTo(endCoordinates[0], endCoordinates[1]);
    context?.stroke();
    context?.moveTo(endCoordinates[0], endCoordinates[1]);
    context?.lineTo(startCoordinates[0], endCoordinates[1]);
    context?.stroke();
    context?.moveTo(startCoordinates[0], endCoordinates[1]);
    context?.lineTo(startCoordinates[0], startCoordinates[1]);
    context?.stroke();
    context?.closePath();
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
