export type Coordinates = [number, number];
export type VectorCoordinates = [Coordinates, Coordinates];
export type BoundaryCoordinates = [
  Coordinates,
  Coordinates,
  Coordinates,
  Coordinates
];

export type SVGParamsBase = {
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
  lineDash?: number[];
  lineCap?: CanvasLineCap;
  fontFamily?: string;
  fontSize?: number;
  transformMatrix?: DOMMatrix;
  text?: string;
  bBox?: SVGRect;
};

export type EllipseSVGParams = SVGParamsBase & {
  cx: string;
  cy: string;
  rx: string;
  ry: string;
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

export type TextSVGParams = SVGParamsBase & {
  position: Coordinates;
};

export type PathSVGParams = SVGParamsBase & {
  d: string;
};

export type FreehandSVGParams = SVGParamsBase & {
  points: string;
};

export type SVGDrawPath = {
  command: string;
  points?: Coordinates[] | string;
};

export type Partition<T> = [T[], T[]];

export type ChatEntry = { userName: string; message: string };

export type CallbackFunction<ArgumentType extends any[], ReturnType = void> = (
  ...args: ArgumentType
) => ReturnType;
