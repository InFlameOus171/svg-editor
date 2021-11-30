import { Shape } from '../../types/shapes';
import {
  Coordinates,
  RectangleComponents,
  VectorCoordinates,
} from '../../types/types';
import { Partition } from '../../types/util.types';
import { Ellipsis } from '../Shapes/Ellipsis';
import { Line } from '../Shapes/Line';

export const getEdgesFromPoints = (
  startPoint: Coordinates,
  endPoint: Coordinates,
  dontCountUp?: boolean
): RectangleComponents => {
  const corner1: Coordinates = startPoint;
  const corner2: Coordinates = [endPoint[0], startPoint[1]];
  const corner3: Coordinates = endPoint;
  const corner4: Coordinates = [startPoint[0], endPoint[1]];
  const edge1 = new Line(corner1, corner2, dontCountUp);
  const edge2 = new Line(corner2, corner3, true);
  const edge3 = new Line(corner3, corner4, true);
  const edge4 = new Line(corner4, corner1, true);
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
  endCoordinates: [number, number],
  dontCountUp?: boolean
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
  return new Ellipsis(center, radiusX, radiusY, dontCountUp);
};

export const generateCircle = (
  startCoordinates: [number, number],
  endCoordinates: [number, number],
  dontCountUp?: boolean
) => {
  const center: Coordinates = startCoordinates;
  const radius = calculateDistanceBetweenPoints(
    startCoordinates,
    endCoordinates
  );
  return new Ellipsis(center, radius, radius, dontCountUp);
};

export const calculateVectorFromCoordinates = (
  vectorCoordinates: VectorCoordinates
): Coordinates => {
  const [point1, point2] = vectorCoordinates;
  return [point1[0] - point2[0], point1[1] - point2[1]];
};

export const sumOfVectors = (vectorCoordinates: VectorCoordinates[]) => {
  const vectors = vectorCoordinates.map(calculateVectorFromCoordinates);
  return vectors.reduce(
    (newVector, currentVector) => {
      return [newVector[0] + currentVector[0], newVector[1] + currentVector[1]];
    },
    [0, 0] as Coordinates
  );
};

export const partitionCoordinates = (coordinates: Coordinates[]) => {
  return coordinates.reduce(
    (acc: Partition<number>, coordinate): Partition<number> => [
      [...acc[0], coordinate[0]],
      [...acc[1], coordinate[1]],
    ],
    [[], []]
  );
};

const betweenHelper = (coordinateToCheck: Coordinates) => {
  return (smallerCoordinate: Coordinates, biggerCoordinate: Coordinates) => {
    return (
      coordinateToCheck[0] >= smallerCoordinate[0] &&
      coordinateToCheck[1] >= smallerCoordinate[1] &&
      coordinateToCheck[0] <= biggerCoordinate[0] &&
      coordinateToCheck[1] <= biggerCoordinate[1]
    );
  };
};

const isBetweenTwoCoordinates =
  (firstCoord: Coordinates, secondCoord: Coordinates) =>
  (coordinateToCheck: Coordinates) => {
    const isCoordinateBetween = betweenHelper(coordinateToCheck);
    if (firstCoord[0] <= secondCoord[0] && firstCoord[1] <= secondCoord[1]) {
      return isCoordinateBetween(firstCoord, secondCoord);
    } else {
      isCoordinateBetween(firstCoord, firstCoord);
    }
  };

export const isPointInsideAnotherShape =
  (point: Coordinates) => (shape: Shape) =>
    isShapeInsideAnotherShape(shape)({
      boundary: [point, point, point, point],
    } as Shape);

export const isShapeInsideAnotherShape =
  (potentiallyBiggerShape?: Shape) => (potentiallySmallerShape: Shape) => {
    console.log(potentiallyBiggerShape, potentiallySmallerShape);
    if (!potentiallyBiggerShape) {
      return false;
    }
    const { boundary: potentiallyBiggerCoordinates } = potentiallyBiggerShape;
    if (potentiallyBiggerCoordinates) {
      const [bigX, bigY] = partitionCoordinates(potentiallyBiggerCoordinates);
      const minCoordinates: Coordinates = [
        Math.min(...bigX),
        Math.min(...bigY),
      ];
      const maxCoordinates: Coordinates = [
        Math.max(...bigX),
        Math.max(...bigY),
      ];
      return potentiallySmallerShape.boundary?.every(
        isBetweenTwoCoordinates(minCoordinates, maxCoordinates)
      );
    }
  };
