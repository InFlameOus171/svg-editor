import { Coordinates } from '../../types/types';
import { Shape } from './Shape';

export class Ellipsis extends Shape {
  center: Coordinates;
  radiusX: number;
  radiusY: number;
  constructor(center: Coordinates, radiusX: number, radiusY: number) {
    super();
    this.center = center;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
  }
}
