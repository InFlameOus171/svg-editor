export type NullableString = null | string;
export type NullableNumber = null | number;
export type Coordinates = { x: number; y: number };
export type BoundaryCoordinates = [
  { x1: number; y1: number; x2: number; y2: number }
];
export type Shape = {
  name?: string;
  coordinates?: Coordinates[];
  boundaryCoordinates?: BoundaryCoordinates;
};
