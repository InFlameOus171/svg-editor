import type { Coordinates, RectSVGParams, SVGParamsBase } from '../../../types/types';
import { Shape } from '../Shape';
export declare class Rectangle extends Shape {
    #private;
    constructor(startingCorner: Coordinates, width: number, height: number, svgParams?: Partial<SVGParamsBase>, countShapecountUp?: boolean, isLocked?: boolean);
    resize: (coordinates: Coordinates) => void;
    moveTo: (coordinates: Coordinates) => void;
    getCenter: () => Coordinates;
    getWidth: () => number;
    getHeight: () => number;
    toSvgRectParams: () => RectSVGParams;
    getDeconstructedShapeData: () => {
        id: string;
        type: string;
        startingCorner: Coordinates;
        width: number;
        height: number;
        isLocked: boolean;
        svgParams: SVGParamsBase;
    };
    toString: () => string;
}
