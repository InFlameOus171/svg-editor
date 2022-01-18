import { Coordinates } from '../../../types/types';

export const getFormattedRectangleValuesFromPoints = (
  startPoint: Coordinates,
  endPoint: Coordinates
): { startingCorner: Coordinates; width: number; height: number } => {
  const width = Math.abs(endPoint[0] - startPoint[0]);
  const height = Math.abs(endPoint[1] - startPoint[1]);
  const newStartingCorner: Coordinates = [
    Math.min(startPoint[0], endPoint[0]),
    Math.min(startPoint[1], endPoint[1]),
  ];
  return {
    startingCorner: newStartingCorner,
    width,
    height,
  };
};
