import { Line } from '../util/Shapes/Line';

export type NullableString = null | string;
export type NullableNumber = null | number;
export type Coordinates = [number, number];
export type RectangleComponents = [Line, Line, Line, Line];
export type LineComponents = [Coordinates, Coordinates];
export type BoundaryCoordinates = [
  { x1: number; y1: number; x2: number; y2: number }
];
