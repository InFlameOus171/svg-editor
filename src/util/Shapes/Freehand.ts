import { Line } from './Line';
import { Shape } from './Shape';

export class Freehand extends Shape {
  lines: Line[];
  constructor(lines: Line[], dontCountUp?: boolean) {
    super(dontCountUp);
    this.lines = lines;
  }
}
