import { RectangleComponents } from '../../types/types';

export class Rectangle {
  corners: RectangleComponents;

  constructor(corners: RectangleComponents) {
    this.corners = corners;
  }
}
