import { Shape, Shapes } from '../../types/shapes';
import { Ellipsis } from '../Shapes/Ellipsis';
import { Freehand } from '../Shapes/Freehand';
import { Line } from '../Shapes/Line';
import { Rectangle } from '../Shapes/Rectangle';

export const isEllipsis = (shape: Object): shape is Ellipsis => {
  return (
    (shape as Ellipsis).radiusX !== undefined ||
    (shape as Ellipsis).radiusY !== undefined
  );
};

export const isRectangle = (shape: Object): shape is Rectangle => {
  return (shape as Rectangle).edges !== undefined;
};

export const isLine = (shape: Object): shape is Line => {
  return (shape as Line).points !== undefined;
};

export const isFreehand = (shape: Object): shape is Freehand => {
  return (shape as Freehand).lines !== undefined;
};

export const typeofShape = (shape: Shape): Shapes => {
  if (isRectangle(shape)) {
    return 'Rectangle';
  }
  if (isEllipsis(shape)) {
    return 'Ellipsis';
  }
  if (isLine(shape)) {
    return 'Line';
  }
  return 'Freehand';
};
