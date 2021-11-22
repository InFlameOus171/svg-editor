import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Shape } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import { Tool } from '../Tool';

export class SelectTool extends Tool {
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
  }

  onUp = (event: MouseEvent) => {
    this.allShapes.forEach(shape => shape);
  };

  onMove = (event: MouseEvent) => {
    this.currentCoordinates = this.getCoords(event);

    if (this.isDrawing && this.previewLayer) {
      this.previewContext?.clearRect(
        0,
        0,
        this.previewLayer?.width,
        this.previewLayer.height
      );

      this.pen.drawRectangle(
        this.previousCoordinates,
        this.currentCoordinates,
        this.previewContext
      );
    }
  };
}
