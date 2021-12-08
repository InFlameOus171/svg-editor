import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import { Tools_List } from '../Editor';
import { Pen } from '../Pen';

export abstract class Tool<T extends ShapeType, V extends ShapeType = T> {
  drawLayer: HTMLCanvasElement;
  previewLayer?: HTMLCanvasElement;
  self: EditorLayout;
  currentShape?: V;
  allShapes: T[] = [];
  shallWait: boolean = false;
  context?: CanvasRenderingContext2D;
  previewContext?: CanvasRenderingContext2D;
  pen = Pen;
  toolName?: Tools_List;
  offset: Coordinates;
  isDrawing: boolean = false;
  previousCoordinates: [number, number] = [0, 0];
  currentCoordinates: [number, number] = [0, 0];

  constructor(
    target: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates,
    previewLayer?: HTMLCanvasElement
  ) {
    this.drawLayer = target;
    this.self = self;
    this.offset = offset;
    this.previewLayer = previewLayer;
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.context = renderingContext;
      this.context.strokeStyle = '#000000';
      this.context.lineWidth = 2;
      this.context.fillStyle = '#000000';
    }
    const previewContext = this.previewLayer?.getContext('2d');
    if (previewContext) {
      this.previewContext = previewContext;
      this.previewContext.strokeStyle = '#000000';
      this.previewContext.lineWidth = 2;
      this.previewContext.fillStyle = '#000000';
    }
  }

  static resetCanvas = (
    canvas: HTMLCanvasElement,
    canvasContext: CanvasRenderingContext2D
  ) => {
    if (canvas) {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  resetPreview = () => {
    if (this.previewLayer && this.previewContext) {
      Tool.resetCanvas(this.previewLayer, this.previewContext);
    }
  };

  resetView = () => {
    if (this.drawLayer && this.context) {
      Tool.resetCanvas(this.drawLayer, this.context);
    }
  };

  resetCoordinates = () => {
    this.previousCoordinates = [0, 0];
    this.currentCoordinates = [0, 0];
  };

  highlightPreview = () => {
    if (this.previewContext) {
      this.previewContext.strokeStyle = 'red';
      this.previewContext.setLineDash([10, 10]);
      this.previewContext.lineWidth = 3;
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

  updateShapeData = (newCoordinates: Coordinates): void => {
    throw new Error('not implemented');
  };

  getCoords = (e: MouseEvent): [number, number] => {
    return [e.clientX - this.offset[0], e.clientY - this.offset[1]];
  };

  draw = (): void => {
    throw new Error('not implemented');
  };

  executeAction = (): void => {
    throw new Error('not implemented');
  };
  destroy = (): T | T[] | undefined => {
    throw new Error('not implemented');
  };
}
