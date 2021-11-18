import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Coordinates, Shape } from '../../types/types';
import { Tool } from '../Tool';

export class LineTool extends Tool {
  constructor(
    target: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates
  ) {
    super(target, self, offset, previewLayer);
    const renderingContext = this.target.getContext('2d');
    this.timesPerSecond = 1000;
    if (renderingContext) {
      this.ctx = renderingContext;
    }
  }

  executeAction = () => {
    this.target.addEventListener('mousemove', this.onMove);
    this.target.addEventListener('mousedown', this.onDown);
    this.target.addEventListener('mouseup', this.onUp);
  };

  destroy = () => {
    this.target.removeEventListener('mousemove', this.onMove);
    this.target.removeEventListener('mousedown', this.onDown);
    this.target.removeEventListener('mouseup', this.onUp);
    return this.shapes;
  };

  onDown = (event: MouseEvent) => {
    this.prev = this.getCoords(event);
    this.drawing = true;
  };

  onUp = (event: MouseEvent) => {
    this.drawing = false;
    this.curr = this.getCoords(event);
    this.shape.name = `line-${Date.now()}`;
    this.shape.coordinates = [
      { x: this.prev[0], y: this.prev[1] },
      { x: this.curr[0], y: this.curr[1] },
    ];
    this.shapes.push(this.shape);
    this.draw();
  };

  onMove = (event: MouseEvent) => {
    if (this.drawing && this.previewLayer) {
      this.curr = this.getCoords(event);
      this.previewCtx?.clearRect(
        0,
        0,
        this.previewLayer?.width,
        this.previewLayer.height
      );
      this.previewCtx?.beginPath();
      this.previewCtx?.moveTo(...this.prev);
      this.previewCtx?.lineTo(...this.curr);
      this.previewCtx?.stroke();
    }
  };
}
