import type {
  BoundaryCoordinates,
  Coordinates,
  SVGDrawPath,
  SVGParamsBase,
} from '../../../types/types';
import { sumOfCoordinates } from '../../helper/coordinates';
import { singleDirectionCommands } from '../../helper/util';
import { getPathBoundaries } from './Path.util';
import { Shape } from '../Shape';

export class Path extends Shape {
  drawPath: SVGDrawPath[];
  #rawDrawPath: SVGDrawPath[];

  constructor(
    drawPath: SVGDrawPath[],
    svgParams?: Partial<SVGParamsBase>,
    countShapeCountUp?: boolean,
    isLocked: boolean = false
  ) {
    super(undefined, svgParams, countShapeCountUp, isLocked);
    this.#rawDrawPath = drawPath;
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
    this.calculationCenter = [sumOfBoundaries[0] / 4, sumOfBoundaries[1] / 4];
  }

  getCenter: () => Coordinates = () => {
    return this.calculationCenter;
  };

  toSVGPathParams = () => ({
    d: this.toString(),
    ...this.getSvgParams(),
  });

  getDeconstructedShapeData = () => ({
    id: this.getId(),
    type: 'Path',
    drawPath: this.#rawDrawPath,
    isLocked: this.isLocked,
    svgParams: this.getSvgParams(),
  });

  moveTo = (coordinates: Coordinates) => {
    const [dx, dy] = [
      coordinates[0] - this.calculationCenter[0],
      coordinates[1] - this.calculationCenter[1],
    ];
    this.moveTransformMatrix(dx, dy);
    this.calculationCenter = [
      this.calculationCenter[0] + dx,
      this.calculationCenter[1] + dy,
    ];
    this.boundaries = this.boundaries.map(boundary => [
      boundary[0] + dx,
      boundary[1] + dy,
    ]) as BoundaryCoordinates;
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
