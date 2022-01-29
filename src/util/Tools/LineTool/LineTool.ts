import { EditorTemplate } from '../../../components/templates/EditorTemplate';
import type { ShapeType } from '../../../types/typeGuards.types';
import type { Coordinates, SVGParamsBase } from '../../../types/types';
import { Tools_List } from '../../helper/constants';
import { Pen } from '../../Pen';
import { Line } from '../../shapes/Line/Line';
import { Tool } from '../Tool';

export class LineTool extends Tool<Line> {
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorTemplate,
    onCreate: (shape: ShapeType | ShapeType[] | null) => void,
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
    if (event.button !== 0) return;
    this.isDrawing = true;
    this.highlightPreview();
    this.previousCoordinates = this.getCoords(event);
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
  #onOut = () => {
    this.isDrawing = false;
  };

  executeAction = () => {
    this.drawLayer.addEventListener('mousemove', this.#onMove);
    this.drawLayer.addEventListener('mousedown', this.#onDown);
    this.drawLayer.addEventListener('mouseout', this.#onOut);
    this.drawLayer.addEventListener('mouseup', this.#onUp);
  };

  destroy = () => {
    this.drawLayer.removeEventListener('mousemove', this.#onMove);
    this.drawLayer.removeEventListener('mousedown', this.#onDown);
    this.drawLayer.removeEventListener('mouseout', this.#onOut);
    this.drawLayer.removeEventListener('mouseup', this.#onUp);
  };
}
