import { BoundaryCoordinates, Coordinates } from '../../types/types';
import { Partition } from '../../types/util.types';

export const partition = <T>(
  array: Array<T>,
  aggregateFunction: (value: T) => boolean,
  applyFunction: (value: T) => T = value => value
): Partition<T> => {
  return array.reduce(
    (acc: Partition<T>, value) => {
      const result = aggregateFunction(value);
      if (result) {
        return [[...acc[0], applyFunction(value)], [...acc[1]]];
      } else {
        return [[...acc[0]], [...acc[1], applyFunction(value)]];
      }
    },
    [[], []]
  );
};

export const getUniqueXandYCoordinatesFromBoundaries = (
  coordinates: BoundaryCoordinates
): [[number, number], [number, number]] => {
  const uniqueCoordinates = [...new Map(coordinates)];

  const splitXandYCoordinates = uniqueCoordinates.reduce(
    (acc: Array<number[]>, innerArray) => {
      return [
        [...acc[0], innerArray[0]],
        [...acc[1], innerArray[1]],
      ];
    },
    [[], []]
  );
  return [
    [...new Set(splitXandYCoordinates[0])],
    [...new Set(splitXandYCoordinates[1])],
  ] as [[number, number], [number, number]];
};
