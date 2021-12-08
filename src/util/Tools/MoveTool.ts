import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType, Shapes } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import { Tools_List } from '../Editor';
import { isPointInsideAnotherShape } from '../helper/coordinates';
import { typeOfShape } from '../helper/typeguards';
import { Rectangle } from '../Shapes/Rectangle';
import { Tool } from './Tool';

export class MoveTool extends Tool<ShapeType> {
  constructor(
    target: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates,
    allShapes: ShapeType[] = [],
    selectedShape: ShapeType
  ) {
    super(target, self, offset, previewLayer);
    console.log(selectedShape);
    this.allShapes = allShapes;
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.context = renderingContext;
    }
    this.currentShape = selectedShape;
    this.toolName = Tools_List.MOVE;
    this.#drawOnPreview = this.pen.draw(this.previewContext);
    this.#draw = this.pen.draw(this.context);
  }
  #dCenter?: Coordinates;
  #drawOnPreview: (shape: ShapeType) => void;
  #draw: (shape: ShapeType) => void;
  currentShape?: ShapeType;
  initialCoordinateDifference?: Coordinates;

  #getIndexOfSelectedShape = () =>
    this.allShapes.findIndex(shape => {
      return shape.getId() === this.currentShape?.getId();
    });

  onDown = (event: MouseEvent) => {
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
    console.log(this.currentShape.toString());
  };

  onMove = (event: MouseEvent) => {
    if (!this.isDrawing) return;
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = this.getCoords(event);

    if (this.currentShape) {
      this.currentShape.moveTo([
        this.currentCoordinates[0] - (this.#dCenter?.[0] ?? 0),
        this.currentCoordinates[1] - (this.#dCenter?.[1] ?? 0),
      ]);
      this.resetPreview();
      this.highlightPreview();
      this.#drawOnPreview(this.currentShape);
    }
  };

  onUp = (event: MouseEvent) => {
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
    console.log(this.currentShape?.toString());
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
