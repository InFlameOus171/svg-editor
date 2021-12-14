import { Line } from '../util/Shapes/Line';

declare global {
  interface Element {
    getFloatAttribute: (value: string) => number;
  }
}

export type NullableString = null | string;
export type NullableNumber = null | number;
export type Coordinates = [number, number];
export type RectangleComponents = [Line, Line, Line, Line];
export type VectorCoordinates = [Coordinates, Coordinates];
export type BoundaryCoordinates = [
  Coordinates,
  Coordinates,
  Coordinates,
  Coordinates
];

export type SVGParamsBase = {
  fill: string;
  stroke: string;
  strokeWidth: string;
};

export type EllipseSVGParams = SVGParamsBase & {
  cx: string;
  cy: string;
  rx: string;
  ry: string;
};
export type CircleSVGParams = SVGParamsBase & {
  cx: string;
  cy: string;
  r: string;
};
export type RectSVGParams = SVGParamsBase & {
  x: string;
  y: string;
  width: string;
  height: string;
};

export type LineSVGParams = SVGParamsBase & {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
};

export type FreehandSVGParams = SVGParamsBase & {
  points: string;
};

export type SVGDrawPath = {
  command: string;
  points: Coordinates[];
};
