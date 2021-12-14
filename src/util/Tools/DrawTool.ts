import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Tools_List } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import { Freehand } from '../Shapes/Freehand';
import { Line } from '../Shapes/Line';
import { Tool } from './Tool';

export class DrawTool extends Tool<Freehand, Line> {
  timesPerSecond: number = 30;
  currentShapeComponents: Coordinates[] = [];
  constructor(
    drawLayer: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates
  ) {
    super(drawLayer, self, offset);
    this.resetPreview();
    this.toolName = Tools_List.DRAW;
  }

  #handleTimeOut = () => {
    this.shallWait = true;
    setTimeout(() => {
      this.shallWait = false;
    }, 1000 / this.timesPerSecond);
  };

  #draw = () => {
    this.currentShape && this.pen.drawLine(this.currentShape, this.context);
  };

  #updateShapeData = (newCoordinates: Coordinates) => {
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = newCoordinates;
    const newShape = new Line(
      this.previousCoordinates,
      this.currentCoordinates,
      true
    );
    this.currentShapeComponents.push(this.currentCoordinates);
    this.currentShape = newShape;
  };

  #onDown = (e: MouseEvent) => {
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = this.getCoords(e);
    this.isDrawing = true;
  };

  #onUp = () => {
    this.allShapes.push(new Freehand(this.currentShapeComponents, false));
    this.isDrawing = false;
  };

  #onOut = () => {
    this.isDrawing = false;
  };

  #onMove = (e: MouseEvent) => {
    if (!this.isDrawing || this.shallWait) {
      console.log(this.isDrawing, this.shallWait, 'is waiting');
      return;
    }
    const newCoordinates = this.getCoords(e);
    this.#updateShapeData(newCoordinates);
    this.#draw();
    this.#handleTimeOut();
  };

  executeAction = () => {
    this.drawLayer.addEventListener('mousemove', this.#onMove);
    this.drawLayer.addEventListener('mousedown', this.#onDown);
    this.drawLayer.addEventListener('mouseup', this.#onUp);
    this.drawLayer.addEventListener('mouseout', this.#onOut);
  };

  destroy = () => {
    this.drawLayer.removeEventListener('mousemove', this.#onMove);
    this.drawLayer.removeEventListener('mousedown', this.#onDown);
    this.drawLayer.removeEventListener('mouseup', this.#onUp);
    this.drawLayer.removeEventListener('mouseout', this.#onOut);
    return this.allShapes;
  };
}
