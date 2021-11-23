import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Coordinates } from '../../types/types';
import { getEdgesFromPoints } from '../helper/coordinates';
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
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.context = renderingContext;
    }
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
    this.previousCoordinates = this.getCoords(event);
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
  };

  createRectangle = (isPreview?: boolean) => {
    const edges = getEdgesFromPoints(
      this.previousCoordinates,
      this.currentCoordinates,
      isPreview
    );
    this.currentShape = new Rectangle(edges, true);
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
