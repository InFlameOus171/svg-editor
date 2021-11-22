import { Coordinates, LineComponents } from '../../types/types';
import { Shape } from './Shape';

export class Line extends Shape {
  points: LineComponents;
  constructor(startPoint: Coordinates, endPoint: Coordinates) {
    super();
    this.points = [startPoint, endPoint];
  }
}
