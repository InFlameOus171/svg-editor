import {
  BoundaryCoordinates,
  Coordinates,
  SVGDrawPath,
  SVGParamsBase,
} from '../../types/types';
import { getPathBoundaries, sumOfCoordinates } from '../helper/coordinates';
import { singleDirectionCommands } from '../helper/util';
import { Shape } from './Shape';

export class Path extends Shape {
  drawPath: SVGDrawPath[];
  #center: Coordinates = [-1, -1];

  constructor(
    drawPath: SVGDrawPath[],
    svgParams?: Partial<SVGParamsBase>,
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
    if (svgParams?.bBox) {
      const { x, y, width, height } = svgParams.bBox;
      const boundaries = [
        [x, y],
        [x, y + height],
        [x + width, y],
        [x + width, y + height],
      ];
      this.boundaries = boundaries.map(boundary => {
        const point = new DOMPoint(boundary[0], boundary[1]);
        const transformedPoint = point.matrixTransform(this.transformMatrix);
        return [transformedPoint.x, transformedPoint.y];
      }) as BoundaryCoordinates;
    } else {
      this.boundaries = getPathBoundaries(this.drawPath);
    }
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
    ...this.getSvgParams(),
  });

  moveTo = (coordinates: Coordinates) => {
    // const pathCommands = getPathCommands(this.toString());
    const [dx, dy] = [
      coordinates[0] - this.#center[0],
      coordinates[1] - this.#center[1],
    ];
    this.moveTransformMatrix(dx, dy);
    // const newPathCommands = pathCommands.map(pathCommand => {
    //   if (
    //     ['M', 'm', ...absoluteCoordinatesCommands].includes(pathCommand.command)
    //   ) {
    //     return {
    //       command: pathCommand.command,
    //       points: (pathCommand.points as Array<Coordinates>).map(
    //         (point: Coordinates): Coordinates =>
    //           sumOfCoordinates(point)([dx, dy])
    //       ),
    //     };
    //   }
    //   return pathCommand;
    // });
    // const newPath = new Path(
    //   newPathCommands,
    //   {
    //     fill: this.getFill(),
    //     stroke: this.getStroke(),
    //     strokeWidth: this.getStrokeWidth(),
    //   },
    //   false
    // );
    this.#center = [this.#center[0] + dx, this.#center[1] + dy];
    this.boundaries = this.boundaries.map(boundary => [
      boundary[0] + dx,
      boundary[1] + dy,
    ]) as BoundaryCoordinates;
    // this.drawPath = newPath.drawPath;
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
