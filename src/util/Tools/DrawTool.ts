import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType, Tools_List } from '../../types/shapes';
import { Coordinates, SVGParamsBase } from '../../types/types';
import { Pen } from '../Pen';
import { Freehand } from '../Shapes/Freehand';
import { Line } from '../Shapes/Line';
import { Tool } from './Tool';

export class DrawTool extends Tool<Freehand, Line> {
  timesPerSecond: number = 120;
  currentShapeComponents: Coordinates[] = [];
  constructor(
    drawLayer: HTMLCanvasElement,
    self: EditorLayout,
    onCreate: (shape: ShapeType | null) => void,
    currentStyles: SVGParamsBase,
    offset: Coordinates
  ) {
    super(drawLayer, self, onCreate, offset, undefined, currentStyles);
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
    this.currentShape && Pen.drawLine(this.currentShape, this.drawContext);
  };

  #updateShapeData = (newCoordinates: Coordinates) => {
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = newCoordinates;
    const newShape = new Line(
      this.previousCoordinates,
      this.currentCoordinates,
      this.drawPenConfig,
      false
    );
    this.currentShapeComponents.push(this.currentCoordinates);
    this.currentShape = newShape;
  };

  #onDown = (e: MouseEvent) => {
    this.currentShapeComponents = [];
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = this.getCoords(e);
    this.isDrawing = true;
  };

  #onUp = () => {
    if (this.currentShapeComponents.length > 2) {
      const completeShape = new Freehand(
        this.currentShapeComponents,
        undefined
      );
      this.onUpdateEditor(completeShape);
    }

    this.currentShapeComponents = [];
    this.isDrawing = false;
  };

  #onOut = () => {
    this.isDrawing = false;
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
  };
}
