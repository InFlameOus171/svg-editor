import { nanoid } from 'nanoid';
import {
  BoundaryCoordinates,
  Coordinates,
  PenConfiguration,
  SVGParamsBase,
} from '../../types/types';
import { getMinMaxValuesOfCoordinates } from '../helper/coordinates';
import { rotate } from '../helper/util';
import { Pen } from '../Pen';

export abstract class Shape {
  static #counter: number = 0;

  #fill?: string;
  #id?: string;
  #stroke?: string;
  #strokeWidth?: string;
  #lineCap?: CanvasLineCap;
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
      stroke: 'rgba(0,0,0,1)',
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
    const { a, b, c, d, e, f } = this.transformMatrix || new DOMMatrix();
    this.transformMatrix = new DOMMatrix([a, b, c, d, e + x, f + y]);
  };

  scaleBoundaries = (x: number, y: number) => {
    const { xMin, xMax, yMin, yMax } = getMinMaxValuesOfCoordinates(
      this.boundaries
    );
    const point = new DOMPoint(xMax, yMax).matrixTransform(
      new DOMMatrix().scale(x, y)
    );
    const [newXMax, newYMax] = [point.x, point.y];

    this.boundaries = [
      [xMin, yMin],
      [xMin, newYMax],
      [newXMax, yMin],
      [newXMax, newYMax],
    ];
  };

  rotateBoundaries = (rotation: number) => {
    console.log('before rotation', this.boundaries);
    const { xMin, xMax, yMin, yMax } = getMinMaxValuesOfCoordinates(
      this.boundaries
    );
    this.boundaries = this.boundaries.map(boundary => {
      const [x, y] = boundary;
      return rotate(xMin, yMin, x, y, rotation);
    }) as BoundaryCoordinates;
    console.log('after rotation', this.boundaries);
  };

  applyStyles = (config: PenConfiguration) => {
    this.#fill = config.fill;
    this.#stroke = config.stroke;
    this.#strokeWidth = config.strokeWidth?.toString();
    this.#lineCap = config.lineCap;
    if (config.scaling || config.rotation) {
      const { x: scaleX, y: scaleY } = config.scaling || { x: 1, y: 1 };
      const rotation = config.rotation ?? 0;
      this.transformMatrix = this.transformMatrix
        ?.rotate(rotation)
        .scale(scaleX, scaleY);
      this.scaleBoundaries(scaleX, scaleY);
      this.rotateBoundaries(rotation);
      const { a, b, c, d, e, f } = this.transformMatrix || {};
      console.log(this.boundaries, { a, b, c, d, e, f });
    }
  };

  moveBoundaries = (difference: Coordinates) => {
    const [xDifference, yDifference] = difference;
    this.boundaries = this.boundaries?.map(
      boundary =>
        [boundary[0] + xDifference, boundary[1] + yDifference] as Coordinates
    ) as BoundaryCoordinates;
  };

  getSvgParams = () => {
    return {
      fill: this.#fill,
      stroke: this.#stroke,
      strokeWidth: this.#strokeWidth,
      transformMatrix: this.transformMatrix,
      lineCap: this.#lineCap,
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
