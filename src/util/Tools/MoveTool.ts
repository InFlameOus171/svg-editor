import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType, Shapes, Tools_List } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import {
  isPointInsideAnotherShape,
  rectangleParamsFromBoundaries,
} from '../helper/coordinates';
import { typeOfShape } from '../helper/typeguards';
import { Rectangle } from '../Shapes/Rectangle';
import { Tool } from './Tool';

export class MoveTool extends Tool<ShapeType> {
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates,
    allShapes: ShapeType[] = [],
    selectedShape: ShapeType
  ) {
    super(drawLayer, self, offset, previewLayer);
    this.allShapes = allShapes;
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.context = renderingContext;
    }
    this.currentShape = selectedShape;
    this.toolName = Tools_List.MOVE;
    this.#drawOnPreview = this.pen.generatePen(this.previewContext).draw;
    this.#draw = this.pen.generatePen(this.context).draw;
  }
  #dCenter?: Coordinates;
  #drawOnPreview: (shape: ShapeType) => void;
  #draw: (shape: ShapeType) => void;

  #getIndexOfSelectedShape = () =>
    this.allShapes.findIndex(shape => {
      return shape.getId() === this.currentShape?.getId();
    });

  #onDown = (event: MouseEvent) => {
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = this.getCoords(event);
    const currentShapeCenter = this.currentShape?.getCenter() ?? [0, 0];
    this.#dCenter = [
      this.currentCoordinates[0] - currentShapeCenter[0],
      this.currentCoordinates[1] - currentShapeCenter[1],
    ];
    const indexOfShape = this.#getIndexOfSelectedShape();
    this.currentShape = this.allShapes[indexOfShape];
    if (
      !this.currentShape ||
      !isPointInsideAnotherShape(this.currentCoordinates)(this.currentShape)
    ) {
      this.isDrawing = false;
      return;
    }
    // this.allShapes = this.allShapes.splice(indexOfShape, 1);
    this.isDrawing = true;
  };

  #onMove = (event: MouseEvent) => {
    if (!this.isDrawing) return;
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = this.getCoords(event);

    if (this.currentShape) {
      this.currentShape.moveTo([
        this.currentCoordinates[0] - (this.#dCenter?.[0] ?? 0),
        this.currentCoordinates[1] - (this.#dCenter?.[1] ?? 0),
      ]);
      this.resetPreview();
      const { startingCorner, width, height } = rectangleParamsFromBoundaries(
        this.currentShape.boundaries
      );
      this.#drawOnPreview(
        new Rectangle(startingCorner, width, height, {
          stroke: 'red',
          strokeWidth: '2',
        })
      );
      this.highlightPreview();
      this.#drawOnPreview(this.currentShape);
    }
  };

  #onUp = () => {
    this.isDrawing = false;
    if (this.currentShape) {
      this.allShapes.splice(
        this.#getIndexOfSelectedShape(),
        1,
        this.currentShape
      );
      this.resetView();
      this.allShapes.forEach(shape => {
        this.#draw(shape);
      });
    }
  };

  executeAction = () => {
    this.drawLayer.addEventListener('mousedown', this.#onDown);
    this.drawLayer.addEventListener('mousemove', this.#onMove);
    this.drawLayer.addEventListener('mouseup', this.#onUp);
  };

  destroy = () => {
    this.drawLayer.removeEventListener('mousedown', this.#onDown);
    this.drawLayer.removeEventListener('mousemove', this.#onMove);
    this.drawLayer.removeEventListener('mouseup', this.#onUp);
    return this.allShapes;
  };
}
