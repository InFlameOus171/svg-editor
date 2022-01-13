import type { Coordinates, FreehandSVGParams, SVGParamsBase } from '../../types/types';
import { Shape } from './Shape';
export declare class Freehand extends Shape {
    #private;
    constructor(points: Coordinates[], svgParams?: Partial<SVGParamsBase>, countShapecountUp?: boolean, isLocked?: boolean);
    getCenter: () => Coordinates;
    moveTo: (coordinates: Coordinates) => void;
    getPoints: () => Coordinates[];
    toSVGFreehandParams: () => FreehandSVGParams;
    getDeconstructedShapeData: () => {
        id: string;
        type: string;
        points: Coordinates[];
        isLocked: boolean;
        svgParams: SVGParamsBase;
    };
    toString: () => string;
}
