import { ShapeType } from '../../types/shapes';
import {
  BoundaryCoordinates,
  Coordinates,
  RectangleComponents,
  SVGDrawPath,
  SVGParamsBase,
  VectorCoordinates,
} from '../../types/types';
import { Partition } from '../../types/util.types';
import { Ellipse } from '../Shapes/Ellipse';
import { Line } from '../Shapes/Line';
import {
  getUniqueXandYCoordinatesFromBoundaries,
  relativeCommands,
  singleDirectionCommands,
} from './util';

export const getEdgesFromPoints = (
  startPoint: Coordinates,
  endPoint: Coordinates,
  styleAttributes?: Partial<SVGParamsBase>,
  countShapecountUp?: boolean
): RectangleComponents => {
  const corner1: Coordinates = startPoint;
  const corner2: Coordinates = [endPoint[0], startPoint[1]];
  const corner3: Coordinates = endPoint;
  const corner4: Coordinates = [startPoint[0], endPoint[1]];
  const edge1 = new Line(corner1, corner2, styleAttributes, countShapecountUp);
  const edge2 = new Line(corner2, corner3, styleAttributes, false);
  const edge3 = new Line(corner3, corner4, styleAttributes, false);
  const edge4 = new Line(corner4, corner1, styleAttributes, false);
  return [edge1, edge2, edge3, edge4];
};

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

export const calculateDistanceBetweenPoints = (
  startPoint: Coordinates,
  endPoint: Coordinates
) => {
  const cathete1 = startPoint[0] - endPoint[0];
  const cathete2 = startPoint[1] - endPoint[1];
  const result = cathete1 ** 2 + cathete2 ** 2;
  return Math.sqrt(result);
};

export const generateEllipse = (
  startCoordinates: [number, number],
  endCoordinates: [number, number],
  styleAttributes?: Partial<SVGParamsBase>,
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
  return new Ellipse(
    center,
    radiusX,
    radiusY,
    styleAttributes,
    countShapecountUp
  );
};

