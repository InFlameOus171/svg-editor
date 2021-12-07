import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Coordinates } from '../../types/types';
import { Tools_List } from '../Editor';
import { getRectangleValuesFromPoints } from '../helper/coordinates';
import { createRect } from '../helper/shapes';
import { Rectangle } from '../Shapes/Rectangle';
import { Tool } from './Tool';

export class RectangleTool extends Tool<Rectangle> {
  constructor(
    target: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates
  ) {
    super(target, self, offset, previewLayer);
    this.resetPreview();
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.context = renderingContext;
    }
    this.toolName = Tools_List.RECT;
  }

  draw = () => {
    if (this.currentShape) {
      this.pen.drawRectangle(this.currentShape, this.context);
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
    return this.allShapes;
  };

  onDown = (event: MouseEvent) => {
    this.currentCoordinates = this.getCoords(event);
    this.previousCoordinates = this.currentCoordinates;
    this.isDrawing = true;
  };

  onUp = () => {
    this.isDrawing = false;
    if (this.currentShape) {
      this.createRectangle();
      this.allShapes.push(this.currentShape);
    }
    this.resetPreview();
    this.draw();
    this.resetCoordinates();
  };

  createRectangle = (isPreview?: boolean) => {
    const { startingCorner, width, height } = getRectangleValuesFromPoints(
      this.previousCoordinates,
      this.currentCoordinates
    );
    const shape = createRect(...startingCorner, width, height);
    this.currentShape = new Rectangle(startingCorner, width, height, isPreview);
  };

  onMove = (event: MouseEvent) => {
    if (this.isDrawing) {
      this.currentCoordinates = this.getCoords(event);
      this.createRectangle(true);
      if (this.currentShape) {
        this.resetPreview();
        this.pen.drawRectangle(this.currentShape, this.previewContext);
      }
    }
  };
}
