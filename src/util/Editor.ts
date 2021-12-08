import { EditorLayout } from '../components/organisms/EditorLayout';
import { ShapeType } from '../types/shapes';
import { Coordinates } from '../types/types';
import { Tool } from './Tools/Tool';
import { EllipseTool } from './Tools/EllipseTool';
import { DrawTool } from './Tools/DrawTool';
import { LineTool } from './Tools/LineTool';
import { RectangleTool } from './Tools/RectangleTool';
import { SelectTool } from './Tools/SelectTool';
import { MoveTool } from './Tools/MoveTool';
import { typeOfShape } from './helper/typeguards';
import { Rectangle } from './Shapes/Rectangle';
import { Ellipse } from './Shapes/Ellipse';
import { appendAsSVGShapeGeneratorFunction } from './helper/shapes';

export enum Tools_List {
  DRAW,
  LINE,
  RECT,
  ELLIPSE,
  SELECT,
  MOVE,
}

export class Editor {
  #selectedTool: Tool<ShapeType> | null = null;
  #canvas: HTMLCanvasElement | null = null;
  #previewLayer: HTMLCanvasElement | null = null;
  #self: EditorLayout;
  #offset: Coordinates;
  #shapes: ShapeType[] = [];
  #selectedShape?: ShapeType | null = null;
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

  save = () => {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    const g = document.createElementNS(svgNS, 'g');

    svg.setAttribute('height', this.#canvas?.height.toString() ?? '500');
    svg.setAttribute('width', this.#canvas?.width.toString() ?? '500');
    svg.appendChild(g);

    const appendAsSVGShape = appendAsSVGShapeGeneratorFunction(g, svgNS);
    this.#shapes.forEach(appendAsSVGShape);
    console.log(svg);
    const xmlSerializer = new XMLSerializer();
    let source = xmlSerializer.serializeToString(svg);

    //add name spaces.
    //https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    }
    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
      source = source.replace(
        /^<svg/,
        '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
      );
    }
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    var url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);

    const downloadLink = document.createElement('a');
    downloadLink.download = 'svg-element.svg';
    downloadLink.href = url;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

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

  handleDeselectMoveTool = (result: ShapeType[]) => {};

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
