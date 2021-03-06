import { EditorTemplate } from '../../../components/templates/EditorTemplate';
import type { ShapeType } from '../../../types/typeGuards.types';
import type { Coordinates, SVGParamsBase } from '../../../types/types';
import { Tools_List } from '../../helper/constants';
import { Pen } from '../../Pen';
import { Freehand } from '../../shapes/Freehand/Freehand';
import { Line } from '../../shapes/Line/Line';
import { Tool } from '../Tool';

export class DrawTool extends Tool<Freehand, Line> {
  timesPerSecond: number = 120;
  currentShapeComponents: Coordinates[] = [];
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorTemplate,
    onCreate: (shape: ShapeType | ShapeType[] | null) => void,
    currentStyles: SVGParamsBase,
    offset: Coordinates
  ) {
    super(drawLayer, self, onCreate, offset, previewLayer, currentStyles);
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
    this.currentShape && Pen.drawLine(this.currentShape, this.previewContext);
  };

  #onDown = (event: MouseEvent) => {
    if (event.button !== 0) return;
    this.isDrawing = true;
    this.currentShapeComponents = [];
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = this.getCoords(event);
  };

  #onUp = () => {
    if (this.currentShapeComponents.length > 2) {
      const completeShape = new Freehand(
        this.currentShapeComponents,
        this.drawPenConfig
      );
      this.onUpdateEditor(completeShape);
    }
    this.currentShapeComponents = [];
    this.isDrawing = false;
  };

  #onOut = () => {
    this.isDrawing = false;
  };

  #onMove = (event: MouseEvent) => {
    if (!this.isDrawing || this.shallWait) {
      return;
    }
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = this.getCoords(event);
    this.currentShape = new Line(
      this.previousCoordinates,
      this.currentCoordinates,
      this.drawPenConfig,
      false
    );
    Pen.drawLine(this.currentShape, this.previewContext);
    this.currentShapeComponents.push(this.currentCoordinates);
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
