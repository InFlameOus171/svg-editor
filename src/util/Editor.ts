import { EditorLayout } from '../components/organisms/EditorLayout';
import { ShapeType, Tools_List } from '../types/shapes';
import { Coordinates } from '../types/types';
import { appendAsSVGShapeGeneratorFunction } from './helper/shapes';
import { Pen } from './Pen';
import { DrawTool } from './Tools/DrawTool';
import { EllipseTool } from './Tools/EllipseTool';
import { LineTool } from './Tools/LineTool';
import { MoveTool } from './Tools/MoveTool';
import { RectangleTool } from './Tools/RectangleTool';
import { SelectTool } from './Tools/SelectTool';
import { Tool } from './Tools/Tool';

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

  #openDownloadDialog = (url: string) => {
    const downloadLink = document.createElement('a');
    downloadLink.download = 'svg-element.svg';
    downloadLink.href = url;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  #unselectTool = () => {
    if (!this.#selectedTool) {
      return;
    }

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

  onSave = () => {
    this.onUnselectTool();
    const xmlSerializer = new XMLSerializer();
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    const g = document.createElementNS(svgNS, 'g');

    svg.setAttribute('height', this.#canvas?.height.toString() ?? '500');
    svg.setAttribute('width', this.#canvas?.width.toString() ?? '500');
    svg.appendChild(g);

    const appendAsSVGShape = appendAsSVGShapeGeneratorFunction(g, svgNS);
    this.#shapes.forEach(appendAsSVGShape);

    let source = xmlSerializer.serializeToString(svg);
    //add name spaces.
    //https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    }
    // brauch ich das überhaupt ?
    // if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
    //   source = source.replace(
    //     /^<svg/,
    //     '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
    //   );
    // }
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    const url =
      'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
    this.#openDownloadDialog(url);
  };

  onSelectTool = (tool: Tools_List) => {
    if (this.#selectedTool) this.#unselectTool();
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

  onUnselectTool = () => {
    const renderingContext = this.#previewLayer?.getContext('2d');

    this.#self.selectedElement = null;
    if (this.#previewLayer && renderingContext) {
      Pen.clearCanvas(this.#previewLayer, renderingContext);
    }

    this.#unselectTool();
  };
}
