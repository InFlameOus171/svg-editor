import { nanoid } from 'nanoid';
import { SupportedStyles } from '../../types/globalStyles.types';
import {
  BoundaryCoordinates,
  Coordinates,
  SVGParamsBase,
} from '../../types/types';

export abstract class Shape {
  static #counter: number = 0;

  #id?: string;
  styles?: SVGParamsBase;
  boundaries: BoundaryCoordinates;
  index: number = 0;

  constructor(
    boundaries: BoundaryCoordinates = [
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
    ],
    svgParams?: SVGParamsBase,
    countShapecountUp: boolean = true
  ) {
    if (countShapecountUp) {
      Shape.#counter++;
      this.#id = nanoid();
    }
    this.styles = svgParams;
    this.boundaries = boundaries;
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
