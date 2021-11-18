import { EditorLayout } from '../components/organisms/EditorLayout';
import { Coordinates, Shape } from '../types/types';

export abstract class Tool {
  target: HTMLCanvasElement;
  previewLayer?: HTMLCanvasElement;
  self: EditorLayout;
  shape: Shape = {};
  shapes: Shape[] = [];
  timesPerSecond: number = 30;
  wait: boolean = false;
  ctx?: CanvasRenderingContext2D;
  previewCtx?: CanvasRenderingContext2D;

  offset: Coordinates;
  drawing: boolean = false;
  prev: [number, number] = [0, 0];
  curr: [number, number] = [0, 0];

  constructor(
    target: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates,
    previewLayer?: HTMLCanvasElement
  ) {
    this.target = target;
    this.self = self;
    this.offset = offset;
    this.previewLayer = previewLayer;
    const renderingContext = this.target.getContext('2d');
    if (renderingContext) {
      this.ctx = renderingContext;
    }
    const previewContext = this.previewLayer?.getContext('2d');
    if (previewContext) {
      this.previewCtx = previewContext;
    }
  }

  getCoords = (e: MouseEvent): [number, number] => {
    return [e.clientX - this.offset.x, e.clientY - this.offset.y];
  };

  draw = () => {
    this.ctx?.beginPath();
    this.ctx?.moveTo(...this.prev);
    this.ctx?.lineTo(...this.curr);
    this.ctx?.stroke();
    this.ctx?.closePath();
  };
  executeAction = (): void => {
    throw new Error('unimplemented');
  };
  destroy = (): Shape[] => {
    throw new Error('unimplemented');
  };
}
