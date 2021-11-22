import { RectangleComponents } from '../../types/types';
import { Shape } from './Shape';

export class Rectangle extends Shape {
  corners: RectangleComponents;

  constructor(corners: RectangleComponents) {
    super();
    this.corners = corners;
  }
}
