import { SVGDrawPath, Coordinates, BoundaryCoordinates } from '../../types/types';
export declare const getPointsOfDrawPath: (drawPath: SVGDrawPath[]) => Coordinates[];
export declare const relativePathToAbsolutePath: (drawPath: SVGDrawPath[], offset?: Coordinates | undefined) => SVGDrawPath[];
export declare const getPathBoundaries: (drawPath: SVGDrawPath[]) => BoundaryCoordinates;