export const generateCircle = (
  startCoordinates: [number, number],
  endCoordinates: [number, number],
  styleAttributes?: Partial<SVGParamsBase>,
  countShapecountUp?: boolean
) => {
  const center: Coordinates = startCoordinates;
  const radius = calculateDistanceBetweenPoints(
    startCoordinates,
    endCoordinates
  );
  return new Ellipse(
    center,
    radius,
    radius,
    styleAttributes,
    countShapecountUp
  );
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

const isPointInside = (shape: ShapeType, point: Coordinates) => {
  const boundaries = shape.boundaries;
  let pointIsIside = false;
  if (!boundaries) return false;
  for (let i = 0; i < boundaries.length; i++) {
    const j = (i + 1) % boundaries.length;
    if (
      (boundaries[i][1] < point[1] && boundaries[j][1] >= point[1]) ||
      (boundaries[j][1] < point[1] && boundaries[i][1] >= point[1])
    ) {
      if (
        (point[1] - boundaries[i][1]) * (boundaries[j][0] - boundaries[i][0]) <
        (point[0] - boundaries[i][0]) * (boundaries[j][1] - boundaries[i][1])
      ) {
        pointIsIside = !pointIsIside;
      }
    }
  }

  return pointIsIside;
};

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

export const getRectBoundaries = (
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

export const getLineBoundaries = (
  startingPoint: Coordinates,
  endPoint: Coordinates
): BoundaryCoordinates => {
  const x1 = startingPoint[0];
  const x2 = endPoint[1];
  const y1 = startingPoint[0];
  const y2 = endPoint[1];
  return [
    [x1, y1],
    [x1, y2],
    [x2, y1],
    [x2, y2],
  ];
};

export const relativePathToAbsolutePath = (
  drawPath: SVGDrawPath[],
  offset?: Coordinates
) => {
  let lastAbsolutePoint: Coordinates = [0, 0];
  const drawPathWithAbsolutePoints = drawPath.reduce(
    (acc: SVGDrawPath[], innerDrawPath): SVGDrawPath[] => {
      console.log('acc', acc, 'curr', innerDrawPath);
      if (!Array.isArray(innerDrawPath.points)) {
        return [
          ...acc,
          {
            command: innerDrawPath.command.toUpperCase(),
            points: innerDrawPath.points,
          },
        ];
      }
      if (relativeCommands.includes(innerDrawPath.command)) {
        const newDrawPathPoints = innerDrawPath.points.reduce(
          (allNewPoints: Coordinates[], point: Coordinates, index: number) => {
            if (innerDrawPath.command === 'c') {
              if (index % 3 === 2) {
                lastAbsolutePoint = [
                  lastAbsolutePoint[0] + 1.05 * point[0],
                  lastAbsolutePoint[1] + 1.05 * point[1],
                ];
                return [...allNewPoints, lastAbsolutePoint];
              }
              return allNewPoints;
            }
            if (index === 0) {
              lastAbsolutePoint = [
                lastAbsolutePoint[0] + point[0],
                lastAbsolutePoint[1] + point[1],
              ];
              return [lastAbsolutePoint];
            } else {
              lastAbsolutePoint = [
                lastAbsolutePoint[0] + point[0],
                lastAbsolutePoint[1] + point[1],
              ];
              return [...allNewPoints, lastAbsolutePoint] as Coordinates[];
            }
          },
          []
        );
        return [
          ...acc,
          {
            command: innerDrawPath.command.toUpperCase(),
            points: newDrawPathPoints,
          },
        ];
      } else {
        return [
          ...acc,
          {
            command: innerDrawPath.command,
            points: offset
              ? innerDrawPath.points.map(sumOfCoordinates(offset))
              : innerDrawPath.points,
          },
        ];
      }
    },
    []
  );
  return drawPathWithAbsolutePoints;
};

export const getPointsOfDrawPath = (drawPath: SVGDrawPath[]) => {
  return drawPath.reduce(
    (acc: Array<Coordinates>, currentDrawPath: SVGDrawPath) => {
      if (!currentDrawPath.points) {
        return acc;
      }
      if (Array.isArray(currentDrawPath.points)) {
        if(singleDirectionCommands.includes(currentDrawPath.command)){
          switch(currentDrawPath.command) {
            case "H":
            case "h": {
              return  [...acc, [0,parseFloat(currentDrawPath.points[0] as unknown as string)]] as Coordinates[];
            }
            case "V":
            case "v": {
              return [...acc, [parseFloat(currentDrawPath.points[0] as unknown as string),0]] as Coordinates[];
            }
          }
        }
      }
      return [...acc, currentDrawPath.points as Coordinates];
    },
    []
  );
};

export const splitCoordinate = (acc: [number[], number[]], point:string | Coordinates) => {
  return [
    [...acc[0], point[0]],
    [...acc[1], point[1]],
  ] as [number[], number[]];
}

export const splitAllCoordinates = (coordinates: string|Coordinates[])

export const getPathBoundaries = (
  drawPath: SVGDrawPath[]
): BoundaryCoordinates => {
  const absoluteDrawPath = relativePathToAbsolutePath(drawPath);
  console.log('absoluteDrawPath', absoluteDrawPath);
  const absolutePointsOfDrawPath = getPointsOfDrawPath(absoluteDrawPath);
  console.log('absolutePointsOfDrawPath', absolutePointsOfDrawPath);
  const [xCoords, yCoords] = absolutePointsOfDrawPath.reduce(splitCoordinate, [[], []]);
  console.log(xCoords);
  console.log(yCoords);
  const xMin = Math.min(...xCoords);
  const yMin = Math.min(...yCoords);
  const xMax = Math.max(...xCoords);
  const yMax = Math.max(...yCoords);

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
    new Set(
      boundaries.reduce(
        (acc: [number[], number[]], curr: Coordinates) => {
          return [
            [...acc[0], curr[0]],
            [...acc[1], curr[1]],
          ];
        },
        [[], []]
      )
    )
  ).sort((a, b) => a - b);
  const startingPoint = [
    valuesOfBoundaryCoordinates[0],
    valuesOfBoundaryCoordinates[1],
  ];
  const width = valuesOfBoundaryCoordinates[0];
};
