import { Coordinates } from '../../types/types';
import { Shape } from './Shape';

export class Ellipsis extends Shape {
  center: Coordinates;
  radiusX: number;
  radiusY: number;
  constructor(
    center: Coordinates,
    radiusX: number,
    radiusY: number,
    dontCountUp?: boolean
  ) {
    super(dontCountUp);
    this.center = center;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    const topLeftCorner: Coordinates = [
      this.center[0] - this.radiusX,
      this.center[1] + this.radiusY,
    ];
    const topRightCorner: Coordinates = [
      this.center[0] + this.radiusX,
      this.center[1] + this.radiusY,
    ];
    const bottomLeftCorner: Coordinates = [
      this.center[0] - this.radiusX,
      this.center[1] - this.radiusY,
    ];
    const bottomRightCorner: Coordinates = [
      this.center[0] + this.radiusX,
      this.center[1] - this.radiusY,
    ];
    this.boundary = [
      topLeftCorner,
      topRightCorner,
      bottomLeftCorner,
      bottomRightCorner,
    ];
  }
  toString = () => {
    return JSON.stringify({
      type: 'Circle',
      center: this.center,
      radiusX: this.radiusX,
      radiusY: this.radiusY,
    });
  };
}
