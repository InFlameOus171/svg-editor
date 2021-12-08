import {
  BoundaryCoordinates,
  Coordinates,
  FreehandSVGParams,
} from '../../types/types';
import { getUniqueXandYCoordinatesFromBoundaries } from '../helper/util';
import { Line } from './Line';
import { Shape } from './Shape';

export class Freehand extends Shape {
  #points: Coordinates[];
  #center: Coordinates = [-1, -1];
  constructor(points: Coordinates[], dontCountUp?: boolean) {
    super(dontCountUp);
    this.#points = points;
    this.#updateBoundaryAndCenter();
  }

  #updateBoundaryAndCenter = () => {
    const [uniqueXCoordinates, uniqueYCoordinates] =
      getUniqueXandYCoordinatesFromBoundaries(this.#points);
    const maxX = Math.max(...uniqueXCoordinates);
    const maxY = Math.max(...uniqueYCoordinates);
    const minX = Math.min(...uniqueXCoordinates);
    const minY = Math.min(...uniqueYCoordinates);
    this.boundaries = [
      [minX, minY],
      [minX, maxY],
      [maxX, minY],
      [maxX, maxY],
    ];
    this.#center = [(maxX + minX) / 2, (maxY + minY) / 2];
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
    this.#updateBoundaryAndCenter();
  };

  getPoints = () => {
    return this.#points;
  };

  toSVGFreehandParams = (): FreehandSVGParams => ({
    points: this.toString(),
    fill: this.getFill(),
    stroke: this.getStroke(),
    strokeWidth: this.getStrokeWidth().toString(),
  });

  toString = () => {
    return this.#points
      .reduce((acc, point) => {
        return acc.concat(`${point[0]}`, ',', `${point[1]}`, ' ');
      }, '')
      .trim();
  };
}
