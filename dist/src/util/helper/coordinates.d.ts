import type { ShapeType } from '../../types/shapes.types';
import type { BoundaryCoordinates, Coordinates, SVGDrawPath, VectorCoordinates } from '../../types/types';
import type { Partition } from '../../types/util.types';
export declare const getCanvasRectangleValuesFromPoints: (startPoint: Coordinates, endPoint: Coordinates) => {
    startingCorner: Coordinates;
    width: number;
    height: number;
};
export declare const getFormattedRectangleValuesFromPoints: (startPoint: Coordinates, endPoint: Coordinates) => {
    startingCorner: Coordinates;
    width: number;
    height: number;
};
export declare const calculateDistanceBetweenPoints: (startPoint: Coordinates, endPoint: Coordinates) => number;
export declare const calculateVectorFromCoordinates: (vectorCoordinates: VectorCoordinates) => Coordinates;
export declare const sumOfVectors: (vectorCoordinates: VectorCoordinates[]) => Coordinates;
export declare const partitionCoordinates: (coordinates: Coordinates[]) => Partition<number>;
export declare const isPointInsideAnotherShape: (point: Coordinates) => (shape: ShapeType) => boolean | undefined;
export declare const isShapeInsideAnotherShape: (potentiallyBiggerShape?: ShapeType | undefined) => (potentiallySmallerShape: ShapeType) => boolean | undefined;
export declare const getCircleBoundaries: (center: Coordinates, radiusX: number, radiusY: number) => BoundaryCoordinates;
export declare const getRectBoundaries: (startingCorner: Coordinates, width: number, height: number) => BoundaryCoordinates;
export declare const getLineBoundaries: (startingPoint: Coordinates, endPoint: Coordinates) => BoundaryCoordinates;
export declare const getTextBoundaries: (position: Coordinates, width: number, height: number) => BoundaryCoordinates;
export declare const relativePathToAbsolutePath: (drawPath: SVGDrawPath[], offset?: Coordinates | undefined) => SVGDrawPath[];
export declare const getPointsOfDrawPath: (drawPath: SVGDrawPath[]) => Coordinates[];
export declare const splitCoordinate: (acc: [number[], number[]], point: string | Coordinates) => [number[], number[]];
export declare const splitAllCoordinates: (coordinates: Array<string | Coordinates>) => [number[], number[]];
export declare const getMinMaxValuesOfSplitCoordinates: (xCoordinates: number[], yCoordinates: number[]) => {
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
};
export declare const getMinMaxValuesOfCoordinates: (coordinates: Coordinates[]) => {
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
};
export declare const getBoundaryFromCoordinates: (coordinates: Coordinates[]) => BoundaryCoordinates;
export declare const getPathBoundaries: (drawPath: SVGDrawPath[]) => BoundaryCoordinates;
export declare const sumOfCoordinates: (coordinates1: Coordinates) => (coordinates2: Coordinates) => Coordinates;
export declare const rectangleParamsFromBoundaries: (boundaries: BoundaryCoordinates) => {
    startingCorner: Coordinates;
    width: number;
    height: number;
};
