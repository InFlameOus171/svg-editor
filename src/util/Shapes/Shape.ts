import { nanoid } from 'nanoid';
import {
  BoundaryCoordinates,
  Coordinates,
  PenConfiguration,
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
      fill: 'rgba(0,0,0,1)',
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
    this.transformMatrix = this.transformMatrix?.translate(x, y);
  };

  applyStyles = (config: PenConfiguration) => {
    this.#fill = config.fill;
    this.#stroke = config.stroke;
    this.#strokeWidth = config.strokeWidth?.toString();
    if (config.scaling || config.rotation) {
      const { x: scaleX, y: scaleY } = config.scaling || { x: 1, y: 1 };
      const rotation = config.rotation ?? 0;
      this.transformMatrix = this.transformMatrix
        ?.rotate(rotation)
        .scale(scaleX, scaleY);
      const basicMatrix = new DOMMatrix()
        .rotate(rotation)
        .scale(scaleX, scaleY);
      this.boundaries = this.boundaries.map(boundary => {
        const point = new DOMPoint(boundary[0], boundary[1]);
        const transformedPoint = point.matrixTransform(basicMatrix);
        return [transformedPoint.x, transformedPoint.y];
      }) as BoundaryCoordinates;
    }
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
