import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType, Tools_List } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import { highlightStyle } from '../helper/constants';
import {
  isPointInsideAnotherShape,
  rectangleParamsFromBoundaries,
} from '../helper/coordinates';
import { Rectangle } from '../Shapes/Rectangle';
import { Tool } from './Tool';

export class MoveTool extends Tool<ShapeType> {
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorLayout,
    onMove: (shape: ShapeType | null) => void,
    offset: Coordinates,
    selectedShape: ShapeType
  ) {
    super(drawLayer, self, onMove, offset, previewLayer);
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.drawContext = renderingContext;
    }
    this.currentShape = selectedShape;
    this.toolName = Tools_List.MOVE;
    this.#drawOnPreview = this.pen.generatePen(this.previewContext).draw;
  }
  #dCenter?: Coordinates;
  #drawOnPreview: (shape: ShapeType) => void;

  #onDown = (event: MouseEvent) => {
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = this.getCoords(event);
    const currentShapeCenter = this.currentShape?.getCenter() ?? [0, 0];
    this.#dCenter = [
      this.currentCoordinates[0] - currentShapeCenter[0],
      this.currentCoordinates[1] - currentShapeCenter[1],
    ];
    if (
      !this.currentShape ||
      !isPointInsideAnotherShape(this.currentCoordinates)(this.currentShape)
    ) {
      this.isDrawing = false;
      this.onUpdateEditor(null);
      return;
    }
    this.isDrawing = true;
  };

  #updatePreview = () => {
    if (this.currentShape) {
      this.resetPreview();
      const { startingCorner, width, height } = rectangleParamsFromBoundaries(
        this.currentShape.boundaries
      );
      // this.#drawOnPreview(this.currentShape);
      this.#drawOnPreview(
        new Rectangle(startingCorner, width, height, highlightStyle)
      );
    }
  };

  #onMove = (event: MouseEvent) => {
    if (!this.isDrawing) return;
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = this.getCoords(event);

    this.currentShape?.moveTo([
      this.currentCoordinates[0] - (this.#dCenter?.[0] ?? 0),
      this.currentCoordinates[1] - (this.#dCenter?.[1] ?? 0),
    ]);
    this.#updatePreview();
  };

  #onUp = () => {
    this.isDrawing = false;
    if (this.currentShape) {
      this.onUpdateEditor(this.currentShape);
      this.#updatePreview();
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
  };
}
