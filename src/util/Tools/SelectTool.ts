import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Shape } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import { getEdgesFromPoints } from '../helper/coordinates';
import { Rectangle } from '../Shapes/Rectangle';
import { Tool } from './Tool';
import { RectangleTool } from './RectangleTool';
import { typeofShape } from '../helper/typeguards';

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
    this.currentCoordinates = this.getCoords(event);
    const selectableShapes = this.allShapes.filter(shape => {
      if (shape.boundary) {
        const xMax = Math.max.apply(
          Math,
          shape.boundary.map(coords => coords[0])
        );
        const yMax = Math.max.apply(
          Math,
          shape.boundary.map(coords => coords[1])
        );
        const xMin = Math.min.apply(
          Math,
          shape.boundary.map(coords => coords[0])
        );
        const yMin = Math.min.apply(
          Math,
          shape.boundary.map(coords => coords[1])
        );
        // const allXCoords = shape.boundary.map(coords => coords[0]);
        // const allYCoords = shape.boundary.map(coords => coords[1]);
        // const xMax = Math.max(...allXCoords);
        // const yMax = Math.max(...allYCoords);
        // const xMin = Math.min(...allXCoords);
        // const yMin = Math.min(...allYCoords);
        const [currentX, currentY] = this.currentCoordinates;
        return (
          currentX < xMax &&
          currentX > xMin &&
          currentY < yMax &&
          currentY > yMin
        );
      }
    });
    const selectedShape = selectableShapes.reduce((acc, shape) =>
      shape.index > acc.index ? acc : shape
    );
    this.self.selectedElement = selectedShape.toString();
    this.self.requestUpdate();
    console.log(selectedShape);
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
