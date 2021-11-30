import {
  BoundaryCoordinates,
  Coordinates,
  RectangleComponents,
} from '../../types/types';
import { partition } from '../helper/util';
import { Line } from './Line';
import { Shape } from './Shape';

export class Rectangle extends Shape {
  edges: RectangleComponents;
  #x: number = 0;
  #y: number = 0;
  #width: number = 0;
  #height: number = 0;

  constructor(edges: RectangleComponents, dontCountUp?: boolean) {
    super(dontCountUp);
    this.edges = edges;
    this.setValues(edges.map(edge => edge.points).flat());
  }

  setValues = (points: Coordinates[]) => {
    const uniquePoints = [...new Set(points)];
    this.boundary = uniquePoints as BoundaryCoordinates;
    const sumOfCoordinates = uniquePoints.reduce((acc, currPoint) => [
      acc[0] + currPoint[0],
      acc[1] + currPoint[1],
    ]);
    this.setXY([sumOfCoordinates[0] / 4, sumOfCoordinates[1] / 4]);
    const [biggestX, biggestY] = uniquePoints.reduce((acc, curr) => [
      acc[0] > curr[0] ? acc[0] : curr[0],
      acc[1] > curr[1] ? acc[1] : curr[1],
    ]);
    this.#width = (biggestX - this.#x) * 2;
    this.#height = (biggestY - this.#y) * 2;
  };

  setXY = (center: Coordinates) => {
    [this.#x, this.#y] = center;
  };

  getCenter = (): Coordinates => {
    return [...[this.#x, this.#y]] as Coordinates;
  };

  moveTo = (coordinates: Coordinates) => {
    const xDifference = coordinates[0] - this.#x;
    const yDifference = coordinates[1] - this.#y;
    [this.#x, this.#y] = coordinates;
    this.edges = this.edges.map(
      (edge): Line =>
        new Line(
          [edge.points[0][0] + xDifference, edge.points[0][1] + yDifference],
          [edge.points[1][0] + xDifference, edge.points[1][1] + yDifference],
          true
        )
    ) as RectangleComponents;
  };

  toString = () => {
    return JSON.stringify(this.boundary);
  };
}
