import { Coordinates, SVGParamsBase, EllipseSVGParams } from '../../../types/types';
import { Shape } from '../Shape';
export declare class Ellipse extends Shape {
    radiusX: number;
    radiusY: number;
    constructor(center: Coordinates, radiusX: number, radiusY: number, svgParams?: Partial<SVGParamsBase>, countShapeCountUp?: boolean, isLocked?: boolean);
    getCenter: () => Coordinates;
    toSVGEllipseParams: () => EllipseSVGParams;
    getDeconstructedShapeData: () => {
        type: string;
        id: string;
        center: Coordinates;
        radiusX: number;
        radiusY: number;
        isLocked: boolean;
        svgParams: SVGParamsBase;
    };
    toString: () => string;
}
