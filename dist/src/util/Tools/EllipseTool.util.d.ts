import type { SVGParamsBase, Coordinates } from '../../types/types';
import { Ellipse } from '../Shapes/Ellipse';
export declare const generateEllipse: (startCoordinates: Coordinates, endCoordinates: Coordinates, svgParams?: Partial<SVGParamsBase> | undefined, countShapecountUp?: boolean | undefined) => Ellipse;
export declare const generateCircle: (startCoordinates: Coordinates, endCoordinates: Coordinates, svgParams?: Partial<SVGParamsBase> | undefined, countShapecountUp?: boolean | undefined) => Ellipse;
