import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Shapes, ShapeType, Tools_List } from '../../types/shapes';
import { Coordinates, SVGParamsBase } from '../../types/types';
import { highlightStyle } from '../helper/constants';
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
    onSelect: (shape: ShapeType | null) => void,
    shapes: ShapeType[],
    offset?: Coordinates
  ) {
    super(drawLayer, self, onSelect, offset, previewLayer);

    this.toolName = Tools_List.SELECT;
    this.allShapes = shapes;
    this.previewContext && this.previewContext.setLineDash([10, 10]);

    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.drawContext = renderingContext;
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
      this.onUpdateEditor(this.#selectedShape);
      if (this.previewContext) {
        const { startingCorner, width, height } = rectangleParamsFromBoundaries(
          selectedShape.boundaries
        );
        console.log(startingCorner, width, height, highlightStyle);
        this.pen.draw(
          new Rectangle(startingCorner, width, height, highlightStyle),
          undefined,
          this.previewContext
        );
      }
    }
  };

  #onZoneSelection = (selectedZone?: Rectangle) => {
    const compareFunction = isShapeInsideAnotherShape(selectedZone);
    console.log(this.allShapes);
    const shapesInsideSelectedZone = this.allShapes.filter(compareFunction);
    const highestIndex = Math.max(
      ...shapesInsideSelectedZone.map(shape => shape.index)
    );
    const highestShape = shapesInsideSelectedZone.find(
      shape => shape.index === highestIndex
    );
    console.log(highestShape);
    const shapeType = highestShape && typeOfShape(highestShape);
    if (shapeType && this.previewContext) {
      this.#onSelect(highestShape);
    }
  };

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
        highlightStyle,
        false
      );
      if (this.currentShape) {
        this.resetPreview();
        this.pen.drawRectangle(
          this.currentShape as Rectangle,
          this.previewContext
        );
      }
    }
  };

  changeStyle = (config: SVGParamsBase) => {
    if (this.#selectedShape) {
      this.#selectedShape.applyStyles(config);
      this.resetPreview();
      this.pen.draw(this.#selectedShape, undefined, this.previewContext);
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
