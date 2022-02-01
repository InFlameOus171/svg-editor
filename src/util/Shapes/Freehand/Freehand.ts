import type {
  Coordinates,
  FreehandSVGParams,
  SVGParamsBase,
} from '../../../types/types';
import { getFreehandBoundaries } from './Freehand.util';
import { Shape } from '../Shape';

export class Freehand extends Shape {
  #points: Coordinates[];

  constructor(
    points: Coordinates[],
    svgParams?: Partial<SVGParamsBase>,
    countShapecountUp?: boolean,
    isLocked: boolean = false
  ) {
    super(
      getFreehandBoundaries(points),
      svgParams,
      countShapecountUp,
      isLocked
    );
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
    this.calculationCenter = [sumOfCoordinates[0] / 4, sumOfCoordinates[1] / 4];
  };

  getCenter = () => {
    return this.calculationCenter;
  };

  moveTo = (coordinates: Coordinates) => {
    const xDifference = coordinates[0] - this.calculationCenter[0];
    const yDifference = coordinates[1] - this.calculationCenter[1];
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
    ...this.getSvgParams(),
  });

  getDeconstructedShapeData = () => ({
    id: this.getId(),
    type: 'Freehand',
    points: this.#points,
    isLocked: this.isLocked,
    svgParams: this.getSvgParams(),
  });

  toString = () => {
    return this.#points
      .reduce((acc, point) => {
        return acc.concat(`${point[0]}`, ',', `${point[1]}`, ' ');
      }, '')
      .trim();
  };
}
