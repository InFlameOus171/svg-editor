import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Coordinates } from '../../types/types';
import { Tool } from '../Tool';

export class DrawTool extends Tool {
  constructor(
    target: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates
  ) {
    super(target, self, offset);
  }

  executeAction = () => {
    this.target.addEventListener('mousemove', this.onMove);
    this.target.addEventListener('mousedown', this.onDown);
    this.target.addEventListener('mouseup', this.onUp);
    this.target.addEventListener('mouseout', this.onOut);
    this.setDrawTool();
  };

  destroy = () => {
    this.target.removeEventListener('mousemove', this.onMove);
    this.target.removeEventListener('mousedown', this.onDown);
    this.target.removeEventListener('mouseup', this.onUp);
    this.target.removeEventListener('mouseout', this.onOut);
    return this.shapes;
  };

  private setDrawTool = () => {
    if (this.ctx) {
      this.ctx.strokeStyle = 'red';
      this.ctx.lineWidth = 2;
      this.ctx.fillStyle = 'red';
    }
  };

  private onDown = (e: MouseEvent) => {
    this.prev = this.curr;
    console.log('dafuq');
    this.curr = this.getCoords(e);
    this.shape.name = `free-${Date.now()}`;
    this.shape.coordinates = [{ x: this.curr[0], y: this.curr[1] }];
    this.drawing = true;
  };

  private onUp = () => {
    console.log('dafuq');

    this.shapes.push(this.shape);
    this.drawing = false;
  };

  private onOut = () => {
    this.drawing = false;
  };

  private onMove = (e: MouseEvent) => {
    if (!this.drawing || this.wait) return;
    this.prev = this.curr;
    this.curr = this.getCoords(e);
    this.shape.coordinates?.push({ x: this.curr[0], y: this.curr[1] });
    this.draw();
    this.wait = true;
    setTimeout(() => {
      this.wait = false;
    }, 1000 / this.timesPerSecond);
  };
}
