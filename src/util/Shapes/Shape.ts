import { nanoid } from 'nanoid';
import { BoundaryCoordinates, Coordinates } from '../../types/types';

export abstract class Shape {
  static #counter: number = 0;
  boundaries?: BoundaryCoordinates;
  #id?: string;

  index: number = 0;
  constructor(dontCountUp: boolean = false) {
    if (!dontCountUp) {
      Shape.#counter++;
      this.#id = nanoid();
      console.log(this.#id);
    }
    this.index = Shape.#counter;
  }

  moveBoundaries = (difference: Coordinates) => {
    const [xDifference, yDifference] = difference;
    this.boundaries = this.boundaries?.map(
      boundary =>
        [boundary[0] + xDifference, boundary[1] + yDifference] as Coordinates
    ) as BoundaryCoordinates;
  };

  getId = () => {
    return this.#id;
  };

  getCenter = (): Coordinates => {
    throw new Error('not implemented');
  };

  moveTo = (coodinates: Coordinates): void => {
    throw new Error('not implemented');
  };

  toString = (): string => {
    throw new Error('not implemented');
  };
}
