import type {
  Coordinates,
  RectSVGParams,
  SVGParamsBase,
} from '../../../types/types';
import { getRectangleBoundaries } from './Rectangle.util';
import { Shape } from '../Shape';

export class Rectangle extends Shape {
  #width: number = 0;
  #height: number = 0;

  constructor(
    startingCorner: Coordinates,
    width: number,
    height: number,
    svgParams: Partial<SVGParamsBase> = {},
    countShapecountUp?: boolean,
    isLocked: boolean = false
  ) {
    super(
      getRectangleBoundaries(startingCorner, width, height),
      svgParams,
      countShapecountUp,
      isLocked
    );
    this.calculationCenter = startingCorner;
    this.#width = width;
    this.#height = height;
  }

  resize = (coordinates: Coordinates) => {
    this.#width = (coordinates[0] - this.calculationCenter[0]) * 2;
    this.#height = (coordinates[1] - this.calculationCenter[1]) * 2;
  };

  moveTo = (coordinates: Coordinates) => {
    const xDifference = coordinates[0] - this.calculationCenter[0];
    const yDifference = coordinates[1] - this.calculationCenter[1];
    this.calculationCenter = coordinates;
    this.moveBoundaries([xDifference, yDifference]);
  };

  getCenter: () => Coordinates = () => {
    return this.calculationCenter;
  };

  getWidth: () => number = () => {
    return this.#width;
  };

  getHeight: () => number = () => {
    return this.#height;
  };

  toSvgRectParams = (): RectSVGParams => ({
    x: this.calculationCenter[0].toString(),
    y: this.calculationCenter[1].toString(),
    width: this.#width.toString(),
    height: this.#height.toString(),
    ...this.getSvgParams(),
  });

  getDeconstructedShapeData = () => ({
    id: this.getId(),
    type: 'Rectangle',
    startingCorner: this.calculationCenter,
    width: this.#width,
    height: this.#height,
    isLocked: this.isLocked,
    svgParams: this.getSvgParams(),
  });

  toString = () => {
    return JSON.stringify(this.boundaries);
  };
}
