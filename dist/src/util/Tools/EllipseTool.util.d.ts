import type { SVGParamsBase } from '../../types/types';
import { Ellipse } from '../Shapes/Ellipse';
export declare const generateEllipse: (startCoordinates: [number, number], endCoordinates: [number, number], svgParams?: Partial<SVGParamsBase> | undefined, countShapecountUp?: boolean | undefined) => Ellipse;
export declare const generateCircle: (startCoordinates: [number, number], endCoordinates: [number, number], svgParams?: Partial<SVGParamsBase> | undefined, countShapecountUp?: boolean | undefined) => Ellipse;
