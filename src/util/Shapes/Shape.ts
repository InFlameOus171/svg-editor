import { nanoid } from 'nanoid';
import {
  BoundaryCoordinates,
  Coordinates,
  SVGParamsBase,
} from '../../types/types';
import { Pen } from '../Pen';

export abstract class Shape {
  static #counter: number = 0;

  #fill?: string;
  #id?: string;
  #stroke?: string;
  #strokeWidth?: string;
  transformMatrix?: DOMMatrix;
  boundaries: BoundaryCoordinates;
  index: number = 0;

  constructor(
    boundaries: BoundaryCoordinates = [
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
    ],

    svgParams: Partial<SVGParamsBase> = {
      stroke: '#000000',
      fill: 'rgba(0,0,0,0)',
      strokeWidth: '1',
    },

    countShapecountUp: boolean = true
  ) {
    if (countShapecountUp) {
      Shape.#counter++;
      this.#id = nanoid();
    }
    this.#fill = svgParams.fill;
    this.#stroke = svgParams.stroke;
    this.#strokeWidth = svgParams.strokeWidth;
    this.transformMatrix = svgParams.transformMatrix;
    this.boundaries = boundaries;
    this.index = Shape.#counter;
  }

  moveTransformMatrix = (x: number, y: number) => {
    const {
      a = 1,
      b = 0,
      c = 0,
      d = 1,
      e = 0,
      f = 0,
    } = this.transformMatrix || {};
    this.transformMatrix = new DOMMatrix([a, b, c, d, e + x, f + y]);
  };

  moveBoundaries = (difference: Coordinates) => {
    const [xDifference, yDifference] = difference;
    this.boundaries = this.boundaries?.map(
      boundary =>
        [boundary[0] + xDifference, boundary[1] + yDifference] as Coordinates
    ) as BoundaryCoordinates;
  };

  getsvgParams = () => {
    return {
      fill: this.#fill,
      stroke: this.#stroke,
      strokeWidth: this.#strokeWidth,
      transformMatrix: this.transformMatrix,
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
