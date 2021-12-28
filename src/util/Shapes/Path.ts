import { Coordinates, SVGDrawPath, SVGParamsBase } from '../../types/types';
import { getPathBoundaries, sumOfCoordinates } from '../helper/coordinates';
import { getPathCommands } from '../helper/shapes';
import {
  absoluteCoordinatesCommands,
  singleDirectionCommands,
} from '../helper/util';
import { Shape } from './Shape';

export class Path extends Shape {
  drawPath: SVGDrawPath[];
  #center: Coordinates = [-1, -1];

  constructor(
    drawPath: SVGDrawPath[],
    svgParams?: SVGParamsBase,
    dontCountUp?: boolean
  ) {
    super(undefined, svgParams, dontCountUp);
    this.drawPath = drawPath.map(path => {
      if (singleDirectionCommands.includes(path.command)) {
        return { command: path.command, points: path.points };
      }
      return {
        command: path.command,
        points: path.points,
      };
    });
    this.boundaries = getPathBoundaries(
      this.drawPath,
      svgParams?.transformMatrix
    );
    const sumOfBoundaries = this.boundaries.reduce(
      (acc, curr) => sumOfCoordinates(acc)(curr),
      [0, 0]
    );
    this.#center = [sumOfBoundaries[0] / 4, sumOfBoundaries[1] / 4];
  }

  getCenter: () => Coordinates = () => {
    return this.#center;
  };

  toSVGPathParams = () => ({
    d: this.toString(),
    ...this.styles,
  });

  moveTo = (coordinates: Coordinates) => {
    const pathCommands = getPathCommands(this.toString());
    const [dx, dy] = [
      coordinates[0] - this.#center[0],
      coordinates[1] - this.#center[1],
    ];
    const transformMatrix = this.styles?.transformMatrix;
    const { a = 1, b = 0, c = 0, d = 1, e = 0, f = 0 } = transformMatrix || {};
    const newPathCommands = pathCommands.map(pathCommand => {
      if (['m', ...absoluteCoordinatesCommands].includes(pathCommand.command)) {
        return {
          command: pathCommand.command,
          points: (pathCommand.points as Array<Coordinates>).map(
            (point: Coordinates): Coordinates =>
              sumOfCoordinates(point)([dx, dy])
          ),
        };
      }
      return pathCommand;
    });
    const newPath = new Path(newPathCommands, this.styles, false);
    this.#center = newPath.getCenter();
    this.boundaries = newPath.boundaries;
    this.drawPath = newPath.drawPath;
    // moveCommands.forEach(moveCommand => {
    //   if (moveCommand) {
    //     const changedCommands = [
    //       {
    //         command: moveCommand.command,
    //         points: (moveCommand.points as Array<Coordinates>).map(
    //           (point: Coordinates): Coordinates =>
    //             sumOfCoordinates(point)([dx, dy])
    //         ),
    //       },
    //       ...pathCommands,
    //     ];

    //   }
    // });
  };

  toString = (): string => {
    const result = this.drawPath.reduce(
      (acc: string, pathValue: SVGDrawPath) => {
        return acc
          .concat(
            ' ',
            pathValue.command,
            ' ',
            Array.isArray(pathValue.points)
              ? pathValue.points.reduce(
                  (acc: string, point: Coordinates) =>
                    acc.concat(
                      [point[0].toString(), point[1].toString()].join(),
                      ' '
                    ),
                  ''
                )
              : pathValue.points ?? '',
            ' '
          )
          .trim();
      },
      ''
    );
    return result;
  };
}
