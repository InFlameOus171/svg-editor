import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Shape, Shapes } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import {
  getEdgesFromPoints,
  isPointInsideAnotherShape,
  isShapeInsideAnotherShape,
} from '../helper/coordinates';
import { Rectangle } from '../Shapes/Rectangle';
import { Tool } from './Tool';
import { RectangleTool } from './RectangleTool';
import { typeofShape } from '../helper/typeguards';
import { Tools_List } from '../Editor';

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
    this.toolName = Tools_List.SELECT;
  }
  isMoving: boolean = false;
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

  onClick = (event: MouseEvent) => {
    this.currentCoordinates = this.getCoords(event);
    const pointPositionCompareFunction = isPointInsideAnotherShape(
      this.currentCoordinates
    );
    const selectableShapes: Shape[] = this.allShapes.filter(
      pointPositionCompareFunction
    );

    if (!selectableShapes.length) {
      return;
    }

    const selectedShape = selectableShapes?.reduce((acc, shape) =>
      shape.index > acc?.index ? acc : shape
    );
    selectedShape && this.onSelect(selectedShape);
  };

  onDown = (event: MouseEvent) => {
    this.unHighlightpreview();
    this.previousCoordinates = this.getCoords(event);
    this.isDrawing = true;
  };

  highlightPreview = () => {
    if (this.previewContext) {
      this.previewContext.strokeStyle = 'red';
      this.previewContext.lineWidth = 2;
      this.previewContext.fillStyle = 'red';
    }
  };

  unHighlightpreview = () => {
    if (this.previewContext) {
      this.previewContext.strokeStyle = '#000000';
      this.previewContext.lineWidth = 2;
      this.previewContext.fillStyle = '#000000';
    }
  };

  onSelect = (selectedShape: Shape) => {
    if (this.previewContext) {
      this.highlightPreview();
      const shapeType = typeofShape(selectedShape);
      this.drawTools[shapeType](selectedShape, this.previewContext);
    }
    this.self.selectedElement = selectedShape.toString();
    this.self.requestUpdate();
  };

  drawTools: { [key in Shapes]: any } = {
    Rectangle: this.pen.drawRectangle,
    Ellipsis: this.pen.drawOval,
    Line: this.pen.drawLine,
    Freehand: () => alert('to be implemented'),
  };

  onZoneSelection = (selectedZone?: Rectangle) => {
    const compareFunction = isShapeInsideAnotherShape(selectedZone);
    const shapesInsideSelectedZone = this.allShapes.filter(compareFunction);
    const highestIndex = Math.max(
      ...shapesInsideSelectedZone.map(shape => shape.index)
    );
    const highestShape = shapesInsideSelectedZone.find(
      shape => shape.index === highestIndex
    );
    const shapeType = highestShape && typeofShape(highestShape);
    if (shapeType && this.previewContext) {
      this.onSelect(highestShape);
    }
  };

  onUp = (event: MouseEvent) => {
    this.resetPreview();
    this.isDrawing = false;
    if (this.currentShape) {
      this.onZoneSelection(this.currentShape as Rectangle);
    } else {
      this.onClick(event);
    }
    this.currentShape = undefined;
    this.isMoving = false;
  };

  onMove = (event: MouseEvent) => {
    if (this.isDrawing && this.previewLayer) {
      this.currentCoordinates = this.getCoords(event);
      const edges = getEdgesFromPoints(
        this.previousCoordinates,
        this.currentCoordinates
      );
      this.currentShape = new Rectangle(edges, false);
      this.resetPreview();
      this.pen.drawRectangle(this.currentShape, this.previewContext);
    }
  };
}
