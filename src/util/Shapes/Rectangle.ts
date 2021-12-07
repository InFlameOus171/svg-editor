import { Coordinates } from '../../types/types';
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

  /**
   * @returns Array containing Path2d.rect(x,y,w,h) parameters: [x,y,w,h]
   */
  toPath2DRectParams: () => [number, number, number, number] = () => {
    return [
      this.#startingCorner[0],
      this.#startingCorner[1],
      this.#width,
      this.#height,
    ];
  };

  toString = () => {
    return JSON.stringify(this.boundaries);
  };
}
