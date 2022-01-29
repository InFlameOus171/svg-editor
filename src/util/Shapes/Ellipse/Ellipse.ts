import {
  Coordinates,
  SVGParamsBase,
  EllipseSVGParams,
} from '../../../types/types';
import { Shape } from '../Shape';
import { getCircleBoundaries } from './Ellipse.util';

export class Ellipse extends Shape {
  #center: Coordinates;
  radiusX: number;
  radiusY: number;
  constructor(
    center: Coordinates,
    radiusX: number,
    radiusY: number,
    svgParams?: Partial<SVGParamsBase>,
    countShapeCountUp?: boolean,
    isLocked: boolean = false
  ) {
    super(
      getCircleBoundaries(center, radiusX, radiusY),
      svgParams,
      countShapeCountUp,
      isLocked
    );
    this.#center = center;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
  }

  moveTo = (coordinates: Coordinates) => {
    const xDifference = coordinates[0] - this.#center[0];
    const yDifference = coordinates[1] - this.#center[1];
    this.#center = coordinates;
    this.moveBoundaries([xDifference, yDifference]);
  };

  getCenter = () => {
    return this.#center;
  };

  toSVGEllipseParams = (): EllipseSVGParams => ({
    cx: this.#center[0].toString(),
    cy: this.#center[1].toString(),
    rx: this.radiusX.toString(),
    ry: this.radiusY.toString(),
    ...this.getSvgParams(),
  });

  getDeconstructedShapeData = () => ({
    type: 'Ellipse',
    id: this.getId(),
    center: this.#center,
    radiusX: this.radiusX,
    radiusY: this.radiusY,
    isLocked: this.isLocked,
    svgParams: this.getSvgParams(),
  });

  toString = () => {
    return JSON.stringify({
      center: this.#center,
      radiusX: this.radiusX,
      radiusY: this.radiusY,
    });
  };
}
