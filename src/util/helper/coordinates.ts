import { Coordinates, RectangleComponents } from '../../types/types';
import { Circle } from '../Shapes/Circle';
import { Ellipsis } from '../Shapes/Ellipsis';
import { Line } from '../Shapes/Line';

export const getEdgesFromPoints = (
  startPoint: Coordinates,
  endPoint: Coordinates
): RectangleComponents => {
  const corner1: Coordinates = startPoint;
  const corner2: Coordinates = [endPoint[0], startPoint[1]];
  const corner3: Coordinates = endPoint;
  const corner4: Coordinates = [startPoint[0], endPoint[1]];
  const edge1 = new Line(corner1, corner2);
  const edge2 = new Line(corner2, corner3);
  const edge3 = new Line(corner3, corner4);
  const edge4 = new Line(corner4, corner1);
  return [edge1, edge2, edge3, edge4];
};

export const calculateDistanceBetweenPoints = (
  startPoint: Coordinates,
  endPoint: Coordinates
) => {
  const cathete1 = startPoint[0] - endPoint[0];
  const cathete2 = startPoint[1] - endPoint[1];
  const result = cathete1 ** 2 + cathete2 ** 2;
  return Math.sqrt(result);
};

export const generateEllipsis = (
  startCoordinates: [number, number],
  endCoordinates: [number, number]
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
  return new Ellipsis(center, radiusX, radiusY);
};

export const generateCircle = (
  startCoordinates: [number, number],
  endCoordinates: [number, number]
) => {
  const center: Coordinates = startCoordinates;
  const radius = calculateDistanceBetweenPoints(
    startCoordinates,
    endCoordinates
  );
  return new Circle(center, radius);
};
