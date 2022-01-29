import type { ShapeType } from '../../types/typeGuards.types';
import type {
  BoundaryCoordinates,
  Coordinates,
  Partition,
} from '../../types/types';

export const getCanvasRectangleValuesFromPoints = (
  startPoint: Coordinates,
  endPoint: Coordinates
): { startingCorner: Coordinates; width: number; height: number } => {
  const width = endPoint[0] - startPoint[0];
  const height = endPoint[1] - startPoint[1];

  return {
    startingCorner: startPoint,
    width,
    height,
  };
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
  (point: Coordinates) => (shape: ShapeType) =>
    isShapeInsideAnotherShape(shape)({
      boundaries: [point, point, point, point],
    } as ShapeType);

export const isShapeInsideAnotherShape =
  (potentiallyBiggerShape?: ShapeType) =>
  (potentiallySmallerShape: ShapeType) => {
    if (!potentiallyBiggerShape) {
      return false;
    }
    const { boundaries: potentiallyBiggerCoordinates } = potentiallyBiggerShape;
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
      return potentiallySmallerShape.boundaries?.every(
        isBetweenTwoCoordinates(minCoordinates, maxCoordinates)
      );
    }
  };

export const getTextBoundaries = (
  position: Coordinates,
  width: number,
  height: number
): BoundaryCoordinates => {
  const x = parseInt(position[0].toString());
  const y = parseInt(position[0].toString());
  const pos1: Coordinates = [x, position[1] + height / 4];
  const pos2: Coordinates = [x, position[1] - height];
  const pos3: Coordinates = [position[0] + width, position[1]];
  const pos4: Coordinates = [position[0] + width, position[1] - height];
  console.debug(pos1, pos2, pos3, pos4);
  return [pos1, pos2, pos3, pos4];
};

export const splitCoordinates = (
  acc: [number[], number[]],
  point: string | Coordinates
) => {
  return [
    [...acc[0], point[0]],
    [...acc[1], point[1]],
  ] as [number[], number[]];
};

export const splitAllCoordinates = (
  coordinates: Array<string | Coordinates>
) => {
  return coordinates.reduce(splitCoordinates, [[], []]);
};

export const getMinMaxValuesOfSplitCoordinates = (
  xCoordinates: number[],
  yCoordinates: number[]
) => {
  const xMin = Math.min(...xCoordinates);
  const yMin = Math.min(...yCoordinates);
  const xMax = Math.max(...xCoordinates);
  const yMax = Math.max(...yCoordinates);
  return { xMin, yMin, xMax, yMax };
};

export const getMinMaxValuesOfCoordinates = (coordinates: Coordinates[]) => {
  const [xCoords, yCoords] = splitAllCoordinates(coordinates);
  return getMinMaxValuesOfSplitCoordinates(xCoords, yCoords);
};

export const getBoundaryFromCoordinates = (
  coordinates: Coordinates[]
): BoundaryCoordinates => {
  const { xMin, xMax, yMin, yMax } = getMinMaxValuesOfCoordinates(coordinates);
  return [
    [xMin, yMin],
    [xMax, yMin],
    [xMin, yMax],
    [xMax, yMax],
  ];
};

export const sumOfCoordinates =
  (coordinates1: Coordinates) =>
  (coordinates2: Coordinates): Coordinates => {
    return [
      coordinates1[0] + coordinates2[0],
      coordinates1[1] + coordinates2[1],
    ];
  };

export const rectangleParamsFromBoundaries = (
  boundaries: BoundaryCoordinates
) => {
  const [xCoordinates, yCoordinates] = Array.from(
    new Set(splitAllCoordinates(boundaries))
  );
  const { xMin, yMin, xMax, yMax } = getMinMaxValuesOfSplitCoordinates(
    xCoordinates,
    yCoordinates
  );
  const startingCorner: Coordinates = [xMin, yMin];
  const width: number = xMax - xMin;
  const height: number = yMax - yMin;
  return { startingCorner, width, height };
};
