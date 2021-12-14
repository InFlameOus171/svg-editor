import { Coordinates, SVGDrawPath } from '../../types/types';
import { Shape } from './Shape';

export class Path extends Shape {
  drawPath: SVGDrawPath[];
  offset: Coordinates;

  constructor(
    drawPath: SVGDrawPath[],
    dontCountUp?: boolean,
    offset: Coordinates = [0, 0]
  ) {
    super(dontCountUp);
    // this.drawPath = drawPath;
    this.drawPath = drawPath.map(path => {
      return {
        command: path.command,
        points: path.points.map(point => {
          return [point[0] + offset[0], point[1] + offset[1]];
        }),
      };
    });
    this.offset = offset;
    console.log(drawPath);
  }

  toPathDString = () => {
    return this.drawPath
      .reduce((acc: string, pathValue: SVGDrawPath) => {
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
      }, '')
      .concat(' ', 'Z');
  };
}
