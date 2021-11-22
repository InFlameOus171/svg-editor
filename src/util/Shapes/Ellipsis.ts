import { Coordinates } from '../../types/types';

export class Ellipsis {
  center: Coordinates;
  radiusX: number;
  radiusY: number;
  constructor(center: Coordinates, radiusX: number, radiusY: number) {
    this.center = center;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
  }
}
