import { Coordinates } from '../../types/types';
import { Line } from './Line';

export class FreehandedShape {
  points: Coordinates[] = [];
  constructor(startingPoint: Coordinates) {
    this.points.push(startingPoint);
  }
  addPoint = (newPoint: Coordinates) => {
    this.points.push(newPoint);
  };

  toLines = (): Line[] => {
    const lines = this.points.reduce((acc, curr, index) => {
      if (index < this.points.length - 1) {
        return [...acc, new Line(curr, this.points[index + 1])];
      } else {
        return acc;
      }
    }, [] as Line[]);
    return lines;
  };
}
