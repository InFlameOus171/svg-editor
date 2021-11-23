import { Coordinates, VectorCoordinates } from '../../types/types';
import { Shape } from './Shape';

export class Line extends Shape {
  points: VectorCoordinates;
  constructor(
    startPoint: Coordinates,
    endPoint: Coordinates,
    dontCountUp?: boolean
  ) {
    super(dontCountUp);
    this.points = [startPoint, endPoint];

    const topLeftCorner: Coordinates = startPoint;
    const topRightCorner: Coordinates = endPoint;
    const bottomLeftCorner: Coordinates = startPoint;
    const bottomRightCorner: Coordinates = endPoint;
    this.boundary = [
      topLeftCorner,
      topRightCorner,
      bottomLeftCorner,
      bottomRightCorner,
    ];
  }
}
