import {
  RectangleComponents,
  Coordinates,
  BoundaryCoordinates,
} from '../../types/types';
import { flattenArray } from '../helper/coordinates';
import { Shape } from './Shape';

export class Rectangle extends Shape {
  edges: RectangleComponents;

  constructor(edges: RectangleComponents, dontCountUp?: boolean) {
    super(dontCountUp);
    this.edges = edges;
    const points = flattenArray(edges);
    const uniquePoints = [...new Set(points)];
    this.boundary = uniquePoints as BoundaryCoordinates;
  }
}
