import { Circle } from '../Shapes/Circle';

export const isCircle = (shape: Object): shape is Circle => {
  return (shape as Circle).radius !== undefined;
};
