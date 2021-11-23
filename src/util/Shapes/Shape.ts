import { BoundaryCoordinates } from '../../types/types';

export abstract class Shape {
  static #counter: number = 0;
  boundary?: BoundaryCoordinates;

  index: number = 0;
  constructor(dontCountUp: boolean = false) {
    if (!dontCountUp) {
      Shape.#counter++;
    }
    this.index = Shape.#counter;
  }
}
