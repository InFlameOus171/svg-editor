import {
  BoundaryCoordinates,
  Coordinates,
  VectorCoordinates,
} from '../../types/types';
import { Shape } from './Shape';

export class Line extends Shape {
  points: VectorCoordinates;
  #x: number = 0;
  #y: number = 0;
  constructor(
    startPoint: Coordinates,
    endPoint: Coordinates,
    dontCountUp?: boolean
  ) {
    super(dontCountUp);
    this.points = [startPoint, endPoint];
    this.#x = (startPoint[0] + endPoint[0]) / 2;
    this.#y = (startPoint[1] + endPoint[1]) / 2;
    const topLeftCorner: Coordinates = startPoint;
    const topRightCorner: Coordinates = endPoint;
    const bottomLeftCorner: Coordinates = startPoint;
    const bottomRightCorner: Coordinates = endPoint;
    this.boundaries = [
      topLeftCorner,
      topRightCorner,
      bottomLeftCorner,
      bottomRightCorner,
    ];
  }

  moveTo = (coordinates: Coordinates): void => {
    const xDifference = coordinates[0] - this.#x;
    const yDifference = coordinates[1] - this.#y;
    [this.#x, this.#y] = coordinates;
    this.points = this.points.map(point => [
      point[0] + xDifference,
      point[1] + yDifference,
    ]) as VectorCoordinates;
    this.moveBoundaries([xDifference, yDifference]);
  };

  getCenter: () => Coordinates = () => {
    return [this.#x, this.#y];
  };

  toString = () => {
    return JSON.stringify({
      start: { x: this.points[0][0], y: this.points[0][1] },
      end: { x: this.points[1][0], y: this.points[1][1] },
    });
  };
}
