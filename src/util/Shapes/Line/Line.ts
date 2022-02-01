import type {
  Coordinates,
  LineSVGParams,
  SVGParamsBase,
  VectorCoordinates,
} from '../../../types/types';
import { Shape } from '../Shape';
import { getLineBoundaries } from './Line.util';

export class Line extends Shape {
  points: VectorCoordinates;

  constructor(
    startPoint: Coordinates,
    endPoint: Coordinates,
    svgParams?: Partial<SVGParamsBase>,
    countShapeCountUp?: boolean,
    isLocked: boolean = false
  ) {
    super(
      getLineBoundaries(startPoint, endPoint),
      svgParams,
      countShapeCountUp,
      isLocked
    );
    this.points = [startPoint, endPoint];
    this.calculationCenter = [
      (startPoint[0] + endPoint[0]) / 2,
      (startPoint[1] + endPoint[1]) / 2,
    ];
  }

  moveTo = (coordinates: Coordinates): void => {
    const xDifference = coordinates[0] - this.calculationCenter[0];
    const yDifference = coordinates[1] - this.calculationCenter[1];
    this.calculationCenter = coordinates;
    this.points = this.points.map(point => [
      point[0] + xDifference,
      point[1] + yDifference,
    ]) as VectorCoordinates;
    this.moveBoundaries([xDifference, yDifference]);
  };

  getCenter: () => Coordinates = () => {
    return this.calculationCenter;
  };

  toSVGLineParams = (): LineSVGParams => ({
    x1: this.points[0][0].toString(),
    y1: this.points[0][1].toString(),
    x2: this.points[1][0].toString(),
    y2: this.points[1][1].toString(),
    ...this.getSvgParams(),
  });

  getDeconstructedShapeData = () => ({
    id: this.getId(),
    type: 'Line',
    startPoint: this.points[0],
    endPoint: this.points[1],
    isLocked: this.isLocked,
    svgParams: this.getSvgParams(),
  });

  toString = () => {
    return JSON.stringify({
      start: { x: this.points[0][0], y: this.points[0][1] },
      end: { x: this.points[1][0], y: this.points[1][1] },
    });
  };
}
