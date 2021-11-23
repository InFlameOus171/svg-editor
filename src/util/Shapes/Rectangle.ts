import { BoundaryCoordinates, RectangleComponents } from '../../types/types';
import { Shape } from './Shape';

export class Rectangle extends Shape {
  edges: RectangleComponents;

  constructor(edges: RectangleComponents, dontCountUp?: boolean) {
    super(dontCountUp);
    this.edges = edges;
    const points = edges.map(edge => edge.points).flat();
    const uniquePoints = [...new Set(points)];
    this.boundary = uniquePoints as BoundaryCoordinates;
  }
}
