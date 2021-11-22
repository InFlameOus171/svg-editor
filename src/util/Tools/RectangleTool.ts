import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Coordinates, RectangleComponents } from '../../types/types';
import { getEdgesFromPoints } from '../helper/coordinates';
import { Line } from '../Shapes/Line';
import { Rectangle } from '../Shapes/Rectangle';
import { Tool } from '../Tool';

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
    this.pen.drawRectangle(
      this.previousCoordinates,
      this.currentCoordinates,
      this.context
    );
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

  onUp = (event: MouseEvent) => {
    this.isDrawing = false;
    this.currentCoordinates = this.getCoords(event);
    const edges = getEdgesFromPoints(
      this.previousCoordinates,
      this.currentCoordinates
    );
    this.currentShape = new Rectangle(edges);
    this.allShapes.push(this.currentShape);
    this.draw();
  };

  onMove = (event: MouseEvent) => {
    this.currentCoordinates = this.getCoords(event);

    if (this.isDrawing && this.previewLayer) {
      this.previewContext?.clearRect(
        0,
        0,
        this.previewLayer?.width,
        this.previewLayer.height
      );

      this.pen.drawRectangle(
        this.previousCoordinates,
        this.currentCoordinates,
        this.previewContext
      );
    }
  };
}
