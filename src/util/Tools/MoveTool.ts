import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Shape, Shapes } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import { Tools_List } from '../Editor';
import { isPointInsideAnotherShape } from '../helper/coordinates';
import { typeofShape } from '../helper/typeguards';
import { Rectangle } from '../Shapes/Rectangle';
import { Tool } from './Tool';

export class MoveTool extends Tool<Shape> {
  constructor(
    target: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates,
    selectedShape?: Shape
  ) {
    super(target, self, offset, previewLayer);
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.context = renderingContext;
    }
    if (selectedShape) {
      this.selectedShape = selectedShape;
    }
    this.toolName = Tools_List.MOVE;
  }
  selectedShape?: Shape;
  initialCoordinateDifference?: Coordinates;

  moveRectangle = () => {
    this.resetPreview();
    if (this.currentShape) {
      const initialDifference = this.initialCoordinateDifference ?? [0, 0];
      const center = (this.currentShape as Rectangle).getCenter();
      console.log(initialDifference);
      (this.currentShape as Rectangle).moveTo([
        this.currentCoordinates[0] - initialDifference[0],
        this.currentCoordinates[1] - initialDifference[1],
      ]);
      this.pen.drawRectangle(
        this.currentShape as Rectangle,
        this.previewContext
      );
      console.log((this.currentShape as Rectangle).getCenter());
    }
  };

  moveTools: { [key in Shapes]: any } = {
    Rectangle: this.moveRectangle,
    Ellipsis: this.pen.drawOval,
    Line: this.pen.drawLine,
    Freehand: () => alert('to be implemented'),
  };
  onDown = (event: MouseEvent) => {
    if (
      !this.selectedShape ||
      !isPointInsideAnotherShape(this.currentCoordinates)(this.selectedShape)
    )
      return;

    this.currentShape = this.selectedShape;
    this.isDrawing = true;

    if (this.selectedShape && typeofShape(this.selectedShape) === 'Rectangle') {
      const center = (this.selectedShape as Rectangle).getCenter();
      this.currentCoordinates = this.getCoords(event);
      this.initialCoordinateDifference = [
        this.currentCoordinates[0] - center[0],
        this.currentCoordinates[1] - center[1],
      ];
    }
  };

  onMove = (event: MouseEvent) => {
    if (this.isDrawing) {
      this.previousCoordinates = this.currentCoordinates;
      this.currentCoordinates = this.getCoords(event);
      if (this.currentShape) {
        this.moveTools[typeofShape(this.currentShape)]();
      }
    }
  };
  onUp = () => {
    if (this.currentShape) {
      this.allShapes = [this.currentShape];
    }
    this.isDrawing = false;
  };

  executeAction = () => {
    this.drawLayer.addEventListener('mousedown', this.onDown);
    this.drawLayer.addEventListener('mousemove', this.onMove);
    this.drawLayer.addEventListener('mouseup', this.onUp);
  };

  destroy = () => {
    this.drawLayer.removeEventListener('mousedown', this.onDown);
    this.drawLayer.removeEventListener('mousemove', this.onMove);
    this.drawLayer.removeEventListener('mouseup', this.onUp);
    return this.allShapes;
  };
}
