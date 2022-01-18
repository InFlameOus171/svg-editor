import {
  SVGDrawPath,
  Coordinates,
  BoundaryCoordinates,
} from '../../../types/types';
import {
  sumOfCoordinates,
  getBoundaryFromCoordinates,
} from '../../helper/coordinates';
import { relativeCommands, singleDirectionCommands } from '../../helper/util';

export const getPointsOfDrawPath = (drawPath: SVGDrawPath[]) => {
  return drawPath.reduce(
    (acc: Array<Coordinates>, currentDrawPath: SVGDrawPath) => {
      if (!currentDrawPath.points) {
        return acc;
      }
      if (Array.isArray(currentDrawPath.points)) {
        if (singleDirectionCommands.includes(currentDrawPath.command)) {
          switch (currentDrawPath.command) {
            case 'H':
            case 'h': {
              return [
                ...acc,
                [0, parseFloat(currentDrawPath.points[0] as unknown as string)],
              ] as Coordinates[];
            }
            case 'V':
            case 'v': {
              return [
                ...acc,
                [parseFloat(currentDrawPath.points[0] as unknown as string), 0],
              ] as Coordinates[];
            }
          }
        }
      }
      return [...acc, ...(currentDrawPath.points as Coordinates[])];
    },
    []
  );
};

export const relativePathToAbsolutePath = (
  drawPath: SVGDrawPath[],
  offset?: Coordinates
) => {
  let lastAbsolutePoint: Coordinates = [0, 0];
  const drawPathWithAbsolutePoints = drawPath.reduce(
    (acc: SVGDrawPath[], innerDrawPath): SVGDrawPath[] => {
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

export const getPathBoundaries = (
  drawPath: SVGDrawPath[]
): BoundaryCoordinates => {
  const absoluteDrawPath = relativePathToAbsolutePath(drawPath);
  const absolutePointsOfDrawPath = getPointsOfDrawPath(absoluteDrawPath);
  return getBoundaryFromCoordinates(absolutePointsOfDrawPath);
};
