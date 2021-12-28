import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType, Tools_List } from '../../types/shapes';
import { Coordinates } from '../../types/types';
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
    drawLayer: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates,
    previewLayer?: HTMLCanvasElement
  ) {
    this.drawLayer = drawLayer;
    this.self = self;
    this.offset = offset;
    this.previewLayer = previewLayer;
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.context = renderingContext;
      this.context.strokeStyle = '#000000';
      this.context.lineWidth = 2;
      this.context.fillStyle = '#000000';
      renderingContext.save();
    }
    const previewContext = this.previewLayer?.getContext('2d');
    if (previewContext) {
      this.previewContext = previewContext;
      this.previewContext.strokeStyle = '#000000';
      this.previewContext.lineWidth = 2;
      this.previewContext.fillStyle = '#000000';
      previewContext.save();
    }
  }

  resetPreview = () => {
    if (this.previewLayer && this.previewContext) {
      this.pen.clearCanvas(this.previewLayer, this.previewContext);
    }
  };

  resetView = () => {
    if (this.drawLayer && this.context) {
      this.pen.clearCanvas(this.drawLayer, this.context);
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

  #draw = (): void => {
    throw new Error('not implemented');
  };

  executeAction = (): void => {
    throw new Error('not implemented');
  };
  destroy = (): T | T[] | undefined => {
    throw new Error('not implemented');
  };
}
