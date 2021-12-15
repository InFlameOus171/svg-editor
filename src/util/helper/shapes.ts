import { ShapeType } from '../../types/shapes';
import {
  BoundaryCoordinates,
  CircleSVGParams,
  Coordinates,
  EllipseSVGParams,
  FreehandSVGParams,
  LineSVGParams,
  RectSVGParams,
} from '../../types/types';
import { Ellipse } from '../Shapes/Ellipse';
import { Freehand } from '../Shapes/Freehand';
import { Line } from '../Shapes/Line';
import { Rectangle } from '../Shapes/Rectangle';
import { typeOfShape } from './typeguards';

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
  fill: string,
  stroke: string,
  strokeWidth: string
) => {
  svgShape.setAttribute('stroke', stroke);
  svgShape.setAttribute('stroke-width', strokeWidth);
  svgShape.setAttribute('fill', fill);
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

export const appendAsSVGShapeGeneratorFunction =
  (parent?: Element, svgNameSpace: string | null = null) =>
  (shape: ShapeType) => {
    switch (typeOfShape(shape)) {
      case 'Rectangle': {
        const rectangleObject = shape as Rectangle;
        const rect = document.createElementNS(svgNameSpace, 'rect');
        setRectSVGParams(rect, rectangleObject.toSvgParams());
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
    }
  };
