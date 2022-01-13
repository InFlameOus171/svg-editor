export declare type NullableString = null | string;
export declare type NullableNumber = null | number;
export declare type Coordinates = [number, number];
export declare type VectorCoordinates = [Coordinates, Coordinates];
export declare type BoundaryCoordinates = [
    Coordinates,
    Coordinates,
    Coordinates,
    Coordinates
];
export declare type SVGParamsBase = {
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
export declare type EllipseSVGParams = SVGParamsBase & {
    cx: string;
    cy: string;
    rx: string;
    ry: string;
};
export declare type CircleSVGParams = SVGParamsBase & {
    cx: string;
    cy: string;
    r: string;
};
export declare type RectSVGParams = SVGParamsBase & {
    x: string;
    y: string;
    width: string;
    height: string;
};
export declare type LineSVGParams = SVGParamsBase & {
    x1: string;
    y1: string;
    x2: string;
    y2: string;
};
export declare type TextSVGParams = SVGParamsBase & {
    position: Coordinates;
};
export declare type PathSVGParams = SVGParamsBase & {
    d: string;
};
export declare type FreehandSVGParams = SVGParamsBase & {
    points: string;
};
export declare type SVGDrawPath = {
    command: string;
    points?: Coordinates[] | string;
};
export declare type Matrix = [number, number, number, number, number, number];
