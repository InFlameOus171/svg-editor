import { Coordinates } from '../../types/types';
import { Shape } from './Shape';

export class Circle extends Shape {
  center: Coordinates;
  radius: number;
  constructor(center: Coordinates, radius: number, dontCountUp?: boolean) {
    super(dontCountUp);
    this.center = center;
    this.radius = radius;

    const topLeftCorner: Coordinates = [
      this.center[0] - this.radius,
      this.center[1] + this.radius,
    ];
    const topRightCorner: Coordinates = [
      this.center[0] + this.radius,
      this.center[1] + this.radius,
    ];
    const bottomLeftCorner: Coordinates = [
      this.center[0] - this.radius,
      this.center[1] - this.radius,
    ];
    const bottomRightCorner: Coordinates = [
      this.center[0] + this.radius,
      this.center[1] - this.radius,
    ];
    this.boundary = [
      topLeftCorner,
      topRightCorner,
      bottomLeftCorner,
      bottomRightCorner,
    ];
  }
}
