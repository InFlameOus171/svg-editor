import { Coordinates, SVGParamsBase, TextSVGParams } from '../../types/types';
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
    countShapecountUp?: boolean,
    isLocked: boolean = false
  ) {
    super(
      getTextBoundaries(position, width, height),
      svgParams,
      countShapecountUp,
      isLocked
    );
    this.#width = width;
    this.#height = height;
    this.#position = position;
  }

  getText = () => {
    return this.text;
  };

  getHeight = () => {
    return this.#height;
  };

  getWidth = () => {
    return this.#width;
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

  getDeconstructedShapeData = () => ({
    id: this.getId(),
    type: 'TextShape',
    width: this.#width,
    height: this.#height,
    position: this.#position,
    isLocked: this.isLocked,
    svgParams: this.getSvgParams(),
  });

  toSVGTextParams = (): TextSVGParams => {
    return {
      position: this.#position,
      ...this.getSvgParams(),
    };
  };
}
