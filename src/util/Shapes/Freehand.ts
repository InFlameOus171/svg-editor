import {
  Coordinates,
  FreehandSVGParams,
  SVGParamsBase,
} from '../../types/types';
import { getFreehandBoundaries } from '../helper/coordinates';
import { Shape } from './Shape';

export class Freehand extends Shape {
  #points: Coordinates[];
  #center: Coordinates = [-1, -1];

  constructor(
    points: Coordinates[],
    styleAttributes?: Partial<SVGParamsBase>,
    countShapecountUp?: boolean
  ) {
    super(getFreehandBoundaries(points), styleAttributes, countShapecountUp);
    this.#points = points;
    this.#updateCenter();
  }

  #updateCenter = () => {
    const sumOfCoordinates = this.boundaries.reduce(
      (acc, boundaryCoordinate) => [
        acc[0] + boundaryCoordinate[0],
        acc[1] + boundaryCoordinate[1],
      ],
      [0, 0]
    );
    this.#center = [sumOfCoordinates[0] / 4, sumOfCoordinates[1] / 4];
  };

  getCenter = () => {
    return this.#center;
  };

  moveTo = (coordinates: Coordinates) => {
    const xDifference = coordinates[0] - this.#center[0];
    const yDifference = coordinates[1] - this.#center[1];
    this.#points = this.#points.map(point => [
      point[0] + xDifference,
      point[1] + yDifference,
    ]);
    this.#updateCenter();
    this.moveBoundaries([xDifference, yDifference]);
  };

  getPoints = () => {
    return this.#points;
  };

  toSVGFreehandParams = (): FreehandSVGParams => ({
    points: this.toString(),
    fill: this.getFill(),
    stroke: this.getStroke(),
    strokeWidth: this.getStrokeWidth(),
  });

  toString = () => {
    return this.#points
      .reduce((acc, point) => {
        return acc.concat(`${point[0]}`, ',', `${point[1]}`, ' ');
      }, '')
      .trim();
  };
}
