import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Coordinates } from '../../types/types';
import { Freehand } from '../Shapes/Freehand';
import { Line } from '../Shapes/Line';
import { Tool } from './Tool';

export class DrawTool extends Tool<Freehand, Line> {
  timesPerSecond: number = 30;
  currentShapeComponents: Line[] = [];
  constructor(
    target: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates
  ) {
    super(target, self, offset);
  }

  #draw = () => {
    this.currentShape && this.pen.drawLine(this.currentShape, this.context);
  };

  executeAction = () => {
    this.drawLayer.addEventListener('mousemove', this.#onMove);
    this.drawLayer.addEventListener('mousedown', this.#onDown);
    this.drawLayer.addEventListener('mouseup', this.#onUp);
    this.drawLayer.addEventListener('mouseout', this.#onOut);
    this.#setDrawTool();
  };

  destroy = () => {
    this.drawLayer.removeEventListener('mousemove', this.#onMove);
    this.drawLayer.removeEventListener('mousedown', this.#onDown);
    this.drawLayer.removeEventListener('mouseup', this.#onUp);
    this.drawLayer.removeEventListener('mouseout', this.#onOut);
    return this.allShapes;
  };

  #setDrawTool = () => {
    if (this.context) {
      this.context.strokeStyle = 'red';
      this.context.lineWidth = 2;
      this.context.fillStyle = 'red';
    }
  };

  #onDown = (e: MouseEvent) => {
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = this.getCoords(e);
    this.isDrawing = true;
  };

  #onUp = () => {
    const newLines = this.currentShapeComponents.map(
      (component, index) => new Line(...component.points, index !== 0)
    );
    this.allShapes.push(new Freehand(newLines, true));
    this.isDrawing = false;
  };

  #onOut = () => {
    this.isDrawing = false;
  };

  #updateShapeData = (newCoordinates: Coordinates) => {
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = newCoordinates;
    const newShape = new Line(
      this.previousCoordinates,
      this.currentCoordinates,
      true
    );
    this.currentShapeComponents.push(newShape);
    this.currentShape = newShape;
  };

  #handleTimeOut = () => {
    this.shallWait = true;
    setTimeout(() => {
      this.shallWait = false;
    }, 1000 / this.timesPerSecond);
  };

  #onMove = (e: MouseEvent) => {
    if (!this.isDrawing || this.shallWait) {
      return;
    }
    const newCoordinates = this.getCoords(e);
    this.#updateShapeData(newCoordinates);
    this.#draw();
    this.#handleTimeOut();
  };
}
