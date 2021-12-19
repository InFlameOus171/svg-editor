import { ShapeType } from '../../types/shapes';
import {
  BoundaryCoordinates,
  CircleSVGParams,
  Coordinates,
  EllipseSVGParams,
  FreehandSVGParams,
  LineSVGParams,
  PathSVGParams,
  RectSVGParams,
  SVGDrawPath,
} from '../../types/types';
import { Ellipse } from '../Shapes/Ellipse';
import { Freehand } from '../Shapes/Freehand';
import { Line } from '../Shapes/Line';
import { Path } from '../Shapes/Path';
import { Rectangle } from '../Shapes/Rectangle';
import { typeOfShape } from './typeguards';
import {
  pathCommandsRegExp,
  pathCommandValues,
  singleDirectionCommands,
} from './util';

export const createRect = (
  x: number,
  y: number,
  height: number,
  width: number
) => {
  const path = new Path2D();
  path.rect(x, y, height, width);
  return path;
};

export const setSVGStyleParams = (
  svgShape: Element,
  fill?: string,
  stroke?: string,
  strokeWidth?: string
) => {
  stroke && svgShape.setAttribute('stroke', stroke);
  strokeWidth && svgShape.setAttribute('stroke-width', strokeWidth);
  fill && svgShape.setAttribute('fill', fill);
};

export const setRectSVGParams = (
  svgShape: Element,
  rectParams: RectSVGParams
) => {
  const { x, y, width, height, fill, stroke, strokeWidth } = rectParams;
  svgShape.setAttribute('x', x);
  svgShape.setAttribute('y', y);
  svgShape.setAttribute('width', width);
  svgShape.setAttribute('height', height);
  setSVGStyleParams(svgShape, fill, stroke, strokeWidth);
};

export const setEllipseSVGParams = (
  svgShape: Element,
  ellipseParams: EllipseSVGParams
) => {
  const { cx, cy, rx, ry, fill, stroke, strokeWidth } = ellipseParams;
  svgShape.setAttribute('cx', cx);
  svgShape.setAttribute('cy', cy);
  svgShape.setAttribute('rx', rx);
  svgShape.setAttribute('ry', ry);
  setSVGStyleParams(svgShape, fill, stroke, strokeWidth);
};

export const setCircleSVGParams = (
  svgShape: Element,
  circleParams: EllipseSVGParams
) => {
  const { cx, cy, rx, fill, stroke, strokeWidth } = circleParams;
  svgShape.setAttribute('cx', cx);
  svgShape.setAttribute('cy', cy);
  svgShape.setAttribute('r', rx);
  setSVGStyleParams(svgShape, fill, stroke, strokeWidth);
};

export const setLineSVGParams = (
  svgShape: Element,
  lineParams: LineSVGParams
) => {
  const { x1, y1, x2, y2, fill, stroke, strokeWidth } = lineParams;
  svgShape.setAttribute('x1', x1);
  svgShape.setAttribute('y1', y1);
  svgShape.setAttribute('x2', x2);
  svgShape.setAttribute('y2', y2);
  setSVGStyleParams(svgShape, fill, stroke, strokeWidth);
};

export const setFreehandSVGParams = (
  svgShape: Element,
  freehandParams: FreehandSVGParams
) => {
  const { points, fill, stroke, strokeWidth } = freehandParams;
  svgShape.setAttribute('points', points);
  setSVGStyleParams(svgShape, fill, stroke, strokeWidth);
};

export const setPathSVGParams = (
  svgShape: Element,
  pathParams: PathSVGParams
) => {
  const { d, fill, stroke, strokeWidth } = pathParams;
  svgShape.setAttribute('d', d);
  setSVGStyleParams(svgShape, fill, stroke, strokeWidth);
};

export const appendAsSVGShapeGeneratorFunction =
  (parent?: Element, svgNameSpace: string | null = null) =>
  (shape: ShapeType) => {
    switch (typeOfShape(shape)) {
      case 'Rectangle': {
        const rectangleObject = shape as Rectangle;
        const rect = document.createElementNS(svgNameSpace, 'rect');
        setRectSVGParams(rect, rectangleObject.toSvgRectParams());
        parent?.appendChild(rect);
        break;
      }
      case 'Ellipse': {
        const ellipseObject = shape as Ellipse;
        const isCircle = ellipseObject.radiusX === ellipseObject.radiusY;
        if (isCircle) {
          const circle = document.createElementNS(svgNameSpace, 'circle');
          setCircleSVGParams(circle, ellipseObject.toSVGEllipseParams());
          parent?.appendChild(circle);
        } else {
          const ellipse = document.createElementNS(svgNameSpace, 'ellipse');
          setEllipseSVGParams(ellipse, ellipseObject.toSVGEllipseParams());
          parent?.appendChild(ellipse);
        }
        break;
      }
      case 'Line': {
        const lineObject = shape as Line;
        const line = document.createElementNS(svgNameSpace, 'line');
        setLineSVGParams(line, lineObject.toSVGLineParams());
        parent?.appendChild(line);
        break;
      }
      case 'Freehand': {
        const freehandObject = shape as Freehand;
        const freehand = document.createElementNS(svgNameSpace, 'polyline');
        setFreehandSVGParams(freehand, freehandObject.toSVGFreehandParams());
        parent?.appendChild(freehand);
        break;
      }
      case 'Path': {
        const pathObject = shape as Path;
        const path = document.createElementNS(svgNameSpace, 'path');
        setPathSVGParams(path, pathObject.toSVGPathParams());
        parent?.append(path);
        break;
      }
    }
  };

export const getPathCommands = (d: string) => {
  const matches = Array.from(d.matchAll(pathCommandsRegExp)).map(
    match => match[0]
  );
  const indices = matches.reduce((acc: number[], match, index) => {
    if (pathCommandValues.includes(match)) {
      return [...acc, index];
    } else {
      if (index === matches.length - 1) {
        return [...acc, index];
      }
      return acc;
    }
  }, []);
  const segments = indices.reduce(
    (acc: string[][], commandIndex, currentIndex) => {
      if (currentIndex === indices.length - 1) {
        return [...acc, matches.slice(commandIndex)];
      }
      return [...acc, matches.slice(commandIndex, indices[currentIndex + 1])];
    },
    []
  );
  return segments.map(convertMatchesToSVGDrawPath);
};

export const convertMatchesToSVGDrawPath = (
  match: RegExpMatchArray
): SVGDrawPath => {
  console.log(match);
  const command = match[0].trim();
  const matchedCoordinates = match.slice(1);
  if (singleDirectionCommands.includes(command)) {
    return { command, points: matchedCoordinates.shift() };
  }
  const points = matchedCoordinates.reduce(
    (acc: Coordinates[], point, index) => {
      if (index % 2 === 0) {
        return acc;
      }
      const coordinates: Coordinates = [
        parseFloat(matchedCoordinates[index - 1]),
        parseFloat(point),
      ];
      return [...acc, coordinates];
    },
    []
  );
  return { command, points };
};
