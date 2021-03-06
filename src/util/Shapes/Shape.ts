import { nanoid } from 'nanoid';
import type {
  BoundaryCoordinates,
  Coordinates,
  SVGParamsBase,
} from '../../types/types';
import { textPlaceHolder } from '../helper/constants';
import { getTextBoundaries } from '../helper/coordinates';
import { measureText } from '../helper/shapes';
import { isText } from '../helper/typeguards';

export abstract class Shape {
  static #counter: number = 0;

  #fill?: string;
  #id: string;
  #stroke?: string;
  #strokeWidth?: string;
  #lineCap?: CanvasLineCap;
  #lineDash?: number[];
  #fontSize?: number;
  #fontFamily?: string;
  isLocked: boolean = false;
  text: string = textPlaceHolder;
  transformMatrix?: DOMMatrix;
  boundaries: BoundaryCoordinates;
  calculationCenter: Coordinates = [-1, -1];
  index: number = 0;

  constructor(
    boundaries: BoundaryCoordinates = [
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
    ],
    svgParams: Partial<SVGParamsBase> = {},
    countShapecountUp: boolean = true,
    isLocked: boolean = false
  ) {
    if (countShapecountUp) {
      Shape.#counter++;
    }
    this.#id = nanoid();
    this.#fill = svgParams.fill ?? 'rgba(0,0,0,0)';
    this.#stroke = svgParams.stroke ?? 'rgba(0,0,0,1)';
    this.#strokeWidth = svgParams.strokeWidth ?? '1';
    this.#lineDash = svgParams.lineDash ?? [0];
    this.#fontSize = svgParams.fontSize ?? 18;
    this.#fontFamily = svgParams.fontFamily ?? 'Arial';
    this.text = svgParams.text ?? this.text;
    this.transformMatrix = svgParams.transformMatrix;
    this.boundaries = boundaries;
    this.isLocked = isLocked;
    this.index = Shape.#counter;
  }

  moveTransformMatrix = (x: number, y: number) => {
    const { a, b, c, d, e, f } = this.transformMatrix || new DOMMatrix();
    this.transformMatrix = new DOMMatrix([a, b, c, d, e + x, f + y]);
  };

  updateSVGParam = (field: keyof SVGParamsBase, value: any) => {
    const currentParams = this.getSvgParams();
    currentParams[field] = value;
    this.updateSVGParams(currentParams);
  };

  updateSVGParams = (newParams: SVGParamsBase) => {
    this.#fill = newParams.fill;
    this.#stroke = newParams.stroke;
    this.#strokeWidth = newParams.strokeWidth;
    this.#lineCap = newParams.lineCap;
    this.#lineDash = newParams.lineDash;
    this.#fontFamily = newParams.fontFamily;
    this.#fontSize = newParams.fontSize;
    if (isText(this)) {
      this.text = newParams.text ?? this.text;
      const measures = measureText(this.text, this.getSvgParams());
      if (measures) {
        this.boundaries = getTextBoundaries(
          this.getCenter(),
          measures?.width,
          measures?.height
        );
      }
    }
  };

  replaceID = (id: string) => {
    this.#id = id;
    return this;
  };

  moveBoundaries = (difference: Coordinates) => {
    const [xDifference, yDifference] = difference;
    this.boundaries = this.boundaries?.map(
      boundary =>
        [boundary[0] + xDifference, boundary[1] + yDifference] as Coordinates
    ) as BoundaryCoordinates;
  };

  getSvgParams = (): SVGParamsBase => {
    return {
      fill: this.#fill,
      stroke: this.#stroke,
      strokeWidth: this.#strokeWidth,
      transformMatrix: this.transformMatrix,
      lineCap: this.#lineCap,
      lineDash: this.#lineDash,
      fontSize: this.#fontSize,
      fontFamily: this.#fontFamily,
      text: this.text,
    };
  };

  getId = () => {
    return this.#id;
  };

  getCenter = (): Coordinates => {
    return this.calculationCenter;
  };

  moveTo = (coordinates: Coordinates) => {
    const [dx, dy] = [
      coordinates[0] - this.calculationCenter[0],
      coordinates[1] - this.calculationCenter[1],
    ];
    this.calculationCenter = coordinates;
    this.moveBoundaries([dx, dy]);
  };
  toString = (): string => {
    throw new Error('not implemented');
  };

  getDeconstructedShapeData = (): any => {
    throw new Error('not implemented');
  };
}
