import type {
  Coordinates,
  SVGParamsBase,
  TextSVGParams,
} from '../../../types/types';
import { getTextBoundaries } from '../../helper/coordinates';
import { Shape } from '../Shape';

export class TextShape extends Shape {
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
    this.calculationCenter = position;
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
      coordinates[0] - this.calculationCenter[0],
      coordinates[1] - this.calculationCenter[1],
    ];
    this.calculationCenter = coordinates;
    this.moveBoundaries([dx, dy]);
  };

  getCenter = (): Coordinates => this.calculationCenter;

  getDeconstructedShapeData = () => ({
    id: this.getId(),
    type: 'TextShape',
    width: this.#width,
    height: this.#height,
    position: this.calculationCenter,
    isLocked: this.isLocked,
    svgParams: this.getSvgParams(),
  });

  toSVGTextParams = (): TextSVGParams => {
    return {
      position: this.calculationCenter,
      ...this.getSvgParams(),
    };
  };
}
