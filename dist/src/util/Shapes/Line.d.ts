import type { Coordinates, LineSVGParams, SVGParamsBase, VectorCoordinates } from '../../types/types';
import { Shape } from './Shape';
export declare class Line extends Shape {
    #private;
    points: VectorCoordinates;
    constructor(startPoint: Coordinates, endPoint: Coordinates, svgParams?: Partial<SVGParamsBase>, countShapeCountUp?: boolean, isLocked?: boolean);
    moveTo: (coordinates: Coordinates) => void;
    getCenter: () => Coordinates;
    toSVGLineParams: () => LineSVGParams;
    getDeconstructedShapeData: () => {
        id: string;
        type: string;
        startPoint: Coordinates;
        endPoint: Coordinates;
        isLocked: boolean;
        svgParams: SVGParamsBase;
    };
    toString: () => string;
}
