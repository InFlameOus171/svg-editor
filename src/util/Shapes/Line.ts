import { Coordinates, LineComponents } from '../../types/types';

export class Line {
  points: LineComponents;
  constructor(startPoint: Coordinates, endPoint: Coordinates) {
    this.points = [startPoint, endPoint];
  }
}
