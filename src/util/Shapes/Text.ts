import { Coordinates, SVGParamsBase } from '../../types/types';
import { getTextBoundaries } from '../helper/coordinates';
import { Shape } from './Shape';

export class TextShape extends Shape {
  #position: Coordinates;
  #height: number;
  #width: number;
  constructor(
    width: number,
    height: number,
    position: Coordinates,
    svgParams: SVGParamsBase,
    countShapecountUp?: boolean
  ) {
    super(
      getTextBoundaries(position, width, height),
      svgParams,
      countShapecountUp
    );
    this.#width = width;
    this.#height = height;
    this.#position = position;
  }

  getText = () => {
    return this.text;
  };

  moveTo = (coordinates: Coordinates) => {
    const [dx, dy] = [
      coordinates[0] - this.#position[0],
      coordinates[1] - this.#position[1],
    ];
    this.#position = coordinates;
    this.moveBoundaries([dx, dy]);
  };

  toPathParams = () => ({
    position: this.#position,
  });

  getCenter = (): Coordinates => this.#position;

  toSVGTextParams = () => {
    return {
      position: this.#position,
      ...this.getSvgParams(),
    };
  };
}
