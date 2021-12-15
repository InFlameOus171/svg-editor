import { Coordinates, SVGDrawPath } from '../../types/types';
import {
  getPathBoundaries,
  relativePathToAbsolutePath,
} from '../helper/coordinates';
import { Shape } from './Shape';

export class Path extends Shape {
  drawPath: SVGDrawPath[];
  offset: Coordinates;
  #center: Coordinates = [-1, -1];
  constructor(
    drawPath: SVGDrawPath[],
    dontCountUp?: boolean,
    offset: Coordinates = [0, 0]
  ) {
    super(undefined, dontCountUp);

    this.drawPath = drawPath.map(path => {
      return {
        command: path.command,
        points: path.points.map(point => [
          point[0] + offset[0],
          point[1] + offset[1],
        ]),
      };
    });
    this.boundaries = getPathBoundaries(this.drawPath);
    this.offset = offset;
  }

  getCenter: () => Coordinates = () => {
    return this.#center;
  };

  toSVGPathParams = () => ({
    d: this.toString(),
    fill: this.getFill(),
    stroke: this.getStroke(),
    strokeWidth: this.getStrokeWidth(),
  });

  moveTo = (coordinates: Coordinates) => {
    const xDifference = coordinates[0] - this.#center[0];
    const yDifference = coordinates[1] - this.#center[1];
    this.drawPath = this.drawPath.map(path => {
      return {
        command: path.command,
        points: path.points.map(point => [
          point[0] + xDifference,
          point[1] + yDifference,
        ]),
      };
    });
    this.#center = coordinates;
    this.drawPath = [
      {
        command: this.drawPath[0].command,
        points: this.drawPath[0].points.map(point => [
          point[0] + xDifference,
          point[1] + yDifference,
        ]),
      },
      ...this.drawPath.slice(1),
    ];
    this.moveBoundaries([xDifference, yDifference]);
  };

  toString = (): string => {
    return this.drawPath.reduce((acc: string, pathValue: SVGDrawPath) => {
      return acc
        .concat(
          ' ',
          pathValue.command,
          ' ',
          pathValue.points.reduce(
            (acc: string, point: Coordinates) =>
              acc.concat(
                [point[0].toString(), point[1].toString()].join(),
                ' '
              ),
            ''
          ),
          ' '
        )
        .trim();
    }, '');
  };
}
