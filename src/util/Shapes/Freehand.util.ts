import type { Coordinates, BoundaryCoordinates } from '../../types/types';
import { getUniqueXandYCoordinatesFromBoundaries } from '../helper/util';

export const getFreehandBoundaries = (
  points: Coordinates[]
): BoundaryCoordinates => {
  const [uniqueXCoordinates, uniqueYCoordinates] =
    getUniqueXandYCoordinatesFromBoundaries(points);
  const maxX = Math.max(...uniqueXCoordinates);
  const maxY = Math.max(...uniqueYCoordinates);
  const minX = Math.min(...uniqueXCoordinates);
  const minY = Math.min(...uniqueYCoordinates);
  return [
    [minX, minY],
    [minX, maxY],
    [maxX, minY],
    [maxX, maxY],
  ];
};
