import { Coordinates, SVGParamsBase } from '../../types/types';
import { getTextBoundaries } from '../helper/coordinates';
import { Shape } from './Shape';

export class TextShape extends Shape {
  #text: string;
  #position: Coordinates;
  constructor(
    text: string = '',
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
    console.log(this.boundaries);
    this.#text = text;
    this.#position = position;
  }

  toSVGTextParams = () => {
    return {
      text: this.#text,
      position: this.#position,
      ...this.getSvgParams(),
    };
  };
}
