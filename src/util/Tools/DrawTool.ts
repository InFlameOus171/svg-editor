import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Coordinates } from '../../types/types';
import { FreehandedShape } from '../Shapes/FreehandedShape';
import { Tool } from '../Tool';

export class DrawTool extends Tool<FreehandedShape> {
  timesPerSecond: number = 30;

  constructor(
    target: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates
  ) {
    super(target, self, offset);
  }

  draw = () => {
    console.log(this.previousCoordinates, this.currentCoordinates);
    this.context?.beginPath();
    this.context?.moveTo(...this.previousCoordinates);
    this.context?.lineTo(...this.currentCoordinates);
    this.context?.stroke();
    this.context?.closePath();
  };

  executeAction = () => {
    this.drawLayer.addEventListener('mousemove', this.onMove);
    this.drawLayer.addEventListener('mousedown', this.onDown);
    this.drawLayer.addEventListener('mouseup', this.onUp);
    this.drawLayer.addEventListener('mouseout', this.onOut);
    this.setDrawTool();
  };

  destroy = () => {
    this.drawLayer.removeEventListener('mousemove', this.onMove);
    this.drawLayer.removeEventListener('mousedown', this.onDown);
    this.drawLayer.removeEventListener('mouseup', this.onUp);
    this.drawLayer.removeEventListener('mouseout', this.onOut);
    return this.allShapes;
  };

  private setDrawTool = () => {
    if (this.context) {
      this.context.strokeStyle = 'red';
      this.context.lineWidth = 2;
      this.context.fillStyle = 'red';
    }
  };

  private onDown = (e: MouseEvent) => {
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = this.getCoords(e);
    this.currentShape = new FreehandedShape(this.currentCoordinates);
    this.currentShape.addPoint([
      this.currentCoordinates[0],
      this.currentCoordinates[1],
    ]);
    this.isDrawing = true;
  };

  private onUp = () => {
    if (this.currentShape) {
      this.allShapes.push(this.currentShape);
    }
    this.isDrawing = false;
  };

  private onOut = () => {
    this.isDrawing = false;
  };

  private onMove = (e: MouseEvent) => {
    if (!this.isDrawing || this.shallWait) return;
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = this.getCoords(e);
    this.draw();
    this.shallWait = true;
    setTimeout(() => {
      this.shallWait = false;
    }, 1000 / this.timesPerSecond);
  };
}
