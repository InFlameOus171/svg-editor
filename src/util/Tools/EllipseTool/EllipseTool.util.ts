import { Coordinates, SVGParamsBase } from '../../../types/types';
import { calculateDistanceBetweenPoints } from '../../helper/coordinates';
import { Ellipse } from '../../shapes/Ellipse/Ellipse';

export const generateEllipse = (
  startCoordinates: Coordinates,
  endCoordinates: Coordinates,
  svgParams?: Partial<SVGParamsBase>,
  countShapecountUp?: boolean
) => {
  const center: Coordinates = [
    (startCoordinates[0] + endCoordinates[0]) / 2,
    (startCoordinates[1] + endCoordinates[1]) / 2,
  ];
  const radiusX = calculateDistanceBetweenPoints(center, [
    endCoordinates[0],
    (startCoordinates[1] + endCoordinates[1]) / 2,
  ]);
  const radiusY = calculateDistanceBetweenPoints(center, [
    (startCoordinates[0] + endCoordinates[0]) / 2,
    endCoordinates[1],
  ]);
  return new Ellipse(center, radiusX, radiusY, svgParams, countShapecountUp);
};

export const generateCircle = (
  startCoordinates: Coordinates,
  endCoordinates: Coordinates,
  svgParams?: Partial<SVGParamsBase>,
  countShapecountUp?: boolean
) => {
  const center: Coordinates = startCoordinates;
  const radius = calculateDistanceBetweenPoints(
    startCoordinates,
    endCoordinates
  );
  return new Ellipse(center, radius, radius, svgParams, countShapecountUp);
};
