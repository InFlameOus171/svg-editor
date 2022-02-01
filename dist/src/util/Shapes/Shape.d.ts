import type { BoundaryCoordinates, Coordinates, SVGParamsBase } from '../../types/types';
export declare abstract class Shape {
    #private;
    isLocked: boolean;
    text: string;
    transformMatrix?: DOMMatrix;
    boundaries: BoundaryCoordinates;
    calculationCenter: Coordinates;
    index: number;
    constructor(boundaries?: BoundaryCoordinates, svgParams?: Partial<SVGParamsBase>, countShapecountUp?: boolean, isLocked?: boolean);
    moveTransformMatrix: (x: number, y: number) => void;
    updateSVGParam: (field: keyof SVGParamsBase, value: any) => void;
    updateSVGParams: (newParams: SVGParamsBase) => void;
    replaceID: (id: string) => this;
    moveBoundaries: (difference: Coordinates) => void;
    getSvgParams: () => SVGParamsBase;
    getId: () => string;
    getCenter: () => Coordinates;
    moveTo: (coordinates: Coordinates) => void;
    toString: () => string;
    getDeconstructedShapeData: () => any;
}
