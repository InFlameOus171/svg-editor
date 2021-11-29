import { EditorLayout } from '../components/organisms/EditorLayout';
import { Shape } from '../types/shapes';
import { Coordinates } from '../types/types';
import { Tool } from './Tools/Tool';
import { CircleTool } from './Tools/CircleTool';
import { DrawTool } from './Tools/DrawTool';
import { LineTool } from './Tools/LineTool';
import { RectangleTool } from './Tools/RectangleTool';
import { SelectTool } from './Tools/SelectTool';

export enum Tools_List {
  DRAW,
  LINE,
  RECT,
  CIRCLE,
  SELECT,
}

export class Editor {
  #selectedTool: Tool<Shape> | null = null;
  #canvas: HTMLCanvasElement | null = null;
  #previewLayer: HTMLCanvasElement | null = null;
  #self: EditorLayout;
  #offset: Coordinates;
  #shapes: Shape[] = [];

  constructor(
    canvas: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    offset: Coordinates,
    self: EditorLayout
  ) {
    this.#canvas = canvas;
    this.#previewLayer = previewLayer;
    this.#self = self;
    this.#offset = offset;
  }

  selectTool = (tool: Tools_List) => {
    if (this.#selectedTool) this.deselectTool();
    if (this.#canvas && this.#previewLayer) {
      switch (tool) {
        case Tools_List.DRAW: {
          this.#selectedTool = new DrawTool(
            this.#canvas,
            this.#self,
            this.#offset
          );
          break;
        }
        case Tools_List.LINE: {
          this.#selectedTool = new LineTool(
            this.#canvas,
            this.#previewLayer,
            this.#self,
            this.#offset
          );
          break;
        }
        case Tools_List.RECT: {
          this.#selectedTool = new RectangleTool(
            this.#canvas,
            this.#previewLayer,
            this.#self,
            this.#offset
          );
          break;
        }
        case Tools_List.CIRCLE: {
          this.#selectedTool = new CircleTool(
            this.#canvas,
            this.#previewLayer,
            this.#self,
            this.#offset
          );
          break;
        }
        case Tools_List.SELECT: {
          this.#selectedTool = new SelectTool(
            this.#canvas,
            this.#previewLayer,
            this.#self,
            this.#offset,
            this.#shapes
          );
          break;
        }
      }
      this.#selectedTool?.executeAction();
    }
  };

  deselectTool = () => {
    if (this.#selectedTool) {
      const result = this.#selectedTool?.destroy();
      if (Array.isArray(result)) {
        this.#shapes.push(...result);
      } else {
        result && this.#shapes.push(result);
      }
      this.#selectedTool = null;
    }
    console.log(this.#shapes);
  };

  useSelectedTool = (event: Event) => this.#selectedTool?.executeAction?.();

  addElement(element: SVGRectElement) {
    throw new Error('Not implemented');
  }
}
