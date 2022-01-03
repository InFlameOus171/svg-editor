import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType, Tools_List } from '../../types/shapes';
import { Coordinates, SVGParamsBase } from '../../types/types';
import { highlightStyle, textPlaceHolder } from '../helper/constants';
import { Pen } from '../Pen';

export abstract class Tool<T extends ShapeType, V extends ShapeType = T> {
  drawLayer: HTMLCanvasElement;
  previewLayer?: HTMLCanvasElement;
  self: EditorLayout;
  currentShape?: V;
  allShapes: T[] = [];
  shallWait: boolean = false;
  drawContext: CanvasRenderingContext2D | null;
  previewContext: CanvasRenderingContext2D | null;
  previewPenConfig?: SVGParamsBase;
  drawPenConfig: SVGParamsBase;
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
    drawPenConfig: SVGParamsBase = { text: textPlaceHolder },
    previewPenConfig?: SVGParamsBase
  ) {
    this.drawLayer = drawLayer;
    this.onUpdateEditor = onUpdateEditor;
    this.self = self;
    this.offset = offset ?? [drawLayer.offsetLeft, drawLayer.offsetTop];
    this.previewLayer = previewLayer;
    this.previewPenConfig = previewPenConfig ?? highlightStyle;
    this.drawPenConfig = drawPenConfig;
    this.previewContext = this.previewLayer?.getContext('2d') ?? null;
    this.drawContext = this.drawLayer.getContext('2d');
  }

  setSVGParams = (drawPenConfig: SVGParamsBase) => {
    this.drawPenConfig = drawPenConfig;
  };

  resetPreview = () => {
    if (this.previewLayer && this.previewContext) {
      Pen.clearCanvas(this.previewLayer, this.previewContext);
    }
  };

  resetView = () => {
    if (this.drawLayer && this.drawContext) {
      Pen.clearCanvas(this.drawLayer, this.drawContext);
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
    return [e.pageX - this.offset[0], e.pageY - this.offset[1]];
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
