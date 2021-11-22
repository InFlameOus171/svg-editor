import { Coordinates } from '../../types/types';
import { Shape } from './Shape';

export class Circle extends Shape {
  center: Coordinates;
  radius: number;
  constructor(center: Coordinates, radius: number) {
    super();
    this.center = center;
    this.radius = radius;
  }
}
