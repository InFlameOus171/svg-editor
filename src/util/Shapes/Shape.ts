import { nanoid } from 'nanoid';
import {
  BoundaryCoordinates,
  Coordinates,
  SVGParamsBase,
} from '../../types/types';

export abstract class Shape {
  static #counter: number = 0;

  #fill?: string;
  #id?: string;
  #stroke?: string;
  #strokeWidth?: string;
  boundaries: BoundaryCoordinates;
  index: number = 0;

  constructor(
    boundaries: BoundaryCoordinates = [
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
    ],

    styleAttributes: Partial<SVGParamsBase> = {
      stroke: '#000000',
      fill: 'rgba(0,0,0,0)',
      strokeWidth: '2',
    },

    countShapecountUp: boolean = true
  ) {
    if (countShapecountUp) {
      Shape.#counter++;
      this.#id = nanoid();
    }

    this.#fill = styleAttributes.fill;
    this.#stroke = styleAttributes.stroke;
    this.#strokeWidth = styleAttributes.strokeWidth;

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

  getStroke = () => {
    return this.#stroke;
  };

  getStrokeWidth = () => {
    return this.#strokeWidth;
  };

  getFill = () => {
    return this.#fill;
  };

  getStyleAttributes = () => {
    return {
      fill: this.#fill,
      stroke: this.#stroke,
      strokeWidth: this.#strokeWidth,
    };
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
