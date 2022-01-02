import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType, Tools_List } from '../../types/shapes';
import { Coordinates, SVGParamsBase } from '../../types/types';
import { Pen } from '../Pen';

export abstract class Tool<T extends ShapeType, V extends ShapeType = T> {
  drawLayer: HTMLCanvasElement;
  previewLayer?: HTMLCanvasElement;
  self: EditorLayout;
  currentShape?: V;
  allShapes: T[] = [];
  shallWait: boolean = false;
  drawContext?: CanvasRenderingContext2D;
  previewContext?: CanvasRenderingContext2D;
  pen = Pen;
  previewPenConfig?: SVGParamsBase;
  drawPenConfig?: SVGParamsBase;
  toolName?: Tools_List;
  offset: Coordinates;
  isDrawing: boolean = false;
  previousCoordinates: [number, number] = [0, 0];
  currentCoordinates: [number, number] = [0, 0];
  onUpdateEditor: (shape: ShapeType | null) => void;
  constructor(
    drawLayer: HTMLCanvasElement,
    self: EditorLayout,
    onUpdateEditor: (shape: ShapeType | null) => void,
    offset: Coordinates = [0, 0],
    previewLayer?: HTMLCanvasElement,
    drawPenConfig?: SVGParamsBase,
    previewPenConfig?: SVGParamsBase
  ) {
    this.drawLayer = drawLayer;
    this.onUpdateEditor = onUpdateEditor;
    this.self = self;
    this.offset = offset ?? [drawLayer.offsetLeft, drawLayer.offsetTop];
    console.log(this.offset);
    this.previewLayer = previewLayer;
    this.previewPenConfig = previewPenConfig;
    this.drawPenConfig = drawPenConfig;
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.drawContext = renderingContext;
      this.setContextConfig('draw');
    }
    const previewContext = this.previewLayer?.getContext('2d');
    if (previewContext) {
      this.previewContext = previewContext;
      this.setContextConfig('preview');
    }
  }

  setStyles = (drawPenConfig: SVGParamsBase) => {
    this.drawPenConfig = drawPenConfig;
  };

  setContextConfig = (contextType: 'preview' | 'draw') => {
    const context = this[`${contextType}Context`];
    if (context) {
      const config = this[`${contextType}PenConfig`];
      if (config) {
        const { stroke, fill, strokeWidth, lineDash } = config;
        if (stroke) context.strokeStyle = stroke;
        if (fill) context.fillStyle = fill;
        if (strokeWidth) context.lineWidth = parseInt(strokeWidth);
        if (lineDash) context.setLineDash(lineDash);
        // TODO: To be implemented
        // if (scaling) context.scale(scaling.x, scaling.y);
        // if (rotation) context.rotate(rotation);
      } else {
        context.strokeStyle = '#000000';
        context.lineWidth = 1;
        context.fillStyle = '#000000';
      }
    }
  };

  resetPreview = () => {
    if (this.previewLayer && this.previewContext) {
      this.unHighlightpreview();
      this.pen.clearCanvas(this.previewLayer, this.previewContext);
    }
  };

  resetView = () => {
    if (this.drawLayer && this.drawContext) {
      this.pen.clearCanvas(this.drawLayer, this.drawContext);
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
    }
  };

  unHighlightpreview = () => {
    if (this.previewContext) {
      this.previewContext.clearRect(0, 0, this.self.width, this.self.height);
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
  destroy = (): void => {
    throw new Error('not implemented');
  };
}
