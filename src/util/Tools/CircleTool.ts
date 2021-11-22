import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Coordinates } from '../../types/types';
import {
  calculateDistanceBetweenPoints,
  generateCircle,
  generateEllipsis,
  getEdgesFromPoints,
} from '../helper/coordinates';
import { Ellipsis } from '../Shapes/Ellipsis';
import { Rectangle } from '../Shapes/Rectangle';
import { Tool } from '../Tool';

export class CircleTool extends Tool<Ellipsis> {
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
    if (this.isCircle) {
      const previewShape = generateCircle(
        this.previousCoordinates,
        this.currentCoordinates
      );
      this.pen.drawOval(previewShape, this.context);
    } else {
      const previewShape = generateEllipsis(
        this.previousCoordinates,
        this.currentCoordinates
      );
      this.pen.drawOval(previewShape, this.context);
    }
    this.resetPreview();
  };

  executeAction = () => {
    this.drawLayer.addEventListener('mousemove', this.onMove);
    this.drawLayer.addEventListener('mousedown', this.onDown);
    this.drawLayer.addEventListener('mouseup', this.onUp);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  };

  destroy = () => {
    this.drawLayer.removeEventListener('mousemove', this.onMove);
    this.drawLayer.removeEventListener('mousedown', this.onDown);
    this.drawLayer.removeEventListener('mouseup', this.onUp);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    return this.allShapes;
  };

  onDown = (event: MouseEvent) => {
    this.previousCoordinates = this.getCoords(event);
    this.isDrawing = true;
  };

  onUp = (event: MouseEvent) => {
    this.isDrawing = false;
    this.currentCoordinates = this.getCoords(event);
    this.currentShape = generateEllipsis(
      this.previousCoordinates,
      this.currentCoordinates
    );
    this.allShapes.push(this.currentShape);
    this.draw();
  };
  isCircle: boolean = false;

  onKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      this.isCircle = true;
    }
  };

  onKeyUp = (event: KeyboardEvent) => {
    this.isCircle = false;
  };

  onMove = (event: MouseEvent) => {
    this.currentCoordinates = this.getCoords(event);
    this.resetPreview();

    if (this.isDrawing && this.previewLayer) {
      if (this.isCircle) {
        const previewShape = generateCircle(
          this.previousCoordinates,
          this.currentCoordinates
        );
        this.pen.drawOval(previewShape, this.previewContext);
      } else {
        const previewShape = generateEllipsis(
          this.previousCoordinates,
          this.currentCoordinates
        );
        this.pen.drawOval(previewShape, this.previewContext);
      }
    }
  };
}
