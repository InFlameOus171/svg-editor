import { nanoid } from 'nanoid';
import { BoundaryCoordinates, Coordinates } from '../../types/types';

export abstract class Shape {
  static #counter: number = 0;
  #id?: string;
  boundaries: BoundaryCoordinates;
  #stroke: string = '#000000';
  #fill: string = 'rgba(0,0,0,0)';
  #strokeWidth: number = 2;

  index: number = 0;
  constructor(
    boundaries: BoundaryCoordinates = [
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
    ],
    dontCountUp: boolean = false
  ) {
    if (!dontCountUp) {
      Shape.#counter++;
      this.#id = nanoid();
    }
    this.index = Shape.#counter;
    this.boundaries = boundaries;
  }

  moveBoundaries = (difference: Coordinates) => {
    const [xDifference, yDifference] = difference;
    this.boundaries = this.boundaries?.map(
      boundary =>
        [boundary[0] + xDifference, boundary[1] + yDifference] as Coordinates
    ) as BoundaryCoordinates;
  };

  getStroke = () => {
    return this.#stroke;
  };

  getStrokeWidth = () => {
    return this.#strokeWidth.toString();
  };

  getFill = () => {
    return this.#fill;
  };

  getId = () => {
    return this.#id;
  };

  getCenter = (): Coordinates => {
    throw new Error('not implemented');
  };

  moveTo = (
    coodinates: Coordinates,
    context?: CanvasRenderingContext2D
  ): void => {
    throw new Error('not implemented');
  };

  toString = (): string => {
    throw new Error('not implemented');
  };
}
