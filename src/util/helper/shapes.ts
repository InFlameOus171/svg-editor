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
  SVGParamsBase,
} from '../../types/types';
import { Ellipse } from '../Shapes/Ellipse';
import { Freehand } from '../Shapes/Freehand';
import { Line } from '../Shapes/Line';
import { Path } from '../Shapes/Path';
import { Rectangle } from '../Shapes/Rectangle';
import { pathCommandsRegExp } from '../constants/regularExpressions';
import { typeOfShape } from './typeguards';
import { pathCommandValues, singleDirectionCommands } from './util';
import { SupportedStyles } from '../../types/globalStyles.types';

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
  svgShape: SVGGraphicsElement,
  { transformMatrix, ...rest }: SVGParamsBase
) => {
  const { styles } = (rest as { styles: SupportedStyles }) || {};
  console.log(transformMatrix, transformMatrix?.toString());
  const { a, b, c, d, e, f } = transformMatrix || {};
  Object.entries(styles)
    .filter(([key, value]) => !!value)
    .forEach(([key, value]) => {
      console.log(key, value);
      svgShape.setAttribute(key, value);
      transformMatrix &&
        svgShape.setAttribute(
          'transform',
          `matrix(${a},${b},${c},${d},${e},${f})`
        );
    });
};

export const setRectSVGParams = (
  svgShape: SVGGraphicsElement,
  rectParams: RectSVGParams
) => {
  const { x, y, width, height, ...rest } = rectParams;
  svgShape.setAttribute('x', x);
  svgShape.setAttribute('y', y);
  svgShape.setAttribute('width', width);
  svgShape.setAttribute('height', height);
  setSVGStyleParams(svgShape, rest);
};

export const setEllipseSVGParams = (
  svgShape: SVGGraphicsElement,
  ellipseParams: EllipseSVGParams
) => {
  const { cx, cy, rx, ry, ...rest } = ellipseParams;
  svgShape.setAttribute('cx', cx);
  svgShape.setAttribute('cy', cy);
  svgShape.setAttribute('rx', rx);
  svgShape.setAttribute('ry', ry);
  setSVGStyleParams(svgShape, rest);
};

export const setCircleSVGParams = (
  svgShape: SVGGraphicsElement,
  circleParams: EllipseSVGParams
) => {
  const { cx, cy, rx, ...rest } = circleParams;
  svgShape.setAttribute('cx', cx);
  svgShape.setAttribute('cy', cy);
  svgShape.setAttribute('r', rx);
  setSVGStyleParams(svgShape, rest);
};

export const setLineSVGParams = (
  svgShape: SVGGraphicsElement,
  lineParams: LineSVGParams
) => {
  const { x1, y1, x2, y2, ...rest } = lineParams;
  svgShape.setAttribute('x1', x1);
  svgShape.setAttribute('y1', y1);
  svgShape.setAttribute('x2', x2);
  svgShape.setAttribute('y2', y2);
  setSVGStyleParams(svgShape, rest);
};

export const setFreehandSVGParams = (
  svgShape: SVGGraphicsElement,
  freehandParams: FreehandSVGParams
) => {
  const { points, ...rest } = freehandParams;
  svgShape.setAttribute('points', points);
  setSVGStyleParams(svgShape, rest);
};

export const setPathSVGParams = (
  svgShape: SVGGraphicsElement,
  pathParams: PathSVGParams
) => {
  const { d, ...rest } = pathParams;
  svgShape.setAttribute('d', d);
  setSVGStyleParams(svgShape, rest);
};

export const appendAsSVGShapeGeneratorFunction =
  (parent?: Element, svgNameSpace: string | null = null) =>
  (shape: ShapeType) => {
    switch (typeOfShape(shape)) {
      case 'Rectangle': {
        const rectangleObject = shape as Rectangle;
        const rect = document.createElementNS(
          svgNameSpace,
          'rect'
        ) as SVGGraphicsElement;
        setRectSVGParams(rect, rectangleObject.toSvgRectParams());
        parent?.appendChild(rect);
        break;
      }
      case 'Ellipse': {
        const ellipseObject = shape as Ellipse;
        const isCircle = ellipseObject.radiusX === ellipseObject.radiusY;
        if (isCircle) {
          const circle = document.createElementNS(
            svgNameSpace,
            'circle'
          ) as SVGGraphicsElement;
          setCircleSVGParams(circle, ellipseObject.toSVGEllipseParams());
          parent?.appendChild(circle);
        } else {
          const ellipse = document.createElementNS(
            svgNameSpace,
            'ellipse'
          ) as SVGGraphicsElement;
          setEllipseSVGParams(ellipse, ellipseObject.toSVGEllipseParams());
          parent?.appendChild(ellipse);
        }
        break;
      }
      case 'Line': {
        const lineObject = shape as Line;
        const line = document.createElementNS(
          svgNameSpace,
          'line'
        ) as SVGGraphicsElement;
        setLineSVGParams(line, lineObject.toSVGLineParams());
        parent?.appendChild(line);
        break;
      }
      case 'Freehand': {
        const freehandObject = shape as Freehand;
        const freehand = document.createElementNS(
          svgNameSpace,
          'polyline'
        ) as SVGGraphicsElement;
        setFreehandSVGParams(freehand, freehandObject.toSVGFreehandParams());
        parent?.appendChild(freehand);
        break;
      }
      case 'Path': {
        const pathObject = shape as Path;
        const path = document.createElementNS(
          svgNameSpace,
          'path'
        ) as SVGGraphicsElement;
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
    } else return acc;
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
