import {
  Coordinates,
  LineSVGParams,
  VectorCoordinates,
} from '../../types/types';
import { Pen } from '../Pen';
import { Shape } from './Shape';

export class Line extends Shape {
  points: VectorCoordinates;
  #center: Coordinates;

  constructor(
    startPoint: Coordinates,
    endPoint: Coordinates,
    dontCountUp?: boolean
  ) {
    super(dontCountUp);
    this.points = [startPoint, endPoint];
    this.#center = [
      (startPoint[0] + endPoint[0]) / 2,
      (startPoint[1] + endPoint[1]) / 2,
    ];
    this.#updateBoundaries();
  }

  #updateBoundaries = () => {
    const x1 = this.points[0][0];
    const x2 = this.points[1][0];
    const y1 = this.points[0][1];
    const y2 = this.points[1][1];
    this.boundaries = [
      [x1, y1],
      [x1, y2],
      [x2, y1],
      [x2, y2],
    ];
  };

  moveTo = (coordinates: Coordinates): void => {
    const xDifference = coordinates[0] - this.#center[0];
    const yDifference = coordinates[1] - this.#center[1];
    this.#center = coordinates;
    this.points = this.points.map(point => [
      point[0] + xDifference,
      point[1] + yDifference,
    ]) as VectorCoordinates;
    this.moveBoundaries([xDifference, yDifference]);
  };

  getCenter: () => Coordinates = () => {
    return this.#center;
  };

  toSVGLineParams = (): LineSVGParams => ({
    x1: this.points[0][0].toString(),
    y1: this.points[0][1].toString(),
    x2: this.points[1][0].toString(),
    y2: this.points[1][1].toString(),
    fill: this.getFill(),
    stroke: this.getStroke(),
    strokeWidth: this.getStrokeWidth(),
  });

  toString = () => {
    return JSON.stringify({
      start: { x: this.points[0][0], y: this.points[0][1] },
      end: { x: this.points[1][0], y: this.points[1][1] },
    });
  };
}
