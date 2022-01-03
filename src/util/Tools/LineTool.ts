import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType, Tools_List } from '../../types/shapes';
import { Coordinates, SVGParamsBase } from '../../types/types';
import { Pen } from '../Pen';
import { Line } from '../Shapes/Line';
import { Tool } from './Tool';

export class LineTool extends Tool<Line> {
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorLayout,
    onCreate: (shape: ShapeType | null) => void,
    drawPenConfig?: SVGParamsBase,
    offset?: Coordinates
  ) {
    super(drawLayer, self, onCreate, offset, previewLayer, drawPenConfig);
    this.resetPreview();
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.drawContext = renderingContext;
    }
    this.toolName = Tools_List.LINE;
  }

  #draw = () => {
    this.currentShape && Pen.drawLine(this.currentShape, this.drawContext);
  };

  #onDown = (event: MouseEvent) => {
    this.highlightPreview();
    this.previousCoordinates = this.getCoords(event);
    this.isDrawing = true;
  };

  #onUp = (event: MouseEvent) => {
    this.isDrawing = false;
    this.currentCoordinates = this.getCoords(event);
    this.currentShape = new Line(
      [this.previousCoordinates[0], this.previousCoordinates[1]],
      [this.currentCoordinates[0], this.currentCoordinates[1]],
      this.drawPenConfig
    );
    this.resetPreview();
    this.unHighlightpreview();
    this.#draw();
    this.onUpdateEditor(this.currentShape);
  };

  #onMove = (event: MouseEvent) => {
    if (this.isDrawing && this.previewLayer) {
      this.resetPreview();
      this.currentCoordinates = this.getCoords(event);
      this.currentShape = new Line(
        this.previousCoordinates,
        this.currentCoordinates,
        this.previewPenConfig,
        false
      );
      Pen.drawLine(this.currentShape, this.previewContext);
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
  };
}
