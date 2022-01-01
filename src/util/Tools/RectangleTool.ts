import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType, Tools_List } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import {
  getCanvasRectangleValuesFromPoints,
  getFormattedRectangleValuesFromPoints,
} from '../helper/coordinates';
import { createRect } from '../helper/shapes';
import { Rectangle } from '../Shapes/Rectangle';
import { Tool } from './Tool';

export class RectangleTool extends Tool<Rectangle> {
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorLayout,
    onCreate: (shape: ShapeType | null) => void,
    offset: Coordinates
  ) {
    super(drawLayer, self, onCreate, offset, previewLayer);
    this.resetPreview();
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.drawContext = renderingContext;
    }
    this.toolName = Tools_List.RECT;
  }

  #draw = () => {
    if (this.currentShape) {
      this.pen.drawRectangle(this.currentShape, this.drawContext);
    }
    this.resetPreview();
  };

  executeAction = () => {
    this.drawLayer.addEventListener('mousemove', this.onMove);
    this.drawLayer.addEventListener('mousedown', this.onDown);
    this.drawLayer.addEventListener('mouseup', this.onUp);
  };

  destroy = () => {
    this.drawLayer.removeEventListener('mousemove', this.onMove);
    this.drawLayer.removeEventListener('mousedown', this.onDown);
    this.drawLayer.removeEventListener('mouseup', this.onUp);
  };

  onDown = (event: MouseEvent) => {
    this.highlightPreview();
    this.currentCoordinates = this.getCoords(event);
    this.previousCoordinates = this.currentCoordinates;
    this.isDrawing = true;
  };

  onUp = () => {
    this.isDrawing = false;
    if (this.currentShape) {
      this.createRectangle();
      this.onUpdateEditor(this.currentShape);
    }
    this.unHighlightpreview();
    this.resetPreview();
    this.#draw();
    this.resetCoordinates();
  };

  // TODO - Doppelte funktionen zusammenführen/kürzen
  createRectangle = () => {
    const { startingCorner, width, height } =
      getFormattedRectangleValuesFromPoints(
        this.previousCoordinates,
        this.currentCoordinates
      );
    this.currentShape = new Rectangle(startingCorner, width, height);
  };

  createRectanglePreview = () => {
    const { startingCorner, width, height } =
      getCanvasRectangleValuesFromPoints(
        this.previousCoordinates,
        this.currentCoordinates
      );
    this.currentShape = new Rectangle(
      startingCorner,
      width,
      height,
      undefined,
      false
    );
  };

  onMove = (event: MouseEvent) => {
    if (this.isDrawing) {
      this.currentCoordinates = this.getCoords(event);
      this.createRectanglePreview();
      if (this.currentShape) {
        this.resetPreview();
        this.pen.drawRectangle(this.currentShape, this.previewContext);
      }
    }
  };
}
