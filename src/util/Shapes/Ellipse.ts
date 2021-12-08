import { Coordinates, EllipseSVGParams } from '../../types/types';
import { Shape } from './Shape';

export class Ellipse extends Shape {
  #center: Coordinates;
  radiusX: number;
  radiusY: number;
  constructor(
    center: Coordinates,
    radiusX: number,
    radiusY: number,
    dontCountUp?: boolean
  ) {
    super(dontCountUp);
    this.#center = center;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.#updateBoundaries();
  }

  #updateBoundaries = () => {
    const topLeftCorner: Coordinates = [
      this.#center[0] - this.radiusX,
      this.#center[1] + this.radiusY,
    ];
    const topRightCorner: Coordinates = [
      this.#center[0] + this.radiusX,
      this.#center[1] + this.radiusY,
    ];
    const bottomLeftCorner: Coordinates = [
      this.#center[0] - this.radiusX,
      this.#center[1] - this.radiusY,
    ];
    const bottomRightCorner: Coordinates = [
      this.#center[0] + this.radiusX,
      this.#center[1] - this.radiusY,
    ];
    this.boundaries = [
      topLeftCorner,
      topRightCorner,
      bottomLeftCorner,
      bottomRightCorner,
    ];
  };

  moveTo = (coodinates: Coordinates) => {
    this.#center = coodinates;
    this.#updateBoundaries();
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
    fill: this.getFill(),
    stroke: this.getStroke(),
    strokeWidth: this.getStrokeWidth(),
  });

  toString = () => {
    return JSON.stringify({
      type: 'Ellipse',
      center: this.#center,
      radiusX: this.radiusX,
      radiusY: this.radiusY,
    });
  };
}
