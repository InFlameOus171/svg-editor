import { Coordinates, RectSVGParams } from '../../types/types';
import { getRectBoundaries } from '../helper/coordinates';
import { Shape } from './Shape';

export class Rectangle extends Shape {
  #startingCorner: Coordinates = [-1, -1];
  #width: number = 0;
  #height: number = 0;

  constructor(
    startingCorner: Coordinates,
    width: number,
    height: number,
    isPreview?: boolean
  ) {
    super(getRectBoundaries(startingCorner, width, height), isPreview);
    this.#startingCorner = startingCorner;
    this.#width = width;
    this.#height = height;
  }

  resize = (coordinates: Coordinates) => {
    this.#width = (coordinates[0] - this.#startingCorner[0]) * 2;
    this.#height = (coordinates[1] - this.#startingCorner[1]) * 2;
  };

  moveTo = (coordinates: Coordinates) => {
    const xDifference = coordinates[0] - this.#startingCorner[0];
    const yDifference = coordinates[1] - this.#startingCorner[1];
    this.#startingCorner = coordinates;
    this.moveBoundaries([xDifference, yDifference]);
  };

  getCenter: () => Coordinates = () => {
    return this.#startingCorner;
  };

  getWidth: () => number = () => {
    return this.#width;
  };

  getHeight: () => number = () => {
    return this.#height;
  };

  toPathParams = () => ({
    x: this.#startingCorner[0],
    y: this.#startingCorner[1],
    width: this.#width,
    height: this.#height,
  });

  toSvgParams = (): RectSVGParams => ({
    x: this.#startingCorner[0].toString(),
    y: this.#startingCorner[1].toString(),
    width: this.#width.toString(),
    height: this.#height.toString(),
    fill: this.getFill(),
    stroke: this.getStroke(),
    strokeWidth: this.getStrokeWidth(),
  });

  toString = () => {
    return JSON.stringify(this.boundaries);
  };
}
