import { Coordinates, RectSVGParams } from '../../types/types';
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
    super(isPreview);
    this.#startingCorner = startingCorner;
    this.#width = width;
    this.#height = height;
    this.updateBoundaries();
  }

  updateBoundaries = () => {
    const xMin = this.#startingCorner[0];
    const yMax = this.#startingCorner[1];
    const xMax = this.#startingCorner[0] + this.#width;
    const yMin = this.#startingCorner[1] + this.#height;
    this.boundaries = [
      [xMin, yMin],
      [xMin, yMax],
      [xMax, yMin],
      [xMax, yMax],
    ];
  };

  resize = (coordinates: Coordinates) => {
    this.#width = (coordinates[0] - this.#startingCorner[0]) * 2;
    this.#height = (coordinates[1] - this.#startingCorner[1]) * 2;
  };

  moveTo = (coordinates: Coordinates) => {
    this.#startingCorner = coordinates;
    this.updateBoundaries();
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
