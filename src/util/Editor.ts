import { EditorLayout } from '../components/organisms/EditorLayout';
import { Shape } from '../types/shapes';
import { Coordinates } from '../types/types';
import { Tool } from './Tools/Tool';
import { EllipseTool } from './Tools/EllipseTool';
import { DrawTool } from './Tools/DrawTool';
import { LineTool } from './Tools/LineTool';
import { RectangleTool } from './Tools/RectangleTool';
import { SelectTool } from './Tools/SelectTool';
import { MoveTool } from './Tools/MoveTool';

export enum Tools_List {
  DRAW,
  LINE,
  RECT,
  ELLIPSE,
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
  #selectedShape?: Shape | null = null;
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
    if (this.#selectedTool) this.#deselectTool();
    if (this.#canvas && this.#previewLayer) {
      switch (tool) {
        case Tools_List.DRAW: {
          this.#self.selectedElement = null;
          this.#selectedTool = new DrawTool(
            this.#canvas,
            this.#self,
            this.#offset
          );
          break;
        }
        case Tools_List.LINE: {
          this.#self.selectedElement = null;
          this.#selectedTool = new LineTool(
            this.#canvas,
            this.#previewLayer,
            this.#self,
            this.#offset
          );
          break;
        }
        case Tools_List.RECT: {
          this.#self.selectedElement = null;
          this.#selectedTool = new RectangleTool(
            this.#canvas,
            this.#previewLayer,
            this.#self,
            this.#offset
          );
          break;
        }
        case Tools_List.ELLIPSE: {
          this.#self.selectedElement = null;
          this.#selectedTool = new EllipseTool(
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
          if (this.#selectedShape) {
            this.#selectedTool = new MoveTool(
              this.#canvas,
              this.#previewLayer,
              this.#self,
              this.#offset,
              this.#shapes,
              this.#selectedShape
            );
          } else {
            this.#selectedTool = new SelectTool(
              this.#canvas,
              this.#previewLayer,
              this.#self,
              this.#offset,
              this.#shapes
            );
          }
          break;
        }
      }
      this.#selectedTool?.executeAction();
    }
  };

  handleDeselectMoveTool = (result: Shape[]) => {};

  onDeselectTool = () => {
    this.#self.selectedElement = null;
    const renderingContext = this.#previewLayer?.getContext('2d');
    if (this.#previewLayer && renderingContext) {
      Tool.resetCanvas(this.#previewLayer, renderingContext);
    }
    this.#deselectTool();
  };

  #deselectTool = () => {
    if (!this.#selectedTool) return;
    switch (this.#selectedTool.toolName) {
      case Tools_List.SELECT: {
        const result = this.#selectedTool?.destroy();
        if (!Array.isArray(result)) {
          this.#selectedShape = result;
        }
        break;
      }
      case Tools_List.MOVE: {
        const result = this.#selectedTool?.destroy();
        if (Array.isArray(result)) {
          this.#shapes = result;
        }
        this.#selectedShape = null;
        break;
      }
      default: {
        const result = this.#selectedTool?.destroy();
        if (Array.isArray(result)) {
          this.#shapes.push(...result);
          this.#selectedShape = null;
        }
        break;
      }
    }
    this.#selectedTool = null;
  };

  addElement(element: SVGRectElement) {
    throw new Error('Not implemented');
  }
}
