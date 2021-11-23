import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Shape } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import { getEdgesFromPoints } from '../helper/coordinates';
import { Rectangle } from '../Shapes/Rectangle';
import { Tool } from './Tool';
import { RectangleTool } from './RectangleTool';

export class SelectTool extends Tool<Shape> {
  constructor(
    target: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates,
    shapes: Shape[]
  ) {
    super(target, self, offset, previewLayer);
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.context = renderingContext;
    }
    this.allShapes = shapes;
  }

  executeAction = () => {
    this.drawLayer.addEventListener('mousemove', this.onMove);
    this.drawLayer.addEventListener('mousedown', this.onDown);
    this.drawLayer.addEventListener('click', this.onClick);
    this.drawLayer.addEventListener('mouseup', this.onUp);
  };

  destroy = () => {
    this.drawLayer.removeEventListener('mousemove', this.onMove);
    this.drawLayer.removeEventListener('mousedown', this.onDown);
    this.drawLayer.removeEventListener('click', this.onClick);
    this.drawLayer.removeEventListener('mouseup', this.onUp);
    return this.allShapes;
  };

  onClick = (event: MouseEvent) => {
    this.allShapes.forEach;
  };

  onDown = (event: MouseEvent) => {
    this.previousCoordinates = this.getCoords(event);
    this.isDrawing = true;
  };

  select = (selectedZone?: Rectangle) => {
    this.allShapes.forEach(shape => {});
  };

  onUp = () => {
    this.isDrawing = false;
    this.select(this.currentShape as Rectangle);
    this.currentShape = undefined;
  };

  onMove = (event: MouseEvent) => {
    this.currentCoordinates = this.getCoords(event);
    const edges = getEdgesFromPoints(
      this.previousCoordinates,
      this.currentCoordinates
    );
    this.currentShape = new Rectangle(edges);
    if (this.isDrawing && this.previewLayer) {
      this.resetPreview();
      this.pen.drawRectangle(this.currentShape, this.previewContext);
    }
  };
}
