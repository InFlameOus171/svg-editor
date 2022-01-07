import {
  Coordinates,
  EllipseSVGParams,
  SVGParamsBase,
} from '../../types/types';
import { getCircleBoundaries } from '../helper/coordinates';
import { Shape } from './Shape';

export class Ellipse extends Shape {
  #center: Coordinates;
  radiusX: number;
  radiusY: number;
  constructor(
    center: Coordinates,
    radiusX: number,
    radiusY: number,
    svgParams?: Partial<SVGParamsBase>,
    dontCountUp?: boolean
  ) {
    super(
      getCircleBoundaries(center, radiusX, radiusY),
      svgParams,
      dontCountUp
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

  toPathParams = () => ({
    cx: this.#center[0],
    cy: this.#center[1],
    rx: this.radiusX,
    ry: this.radiusY,
  });

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
