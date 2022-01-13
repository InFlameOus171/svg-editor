import type { Coordinates, SVGDrawPath, SVGParamsBase } from '../../types/types';
import { Shape } from './Shape';
export declare class Path extends Shape {
    #private;
    drawPath: SVGDrawPath[];
    constructor(drawPath: SVGDrawPath[], svgParams?: Partial<SVGParamsBase>, dontCountUp?: boolean, isLocked?: boolean);
    getCenter: () => Coordinates;
    toSVGPathParams: () => {
        fill?: string | undefined;
        stroke?: string | undefined;
        strokeWidth?: string | undefined;
        lineDash?: number[] | undefined;
        lineCap?: CanvasLineCap | undefined;
        fontFamily?: string | undefined;
        fontSize?: number | undefined;
        transformMatrix?: DOMMatrix | undefined;
        text?: string | undefined;
        bBox?: DOMRect | undefined;
        d: string;
    };
    getDeconstructedShapeData: () => {
        id: string;
        type: string;
        drawPath: SVGDrawPath[];
        isLocked: boolean;
        svgParams: SVGParamsBase;
    };
    moveTo: (coordinates: Coordinates) => void;
    toString: () => string;
}
