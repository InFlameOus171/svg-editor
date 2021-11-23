import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Shape } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import { Pen } from '../Pen';

export abstract class Tool<T extends Shape, V extends Shape = T> {
  drawLayer: HTMLCanvasElement;
  previewLayer?: HTMLCanvasElement;
  self: EditorLayout;
  currentShape?: V;
  allShapes: T[] = [];
  shallWait: boolean = false;
  context?: CanvasRenderingContext2D;
  previewContext?: CanvasRenderingContext2D;
  pen = Pen;

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
    }
    const previewContext = this.previewLayer?.getContext('2d');
    if (previewContext) {
      this.previewContext = previewContext;
    }
  }

  resetPreview = () => {
    if (this.previewLayer) {
      this.previewContext?.clearRect(
        0,
        0,
        this.previewLayer?.width,
        this.previewLayer.height
      );
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
  destroy = (): T[] => {
    throw new Error('not implemented');
  };
}
