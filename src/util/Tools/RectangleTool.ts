import { SVGEditor } from '../../components/organisms/SVGEditor';
import { ShapeType } from '../../types/shapes';
import { Coordinates, SVGParamsBase } from '../../types/types';
import { Tools_List } from '../helper/constants';
import {
  getCanvasRectangleValuesFromPoints,
  getFormattedRectangleValuesFromPoints,
} from '../helper/coordinates';
import { Pen } from '../Pen';
import { Rectangle } from '../Shapes/Rectangle';
import { Tool } from './Tool';

export class RectangleTool extends Tool<Rectangle> {
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: SVGEditor,
    onCreate: (shape: ShapeType | ShapeType[] | null) => void,
    styles: SVGParamsBase,
    offset: Coordinates
  ) {
    super(drawLayer, self, onCreate, offset, previewLayer, styles);
    this.resetPreview();
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.drawContext = renderingContext;
    }
    this.toolName = Tools_List.RECT;
  }

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
    this.resetPreview();
    this.resetView();
    this.isDrawing = false;
    if (this.currentShape) {
      this.createRectangle();
      this.onUpdateEditor(this.currentShape);
    }
    this.resetCoordinates();
  };

  // TODO - Doppelte funktionen zusammenführen/kürzen
  createRectangle = () => {
    const { startingCorner, width, height } =
      getFormattedRectangleValuesFromPoints(
        this.previousCoordinates,
        this.currentCoordinates
      );
    this.currentShape = new Rectangle(
      startingCorner,
      width,
      height,
      this.drawPenConfig
    );
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
      this.previewPenConfig,
      false
    );
  };

  onMove = (event: MouseEvent) => {
    if (this.isDrawing) {
      this.currentCoordinates = this.getCoords(event);
      this.createRectanglePreview();
      if (this.currentShape) {
        this.resetPreview();
        Pen.drawRectangle(
          this.currentShape,
          this.previewContext,
          this.previewPenConfig
        );
      }
    }
  };
}
