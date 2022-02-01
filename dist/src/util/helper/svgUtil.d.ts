import { ShapeType } from '../../types/typeGuards.types';
import { RectSVGParams, EllipseSVGParams, LineSVGParams, FreehandSVGParams, PathSVGParams, SVGDrawPath, SVGParamsBase } from '../../types/types';
import { TextShape } from '../shapes/Text/Text';
export declare const setSVGStyleParams: (svgShape: Element, lineDash?: number[] | undefined, lineCap?: string | undefined, fill?: string | undefined, stroke?: string | undefined, strokeWidth?: string | undefined, transformMatrix?: DOMMatrix | undefined) => void;
export declare const setRectSVGParams: (svgShape: Element, rectParams: RectSVGParams) => void;
export declare const setEllipseSVGParams: (svgShape: Element, ellipseParams: EllipseSVGParams) => void;
export declare const setCircleSVGParams: (svgShape: Element, circleParams: EllipseSVGParams) => void;
export declare const setLineSVGParams: (svgShape: Element, lineParams: LineSVGParams) => void;
export declare const setFreehandSVGParams: (svgShape: Element, freehandParams: FreehandSVGParams) => void;
export declare const setPathSVGParams: (svgShape: Element, svgParams: PathSVGParams) => void;
export declare const setTextSVGParams: (svgShape: Element, textObject: TextShape) => void;
export declare const shapeToSVGFuncGenerator: (parent?: SVGGraphicsElement | undefined, svgNameSpace?: string | null) => (shape: ShapeType) => void;
export declare const convertMatchesToSVGDrawPath: (match: RegExpMatchArray) => SVGDrawPath;
export declare const getPathCommands: (d: string) => SVGDrawPath[];
export declare const generateSVGURLFromShapes: (shapes: ShapeType[]) => string;
export declare const getSVGParamsFromSVG: (element: SVGGraphicsElement) => SVGParamsBase;
export declare const convertSVGDocumentToShapes: (id: string) => ShapeType[];
export declare const importSVG: (svg: Document) => ShapeType[] | undefined;
