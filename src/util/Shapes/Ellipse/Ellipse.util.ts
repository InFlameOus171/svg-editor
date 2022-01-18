import { Coordinates, BoundaryCoordinates } from '../../../types/types';

export const getCircleBoundaries = (
  center: Coordinates,
  radiusX: number,
  radiusY: number
): BoundaryCoordinates => {
  const topLeftCorner: Coordinates = [center[0] - radiusX, center[1] + radiusY];
  const topRightCorner: Coordinates = [
    center[0] + radiusX,
    center[1] + radiusY,
  ];
  const bottomLeftCorner: Coordinates = [
    center[0] - radiusX,
    center[1] - radiusY,
  ];
  const bottomRightCorner: Coordinates = [
    center[0] + radiusX,
    center[1] - radiusY,
  ];
  return [topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner];
};
