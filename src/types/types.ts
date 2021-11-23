import { Line } from '../util/Shapes/Line';

export type NullableString = null | string;
export type NullableNumber = null | number;
export type Coordinates = [number, number];
export type RectangleComponents = [Line, Line, Line, Line];
export type VectorCoordinates = [Coordinates, Coordinates];
export type BoundaryCoordinates = [
  Coordinates,
  Coordinates,
  Coordinates,
  Coordinates
];
