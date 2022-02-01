import {
  Coordinates,
  SVGParamsBase,
  EllipseSVGParams,
} from '../../../types/types';
import { Shape } from '../Shape';
import { getCircleBoundaries } from './Ellipse.util';

export class Ellipse extends Shape {
  radiusX: number;
  radiusY: number;
  constructor(
    center: Coordinates,
    radiusX: number,
    radiusY: number,
    svgParams?: Partial<SVGParamsBase>,
    countShapeCountUp?: boolean,
    isLocked: boolean = false
  ) {
    super(
      getCircleBoundaries(center, radiusX, radiusY),
      svgParams,
      countShapeCountUp,
      isLocked
    );
    this.calculationCenter = center;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
  }

  getCenter = () => {
    return this.calculationCenter;
  };

  toSVGEllipseParams = (): EllipseSVGParams => ({
    cx: this.calculationCenter[0].toString(),
    cy: this.calculationCenter[1].toString(),
    rx: this.radiusX.toString(),
    ry: this.radiusY.toString(),
    ...this.getSvgParams(),
  });

  getDeconstructedShapeData = () => ({
    type: 'Ellipse',
    id: this.getId(),
    center: this.calculationCenter,
    radiusX: this.radiusX,
    radiusY: this.radiusY,
    isLocked: this.isLocked,
    svgParams: this.getSvgParams(),
  });

  toString = () => {
    return JSON.stringify({
      center: this.calculationCenter,
      radiusX: this.radiusX,
      radiusY: this.radiusY,
    });
  };
}
