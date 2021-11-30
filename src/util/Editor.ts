import { EditorLayout } from '../components/organisms/EditorLayout';
import { Shape } from '../types/shapes';
import { Coordinates } from '../types/types';
import { Tool } from './Tools/Tool';
import { CircleTool } from './Tools/CircleTool';
import { DrawTool } from './Tools/DrawTool';
import { LineTool } from './Tools/LineTool';
import { RectangleTool } from './Tools/RectangleTool';
import { SelectTool } from './Tools/SelectTool';
import { MoveTool } from './Tools/MoveTool';

export enum Tools_List {
  DRAW,
  LINE,
  RECT,
  CIRCLE,
  SELECT,
  MOVE,
}

export class Editor {
  #selectedTool: Tool<Shape> | null = null;
  #canvas: HTMLCanvasElement | null = null;
  #previewLayer: HTMLCanvasElement | null = null;
  #self: EditorLayout;
  #offset: Coordinates;
  #shapes: Shape[] = [];
  #selectedShape?: Shape;

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
        case Tools_List.MOVE: {
          this.#selectedTool = new MoveTool(
            this.#canvas,
            this.#previewLayer,
            this.#self,
            this.#offset,
            this.#selectedShape
          );
          break;
        }
      }
      this.#selectedTool?.executeAction();
    }
  };

  deselectTool = () => {
    if (this.#selectedTool) {
      if (this.#selectedTool.toolName === Tools_List.SELECT) {
        this.#selectedShape = this.#selectedTool?.destroy().shift();
      }
      const result = this.#selectedTool?.destroy();
      this.#shapes.push(...result);
      this.#selectedTool = null;
    }
  };

  useSelectedTool = (event: Event) => this.#selectedTool?.executeAction?.();

  addElement(element: SVGRectElement) {
    throw new Error('Not implemented');
  }
}
