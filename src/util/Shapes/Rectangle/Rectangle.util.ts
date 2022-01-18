import { Coordinates, BoundaryCoordinates } from '../../../types/types';

export const getRectangleBoundaries = (
  startingCorner: Coordinates,
  width: number,
  height: number
): BoundaryCoordinates => {
  const xMin = startingCorner[0];
  const yMax = startingCorner[1];
  const xMax = startingCorner[0] + width;
  const yMin = startingCorner[1] + height;
  return [
    [xMin, yMin],
    [xMin, yMax],
    [xMax, yMin],
    [xMax, yMax],
  ];
};
