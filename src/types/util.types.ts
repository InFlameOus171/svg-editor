import { Coordinates } from './types';

export type Partition<T> = [T[], T[]];

export type FlattenedElement = {
  element: Element;
  elementOffset: Coordinates;
};
