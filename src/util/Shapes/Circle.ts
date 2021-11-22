import { Coordinates } from '../../types/types';

export class Circle {
  center: Coordinates;
  radius: number;
  constructor(center: Coordinates, radius: number) {
    this.center = center;
    this.radius = radius;
  }
}
