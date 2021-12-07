import { Shape, Shapes } from '../../types/shapes';
import { Ellipse } from '../Shapes/Ellipse';
import { Freehand } from '../Shapes/Freehand';
import { Line } from '../Shapes/Line';
import { Rectangle } from '../Shapes/Rectangle';

export const isEllipse = (shape: Object): shape is Ellipse => {
  return (
    (shape as Ellipse).radiusX !== undefined ||
    (shape as Ellipse).radiusY !== undefined
  );
};

export const isRectangle = (shape: Object): shape is Rectangle => {
  return (
    (shape as Rectangle).getWidth !== undefined &&
    (shape as Rectangle).getHeight !== undefined
  );
};

export const isLine = (shape: Object): shape is Line => {
  return (shape as Line).points !== undefined;
};

export const isFreehand = (shape: Object): shape is Freehand => {
  return (shape as Freehand).lines !== undefined;
};

export const typeOfShape = (shape: Shape): Shapes => {
  if (isRectangle(shape)) {
    return 'Rectangle';
  }
  if (isEllipse(shape)) {
    return 'Ellipse';
  }
  if (isLine(shape)) {
    return 'Line';
  }
  return 'Freehand';
};
