import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Tools_List } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import { Line } from '../Shapes/Line';
import { Tool } from './Tool';

export class LineTool extends Tool<Line> {
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates
  ) {
    super(drawLayer, self, offset, previewLayer);
    this.resetPreview();
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.drawContext = renderingContext;
    }
    this.toolName = Tools_List.LINE;
  }

  #draw = () => {
    this.currentShape && this.pen.drawLine(this.currentShape, this.drawContext);
  };

  #onDown = (event: MouseEvent) => {
    this.previousCoordinates = this.getCoords(event);
    this.isDrawing = true;
  };

  #onUp = (event: MouseEvent) => {
    this.isDrawing = false;
    this.currentCoordinates = this.getCoords(event);
    this.currentShape = new Line(
      [this.previousCoordinates[0], this.previousCoordinates[1]],
      [this.currentCoordinates[0], this.currentCoordinates[1]]
    );
    this.allShapes.push(this.currentShape);
    this.#draw();
  };

  #onMove = (event: MouseEvent) => {
    this.resetPreview();
    if (this.isDrawing && this.previewLayer) {
      this.currentCoordinates = this.getCoords(event);
      this.previewContext?.beginPath();
      this.previewContext?.moveTo(...this.previousCoordinates);
      this.previewContext?.lineTo(...this.currentCoordinates);
      this.previewContext?.stroke();
    }
  };

  executeAction = () => {
    this.drawLayer.addEventListener('mousemove', this.#onMove);
    this.drawLayer.addEventListener('mousedown', this.#onDown);
    this.drawLayer.addEventListener('mouseup', this.#onUp);
  };

  destroy = () => {
    this.drawLayer.removeEventListener('mousemove', this.#onMove);
    this.drawLayer.removeEventListener('mousedown', this.#onDown);
    this.drawLayer.removeEventListener('mouseup', this.#onUp);
    return this.allShapes;
  };
}
