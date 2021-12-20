import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Shapes, ShapeType, Tools_List } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import {
  getCanvasRectangleValuesFromPoints,
  isPointInsideAnotherShape,
  isShapeInsideAnotherShape,
  rectangleParamsFromBoundaries,
} from '../helper/coordinates';
import { typeOfShape } from '../helper/typeguards';
import { Rectangle } from '../Shapes/Rectangle';
import { Tool } from './Tool';

export class SelectTool extends Tool<ShapeType> {
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates,
    shapes: ShapeType[]
  ) {
    super(drawLayer, self, offset, previewLayer);

    this.toolName = Tools_List.SELECT;
    this.allShapes = shapes;

    this.previewContext && this.previewContext.setLineDash([10, 10]);

    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.context = renderingContext;
    }
  }

  #selectedShape?: ShapeType;

  #onClick = (event: MouseEvent) => {
    this.currentCoordinates = this.getCoords(event);
    const pointPositionCompareFunction = isPointInsideAnotherShape(
      this.currentCoordinates
    );
    const selectableShapes: ShapeType[] = this.allShapes.filter(
      pointPositionCompareFunction
    );

    if (!selectableShapes.length) {
      this.#onSelect(null);
      return;
    }

    const selectedShape = selectableShapes?.reduce((acc, shape) =>
      shape.index > acc?.index ? acc : shape
    );
    this.#onSelect(selectedShape);
  };

  #onDown = (event: MouseEvent) => {
    this.unHighlightpreview();
    this.currentShape = undefined;
    this.currentCoordinates = this.getCoords(event);
    this.previousCoordinates = this.currentCoordinates;
    this.isDrawing = true;
  };

  #onSelect = (selectedShape: ShapeType | null) => {
    if (selectedShape) {
      this.#selectedShape = selectedShape;

      if (this.previewContext) {
        this.highlightPreview();
        const shapeType = typeOfShape(selectedShape);
        const { startingCorner, width, height } = rectangleParamsFromBoundaries(
          selectedShape.boundaries
        );
        this.drawTools['Rectangle'](
          new Rectangle(startingCorner, width, height, {
            stroke: 'red',
            strokeWidth: '2',
          }),
          this.previewContext
        );
        this.drawTools[shapeType](selectedShape, this.previewContext);
      }
      this.self.selectedElement = selectedShape.toString();
    } else {
      this.self.selectedElement = null;
    }
    this.self.requestUpdate();
  };

  drawTools: { [key in Shapes]: any } = {
    Rectangle: this.pen.drawRectangle,
    Ellipse: this.pen.drawEllipse,
    Line: this.pen.drawLine,
    Freehand: this.pen.drawFreehand,
    Path: this.pen.drawPath,
  };

  #onZoneSelection = (selectedZone?: Rectangle) => {
    const compareFunction = isShapeInsideAnotherShape(selectedZone);
    const shapesInsideSelectedZone = this.allShapes.filter(compareFunction);
    const highestIndex = Math.max(
      ...shapesInsideSelectedZone.map(shape => shape.index)
    );
    const highestShape = shapesInsideSelectedZone.find(
      shape => shape.index === highestIndex
    );
    const shapeType = highestShape && typeOfShape(highestShape);
    if (shapeType && this.previewContext) {
      this.#onSelect(highestShape);
    }
  };

  // 448 71 229.510498046875 399

  #onUp = (event: MouseEvent) => {
    this.resetPreview();
    this.isDrawing = false;
    if (this.currentShape) {
      this.#onZoneSelection(this.currentShape as Rectangle);
    } else {
      this.#onClick(event);
    }
    this.currentShape = undefined;
  };

  #onMove = (event: MouseEvent) => {
    if (this.isDrawing && this.previewLayer) {
      this.currentCoordinates = this.getCoords(event);
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
      if (this.currentShape) {
        this.resetPreview();
        this.pen.drawRectangle(this.currentShape, this.previewContext);
      }
    }
  };

  executeAction = () => {
    this.drawLayer.addEventListener('mousemove', this.#onMove);
    this.drawLayer.addEventListener('mousedown', this.#onDown);
    this.drawLayer.addEventListener('mouseup', this.#onUp);
  };

  destroy = () => {
    this.drawLayer.removeEventListener('mousemove', this.#onMove);
    this.drawLayer.removeEventListener('mousedown', this.#onDown);
    this.drawLayer.removeEventListener('mouseup', this.#onUp);
    return this.#selectedShape;
  };
}
