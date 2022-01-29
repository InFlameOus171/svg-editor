import type { Coordinates, SVGParamsBase, TextSVGParams } from '../../../types/types';
import { Shape } from '../Shape';
export declare class TextShape extends Shape {
    #private;
    constructor(width: number, height: number, position: Coordinates, svgParams: SVGParamsBase, countShapecountUp?: boolean, isLocked?: boolean);
    getText: () => string;
    getHeight: () => number;
    getWidth: () => number;
    moveTo: (coordinates: Coordinates) => void;
    getCenter: () => Coordinates;
    getDeconstructedShapeData: () => {
        id: string;
        type: string;
        width: number;
        height: number;
        position: Coordinates;
        isLocked: boolean;
        svgParams: SVGParamsBase;
    };
    toSVGTextParams: () => TextSVGParams;
}
