import { Coordinates, BoundaryCoordinates } from '../../../types/types';

export const getLineBoundaries = (
  startingPoint: Coordinates,
  endPoint: Coordinates
): BoundaryCoordinates => {
  const x1 = startingPoint[0];
  const x2 = endPoint[0];
  const y1 = startingPoint[1];
  const y2 = endPoint[1];
  return [
    [x1, y1],
    [x1, y2],
    [x2, y1],
    [x2, y2],
  ];
};
