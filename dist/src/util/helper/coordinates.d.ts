import type { ShapeType } from '../../types/typeGuards.types';
import type { BoundaryCoordinates, Coordinates, Partition } from '../../types/types';
export declare const getCanvasRectangleValuesFromPoints: (startPoint: Coordinates, endPoint: Coordinates) => {
    startingCorner: Coordinates;
    width: number;
    height: number;
};
export declare const calculateDistanceBetweenPoints: (startPoint: Coordinates, endPoint: Coordinates) => number;
export declare const partitionCoordinates: (coordinates: Coordinates[]) => Partition<number>;
export declare const isPointInsideAnotherShape: (point: Coordinates) => (shape: ShapeType) => boolean | undefined;
export declare const isShapeInsideAnotherShape: (potentiallyBiggerShape?: ShapeType | undefined) => (potentiallySmallerShape: ShapeType) => boolean | undefined;
export declare const getTextBoundaries: (position: Coordinates, width: number, height: number) => BoundaryCoordinates;
export declare const splitCoordinates: (acc: [number[], number[]], point: string | Coordinates) => [number[], number[]];
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
export declare const sumOfCoordinates: (coordinates1: Coordinates) => (coordinates2: Coordinates) => Coordinates;
export declare const rectangleParamsFromBoundaries: (boundaries: BoundaryCoordinates) => {
    startingCorner: Coordinates;
    width: number;
    height: number;
};
