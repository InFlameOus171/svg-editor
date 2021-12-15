import { ShapeType, Shapes } from '../../types/shapes';
import { Ellipse } from '../Shapes/Ellipse';
import { Freehand } from '../Shapes/Freehand';
import { Line } from '../Shapes/Line';
import { Path } from '../Shapes/Path';
import { Rectangle } from '../Shapes/Rectangle';

export const isEllipse = (shape: ShapeType): shape is Ellipse => {
  return (
    (shape as Ellipse).radiusX !== undefined ||
    (shape as Ellipse).radiusY !== undefined
  );
};

export const isRectangle = (shape: ShapeType): shape is Rectangle => {
  return (
    (shape as Rectangle)['getWidth'] !== undefined &&
    (shape as Rectangle)['getHeight'] !== undefined
  );
};

export const isLine = (shape: ShapeType): shape is Line => {
  return (shape as Line)['points'] !== undefined;
};

export const isFreehand = (shape: ShapeType): shape is Freehand => {
  return (shape as Freehand)['getPoints'] !== undefined;
};
export const isPath = (shape: ShapeType): shape is Path => {
  return (shape as Path)['toString'] !== undefined;
};

export const typeOfShape = (shape: ShapeType): Shapes => {
  if (isRectangle(shape)) {
    return 'Rectangle';
  }
  if (isEllipse(shape)) {
    return 'Ellipse';
  }
  if (isLine(shape)) {
    return 'Line';
  }
  if (isPath(shape)) {
    return 'Path';
  }
  return 'Freehand';
};
